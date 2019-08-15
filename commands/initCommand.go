package commands

import (
	"github.com/urfave/cli"
	"github.com/slickqa/slick/slickconfig"
	"crypto/rsa"
	"crypto/rand"
	"encoding/pem"
	"crypto/x509"
	"fmt"
	"crypto/x509/pkix"
	"net"
	"time"
	"math/big"
	"net/url"
	"io/ioutil"
	"github.com/rs/zerolog/log"
)

var (
	InitCommand = cli.Command{
		Name: "init",
		Flags: []cli.Flag {
			cli.StringFlag{
				Name: "base-url",
				Value: slickconfig.Configuration.Common.BaseUrl,
			},
			cli.StringFlag{
				Name: "o,output",
			},
		},
		Action: InitializeConfiguration,
	}
)

func InitializeConfiguration(c *cli.Context) {
	logger := log.With().Str("loggerName", "slick.commands.init").Logger()
	if c.IsSet("base-url") {
		slickconfig.Configuration.Common.BaseUrl = c.String("base-url")
	}

	// ---------------------------- JWT Keys ---------------------------------
	logger.Debug().Msg("Generating JWT keys...")
	key, err := rsa.GenerateKey(rand.Reader, 1024)
	if err != nil {
		logger.Fatal().AnErr("error", err).Msg("Unable to generate cryptographic key")
		return
	}
	block := &pem.Block{
		Type: "RSA PRIVATE KEY",
		Bytes: x509.MarshalPKCS1PrivateKey(key),
	}
	slickconfig.Configuration.TokenEncryption.JWTPrivateKey = string(pem.EncodeToMemory(block))
	public := key.Public()
	buffer, err := x509.MarshalPKIXPublicKey(public)
	block = &pem.Block{
		Type: "RSA PUBLIC KEY",
		Bytes: buffer,
	}
	slickconfig.Configuration.TokenEncryption.JWTPublicKey = string(pem.EncodeToMemory(block))

	// ---------------------------- TLS Key and Certificate ---------------------------------
	logger.Debug().Msg("Generating TLS key and certificate...")
	baseUrl, err := url.Parse(slickconfig.Configuration.Common.BaseUrl)
	if err != nil {
		logger.Fatal().AnErr("error", err).Str("url",slickconfig.Configuration.Common.BaseUrl).Msg("Failed to parse url!")
	}
	key, err = rsa.GenerateKey(rand.Reader, 2048)
	if err != nil {
		logger.Fatal().AnErr("error", err).Msg("Error generating TLS key.")
	}
	block = &pem.Block{
		Type: "RSA PRIVATE KEY",
		Bytes: x509.MarshalPKCS1PrivateKey(key),
	}
	slickconfig.Configuration.TLSEncryption.TLSPrivateKey = string(pem.EncodeToMemory(block))

	notBefore := time.Now()
	notAfter := notBefore.Add(5*365*24*time.Hour)
	serialNumberLimit := new(big.Int).Lsh(big.NewInt(1), 128)
	serialNumber, err := rand.Int(rand.Reader, serialNumberLimit)
	if err != nil {
		logger.Fatal().AnErr("error", err).Msg("Failed to generate serial number: ")
	}

	template := x509.Certificate{
		SerialNumber: serialNumber,
		Subject: pkix.Name{
			CommonName: baseUrl.Hostname(),
			Organization: []string{"Slick QA Server"},
			OrganizationalUnit: []string {"Slick"},
		},
		NotBefore: notBefore,
		NotAfter:  notAfter,
		KeyUsage:              x509.KeyUsageKeyEncipherment | x509.KeyUsageDigitalSignature | x509.KeyUsageCertSign,
		ExtKeyUsage:           []x509.ExtKeyUsage{x509.ExtKeyUsageServerAuth, x509.ExtKeyUsageClientAuth},
		BasicConstraintsValid: true,
	}


	hosts := []string {baseUrl.Hostname(), baseUrl.Host, "127.0.0.1", "localhost", fmt.Sprintf("localhost:%d", slickconfig.Configuration.Common.ListenPort)}

	for _, h := range hosts {
		if ip := net.ParseIP(h); ip != nil {
			template.IPAddresses = append(template.IPAddresses, ip)
		} else {
			template.DNSNames = append(template.DNSNames, h)
		}
	}

	derBytes, err := x509.CreateCertificate(rand.Reader, &template, &template, key.Public(), key)
	block = &pem.Block{
		Type: "CERTIFICATE",
		Bytes: derBytes,
	}
	slickconfig.Configuration.TLSEncryption.TLSCertificate = string(pem.EncodeToMemory(block))

	configContent, err := slickconfig.Configuration.ToBytes()
	if err != nil {
		logger.Fatal().AnErr("error", err).Msg("Problem generating configuration:")
	}

	if c.IsSet("o") {
		ioutil.WriteFile(c.String("o"), configContent, 0600)
	} else {
		fmt.Println(string(configContent))
	}

}
