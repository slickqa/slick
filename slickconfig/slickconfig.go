package slickconfig

import (
	"os"
	"strings"
	"github.com/pelletier/go-toml"
	"io/ioutil"
	"net/http"
		"os/user"
	"path"
	"github.com/rs/zerolog/log"
)

type ServiceConfiguration struct {
	BaseUrl string `toml:"base-url" comment:"You must supply a base url for slick.  If you change it you have to regenerate certificates."`
	ListenIP string `toml:"listen-ip" comment:"The IP address to listen on.  If you want to listen on all interfaces use 0.0.0.0."`
	ListenPort int `toml:"listen-port" comment:"The port to listen on.  Normally this will be the same as the port in your base url unless you are using a reverse proxy."`
	LocalWebFilesPath string `toml:"web-files-path" comment:"Path to the local web files.  If you are using a release version and it has the web files embedded, you won't need this." commented:"true"`
}

type GoogleOauthConfiguration struct {
	ClientID string `toml:"client-id" comment:"ClientID from google for authentication."`
	Secret string `toml:"secret" comment:"Secret from google for authentication."`
}

type RolesConfiguration struct {
	Defaults []Role `toml:"default-roles" comment:"The default roles that slick gives (can be customized per-project)."`
}

type DefaultAccessConfiguration struct {
	Company string `toml:"company-name" comment:"The company name for the projects you want to give access to."`
	Projects []string `toml:"projects" comment:"The list of projects you want every user who logs in to have read only access to."`
	Admin string `toml:"admin" comment:"When this user signs in they are automatically given slick admin permissions.  Should be an email address."`
}

type TLSEncryptionConfiguration struct {
	TLSPrivateKey string `toml:"tls-private-key" comment:"The private key for tls encryption."`
	TLSCertificate string `toml:"tls-certificate" comment:"The certificate for tls encryption."`
}

type AuthenticationEncryptionConfiguration struct {
	JWTPrivateKey string `toml:"jwt-private-key" comment:"The private key used to sign the jwt tokens.  Generate using openssl genrsa -out app.rsa 1024"`
	JWTPublicKey string `toml:"jwt-public-key" comment:"The public key used to verify the jwt tokens.  Generate using openssl rsa -in app.rsa -pubout > app.rsa.pub"`
}

type MongoConfiguration struct {
	URL string `toml:"connect-url" comment:"The URL should contain any authentication information to use.  See https://docs.mongodb.com/manual/reference/connection-string/"`
	Database string `toml:"database" comment:"The name of the database to use for slick."`
	UseTLS bool `toml:"use-tls" comment:"Use TLS (encryption) on the connection.  If you don't supply a root ca's file (with your server's certificate in it) then certificate verification is not done.'"`
	RootCertificatesLocation string `toml:"root-ca-file" comment:"If you want to validate the server's certificate, put in a path to the file storing the certificate(s)."`
}

type SlickConfiguration struct {
	Common          ServiceConfiguration                  `toml:"common"`
	DefaultAccess   DefaultAccessConfiguration            `toml:"default-access"`
	Google          GoogleOauthConfiguration              `toml:"google-authentication" comment:"To enable google authentication, go to https://console.developers.google.com and create a project, and then go to API and Services -> Credentials and create credentials."`
	Mongo			MongoConfiguration                    `toml:"mongo"`
	Roles           RolesConfiguration                    `toml:"roles"`
	TLSEncryption   TLSEncryptionConfiguration            `toml:"tls-encryption"`
	TokenEncryption AuthenticationEncryptionConfiguration `toml:"token-encryption"`
}

const (
	locationSystem                       = "/etc/slick.toml"
	locationLocal                        = "./slick.toml"
	homeFileName                         = ".slick.toml"
	ConfigurationEnvironmentVariableName = "SLICKCONF"
)

var (
	Configuration SlickConfiguration
	logger = log.With().Str("loggerName", "slickconfig").Logger()
	roles = make(map[string]Role, 0)
)

func init() {
	Configuration.Common.BaseUrl = "https://localhost:8888"
	Configuration.Common.ListenIP = "127.0.0.1"
	Configuration.Common.ListenPort = 8888
	Configuration.Mongo.URL = "mongodb://localhost/"
	Configuration.Mongo.Database = "slick"
	Configuration.Roles.Defaults = DefaultRoles
}

func (c *SlickConfiguration) LoadFromStandardLocations() {
	// load from the location in the environment variable if it's set, next look at the local directory, finally
	// system location
	location, ok := os.LookupEnv(ConfigurationEnvironmentVariableName)
	if !ok {
		data, err := ioutil.ReadFile(locationLocal)
		if err == nil {
			c.Load(data)
		} else {
			usr, err := user.Current()
			if err == nil {
				data, err := ioutil.ReadFile(path.Join(usr.HomeDir, homeFileName))
				if err == nil {
					c.Load(data)
				}
			}
			if err != nil {
				data, err = ioutil.ReadFile(locationSystem)
				if err == nil {
					c.Load(data)
				} else {
					logger.Warn().Msg("Unable to find configuration in any of the standard locations, only defaults available.")
				}
			}
		}
	} else {
		c.LoadFromLocation(location)
	}
}

func (c *SlickConfiguration) Load(data []byte) {
	logger = log.With().Str("loggerName", "slickconfig").Logger()
	err := toml.Unmarshal(data, c)
	if err != nil {
		logger.Warn().AnErr("error", err).Msg("Problem loading configuration")
	}
	if len(c.Roles.Defaults) == 0 {
		c.Roles.Defaults = DefaultRoles
	}
	logger.Debug().Int("default-roles-length", len(c.Roles.Defaults)).Msg("Initializing roles")
	for _, role := range c.Roles.Defaults {
		logger.Debug().Str("role-name", role.Name).Msg("Initializing Role")
		roles[role.Name] = role
	}
}

func (c *SlickConfiguration) LoadFromLocation(location string) {
	if strings.HasPrefix(location, "http") {
		resp, err := http.Get(location)
		if err == nil {
			defer resp.Body.Close()
			body, err := ioutil.ReadAll(resp.Body)
			if err == nil {
				c.Load(body)
			} else {
				logger.Warn().AnErr("error", err).Str("location", location).Msg("Error retrieving configuration from location, only defaults available.")
			}
		} else {
			logger.Warn().AnErr("error", err).Str("location", location).Msg("Error retrieving configuration from location, only defaults available.")
		}
	} else {
		data, err := ioutil.ReadFile(location)
		if err == nil {
			c.Load(data)
		} else {
			logger.Warn().AnErr("error", err).Str("location", location).Msg("Error retrieving configuration from location, only defaults available.")
		}
	}
}

func (c *SlickConfiguration) ToBytes() ([]byte, error) {
	return toml.Marshal(*c)
}
