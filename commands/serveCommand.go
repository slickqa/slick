package commands

import (
	"github.com/urfave/cli"
	"github.com/slickqa/slick/db"
	"google.golang.org/grpc/credentials"
	"google.golang.org/grpc"
	"crypto/tls"
	"github.com/slickqa/slick/slickconfig"
	"crypto/x509"
	"net/url"
	"net/http"
	"github.com/grpc-ecosystem/grpc-gateway/runtime"
	"github.com/slickqa/slick/slickqa"
	"context"
	"strings"
	"net/http/httputil"
	"github.com/koding/websocketproxy"
	"net"
	"github.com/slickqa/slick/services"
	"github.com/GeertJohan/go.rice"
	"io/ioutil"
	"path"
	"fmt"
	"github.com/rs/zerolog/log"
)

var (
	ServeCommand = cli.Command{
		Name: "serve",
		Flags: []cli.Flag {
			cli.BoolFlag{
				Name: "d,dev",
			},
		},
		Action: RunService,
	}
)

func rootHttpHandler(grpcServer *grpc.Server, otherHandler http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if strings.Contains(r.Header.Get("Content-Type"), "application/grpc") {
			grpcServer.ServeHTTP(w, r)
		} else {
			otherHandler.ServeHTTP(w, r)
		}
	})
}

func devModeReverseProxy(mux *http.ServeMux) {
	proxyTarget, _ := url.Parse("http://localhost:3000/")
	wsProxyTarget, _ := url.Parse("ws://localhost:3000/")
	proxy := httputil.NewSingleHostReverseProxy(proxyTarget)
	socketproxy := websocketproxy.NewProxy(wsProxyTarget)
	mux.Handle("/", proxy)
	mux.HandleFunc("/sockjs-node/", func(w http.ResponseWriter, r *http.Request) {
		if strings.HasPrefix(r.Proto, "ws") || strings.Contains(r.Header.Get("Upgrade"), "websocket") {
			socketproxy.ServeHTTP(w, r)
		} else {
			proxy.ServeHTTP(w, r)
		}
	})
}

