package slickconfig

import (
	"os"
	"strings"
	"github.com/pelletier/go-toml"
	"io/ioutil"
	"net/http"
	"github.com/serussell/logxi/v1"
	"fmt"
	"os/user"
	"path"
)

type ServiceConfiguration struct {
	BaseUrl string `toml:"base-url" comment:"You must supply a base url for slick.  If you change it you have to regenerate certificates."`
}

type RolesConfiguration struct {
	Defaults []Role `toml:"default-roles" comment:"The default roles that slick gives (can be customized per-project)."`
}

type TLSEncryptionConfiguration struct {
	TLSPrivateKey string `toml:"tls-private-key" comment:"The private key for tls encryption."`
	TLSCertificate string `toml:"tls-certificate" comment:"The certificate for tls encryption."`
}

type AuthenticationEncryptionConfiguration struct {
	JWTPrivateKey string `toml:"jwt-private-key" comment:"The private key used to sign the jwt tokens.  Generate using openssl genrsa -out app.rsa 1024"`
	JWTPublicKey string `toml:"jwt-public-key" comment:"The public key used to verify the jwt tokens.  Generate using openssl rsa -in app.rsa -pubout > app.rsa.pub"`
}

type SlickConfiguration struct {
	Options         ServiceConfiguration                  `toml:"options"`
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
	logger = log.New("slickconfig")
)

func init() {
	Configuration.Options.BaseUrl = "https://localhost:8888"
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
					logger.Warn("Unable to find configuration in any of the standard locations, only defaults available.")
				}
			}
		}
	} else {
		c.LoadFromLocation(location)
	}
}

func (c *SlickConfiguration) Load(data []byte) {
	err := toml.Unmarshal(data, c)
	if err != nil {
		logger.Warn("Problem loading configuration", "error", err)
	}
}

func (c *SlickConfiguration) LoadFromLocation(location string) {
	if strings.HasPrefix(location, "http") {
		resp, err := http.Get("http://example.com/")
		defer resp.Body.Close()
		if err == nil {
			body, err := ioutil.ReadAll(resp.Body)
			if err == nil {
				c.Load(body)
			} else {
				logger.Warn(fmt.Sprintf("Error retrieving logs from location %s, only defaults available.", location), "error", err)
			}
		} else {
			logger.Warn(fmt.Sprintf("Error retrieving logs from location %s, only defaults available.", location), "error", err)
		}
	} else {
		data, err := ioutil.ReadFile(location)
		if err == nil {
			c.Load(data)
		} else {
			logger.Warn(fmt.Sprintf("Error retrieving logs from location %s, only defaults available.", location), "error", err)
		}
	}
}

func (c *SlickConfiguration) ToBytes() ([]byte, error) {
	return toml.Marshal(*c)
}