func RunService(c *cli.Context) {
	logger := log.With().Str("loggerName", "commands.serve").Logger()
	db.InitializeMongoConnection()
	defer db.CloseMongoConnection()

	// ----------------------- Certificate Stuff ------------------------------------
	pair, err := tls.X509KeyPair([]byte(slickconfig.Configuration.TLSEncryption.TLSCertificate),
		                         []byte(slickconfig.Configuration.TLSEncryption.TLSPrivateKey))
	if err != nil {
		logger.Fatal().AnErr("error", err).Msg("Unable to create certificate key pair for TLS connections.")
		return
	}

	certPool := x509.NewCertPool()
	ok := certPool.AppendCertsFromPEM([]byte(slickconfig.Configuration.TLSEncryption.TLSCertificate))

	if !ok {
		logger.Fatal().Msg("Unable to create certificate pool.")
		return
	}

	baseUrl, err := url.Parse(slickconfig.Configuration.Common.BaseUrl)
	if err != nil {
		logger.Fatal().AnErr("error", err).Str("url", slickconfig.Configuration.Common.BaseUrl).Msg("Unable to parse base url.")
		return
	}

	// ----------------------- GRPC Stuff ------------------------------------
	ctx := context.Background()
	grpcServer := grpc.NewServer(grpc.Creds(credentials.NewClientTLSFromCert(certPool, baseUrl.Host)))
	slickqa.RegisterAuthServer(grpcServer, &services.SlickAuthService{})
	slickqa.RegisterUsersServer(grpcServer, &services.SlickUsersService{})
	slickqa.RegisterVersionServer(grpcServer, &services.SlickVersionService{})
	slickqa.RegisterCompanyServer(grpcServer, &services.SlickCompanyService{})
	slickqa.RegisterProjectsServer(grpcServer, &services.SlickProjectsService{})
	slickqa.RegisterLinksServer(grpcServer, &services.SlickLinksService{})
	slickqa.RegisterAgentsServer(grpcServer, &services.SlickAgentsService{})
	dialHostname := slickconfig.Configuration.Common.ListenIP
	if dialHostname == "0.0.0.0" || dialHostname == "127.0.0.1" {
		dialHostname = "localhost"
	}
	dopts := []grpc.DialOption{grpc.WithTransportCredentials(credentials.NewTLS(&tls.Config{
		InsecureSkipVerify: true,
		ServerName: fmt.Sprintf("%s:%d", dialHostname, slickconfig.Configuration.Common.ListenPort),
		RootCAs:    certPool,
	}))}

	rootHttpMux := http.NewServeMux()
	restGatewayMux := runtime.NewServeMux()

	err = slickqa.RegisterAuthHandlerFromEndpoint(ctx, restGatewayMux, fmt.Sprintf("%s:%d", dialHostname, slickconfig.Configuration.Common.ListenPort), dopts)

	if err != nil {
		logger.Fatal().AnErr("error", err).Msg("Error registering auth grpc gateway")
		return
	}

	err = slickqa.RegisterUsersHandlerFromEndpoint(ctx, restGatewayMux, fmt.Sprintf("%s:%d", dialHostname, slickconfig.Configuration.Common.ListenPort), dopts)

	if err != nil {
		logger.Fatal().AnErr("error", err).Msg("Error registering users grpc gateway")
		return
	}

	err = slickqa.RegisterVersionHandlerFromEndpoint(ctx, restGatewayMux, fmt.Sprintf("%s:%d", dialHostname, slickconfig.Configuration.Common.ListenPort), dopts)

	if err != nil {
		logger.Fatal().AnErr("error", err).Msg("Error registering version grpc gateway")
		return
	}

	err = slickqa.RegisterCompanyHandlerFromEndpoint(ctx, restGatewayMux, fmt.Sprintf("%s:%d", dialHostname, slickconfig.Configuration.Common.ListenPort), dopts)

	if err != nil {
		logger.Fatal().AnErr("error", err).Msg("Error registering company grpc gateway")
		return
	}

	err = slickqa.RegisterProjectsHandlerFromEndpoint(ctx, restGatewayMux, fmt.Sprintf("%s:%d", dialHostname, slickconfig.Configuration.Common.ListenPort), dopts)

	if err != nil {
		logger.Fatal().AnErr("error", err).Msg("Error registering projects grpc gateway")
		return
	}

	err = slickqa.RegisterLinksHandlerFromEndpoint(ctx, restGatewayMux, fmt.Sprintf("%s:%d", dialHostname, slickconfig.Configuration.Common.ListenPort), dopts)

	if err != nil {
		logger.Fatal().AnErr("error", err).Msg("Error registering links grpc gateway")
		return
	}

	err = slickqa.RegisterAgentsHandlerFromEndpoint(ctx, restGatewayMux, fmt.Sprintf("%s:%d", dialHostname, slickconfig.Configuration.Common.ListenPort), dopts)

	if err != nil {
		logger.Fatal().AnErr("error", err).Msg("Error registering agents grpc gateway")
		return
	}

	rootHttpMux.Handle("/api/", restGatewayMux)
	services.GoogleLoginHandlers(rootHttpMux)
	if c.Bool("dev") {
		devModeReverseProxy(rootHttpMux)
	} else {
		if slickconfig.Configuration.Common.LocalWebFilesPath != "" {
			indexContent, err := ioutil.ReadFile(path.Join(slickconfig.Configuration.Common.LocalWebFilesPath, "index.html"))
			if err != nil {
				logger.Error().AnErr("error", err).Str("localFilePath", slickconfig.Configuration.Common.LocalWebFilesPath).Msg("index.html not found!")
				indexContent = make([]byte, 0)
			}
			fileserver := http.FileServer(http.Dir(slickconfig.Configuration.Common.LocalWebFilesPath))
			rootHttpMux.HandleFunc("/", func(w http.ResponseWriter, req *http.Request) {
				dotPos := strings.LastIndex(req.URL.Path, ".")
				if dotPos > 0 && (len(req.URL.Path) - dotPos) <= 5 && req.URL.Path != "index.html" {
					// at this point we know that in the path there was a . within 5 digits of the end.
					// we are going to ASSUME that means a file.  That could make a you know what out of you and me
					fileserver.ServeHTTP(w, req)
				} else {
					w.Header().Set("Content-Type", "text/html; charset=utf-8")
					w.Write(indexContent)
				}
			})
		} else {
			box, err := rice.FindBox("../web/dist")
			if err != nil {
				logger.Error().AnErr("error", err).Msg("Unable to find embedded content.")
			} else {
				indexContent, err := box.Bytes("index.html")
				if err != nil {
					logger.Error().AnErr("error", err).Msg("index.html not found in embedded content.")
					indexContent = make([]byte, 0)
				}
				riceServer := http.FileServer(box.HTTPBox())
				rootHttpMux.HandleFunc("/", func(w http.ResponseWriter, req *http.Request) {
					dotPos := strings.LastIndex(req.URL.Path, ".")
					if dotPos > 0 && (len(req.URL.Path) - dotPos) <= 5 && req.URL.Path != "index.html"  || req.URL.Path == "/swagger-ui/" {
						// at this point we know that in the path there was a . within 5 digits of the end.
						// we are going to ASSUME that means a file.  That could make a you know what out of you and me
						logger.Debug().Str("path", req.URL.Path).Msg("Serving request from files")
						riceServer.ServeHTTP(w, req)
					} else {
						w.Header().Set("Content-Type", "text/html; charset=utf-8")
						w.Write(indexContent)
					}
				})
			}
		}
	}

	conn, err := net.Listen("tcp", slickconfig.Configuration.Common.ListenIP + ":"+ fmt.Sprintf("%d", slickconfig.Configuration.Common.ListenPort))
	if err != nil {
		logger.Fatal().AnErr("error", err).Str("host", slickconfig.Configuration.Common.ListenIP).Int("port", slickconfig.Configuration.Common.ListenPort).Msg("Error occured trying to listen on host:port")
		return
	}

	srv := &http.Server{
		Addr: baseUrl.Host,
		Handler: rootHttpHandler(grpcServer, rootHttpMux),
		TLSConfig: &tls.Config{
			Certificates: []tls.Certificate{ pair },
			NextProtos: []string{"h2"},
		},
	}

	// TODO: template index.html so that
	err = srv.Serve(tls.NewListener(conn, srv.TLSConfig))
	if err != nil {
		logger.Error().AnErr("error", err).Msg("Error recieved from http server.")
	}
}

