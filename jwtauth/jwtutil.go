package jwtauth

import (
	"github.com/dgrijalva/jwt-go"
	"fmt"
	"errors"
	"context"
	"crypto/rsa"
	"github.com/slickqa/slick/slickqa"
	"time"
	"encoding/pem"
	"github.com/slickqa/slick/slickconfig"
	"crypto/x509"
	"google.golang.org/grpc/metadata"
	"strings"
	"github.com/rs/zerolog/log"
	"github.com/rs/zerolog"
)

var (
	JwtRSAPrivateKey *rsa.PrivateKey
	JwtRSAPublicKey  *rsa.PublicKey
	logger           zerolog.Logger
)

func init() {
	logger = log.With().Str("loggerName", "jwtauth").Logger()
}

type jwtoken struct {
	token string
}

func (j jwtoken) GetRequestMetadata(ctx context.Context, uri ...string) (map[string]string, error) {
	return map[string]string{
		"Authorization": fmt.Sprintf("Bearer %s", j.token),
	}, nil
}

func (j jwtoken) RequireTransportSecurity() bool {
	return true
}

type SlickCompany struct {
	CompanyAdmin       uint32            `json:"a,omitempty"`
	ProjectPermissions map[string]uint32 `json:"proj"`
}

type SlickPermissions struct {
	SlickAdmin uint32                  `json:"sa,omitempty"`
	Companies  map[string]SlickCompany `json:"co"`
}

type SlickClaims struct {
	Permissions SlickPermissions `json:"sp"`
	FullName    string           `json:"name"`
	GivenName   string           `json:"given_name"`
	jwt.StandardClaims
}

func (c *SlickClaims) HasReadPermissionForCompany(companyName string) bool {
	if c.Permissions.SlickAdmin != 0 {
		return true
	}
	for name := range c.Permissions.Companies {
		if name == companyName {
			return true
		}
	}
	return false
}

func (c *SlickClaims) IsCompanyAdmin(companyName string) bool {
	if c.Permissions.SlickAdmin != 0 {
		return true
	}
	for name := range c.Permissions.Companies {
		if name == companyName {
			if c.Permissions.Companies[name].CompanyAdmin != 0 {
				return true
			} else {
				return false
			}
		}
	}
	return false
}

func initKeys() {
	var err error
	var ok bool
	block, _ := pem.Decode([]byte(slickconfig.Configuration.TokenEncryption.JWTPrivateKey))
	JwtRSAPrivateKey, err = x509.ParsePKCS1PrivateKey(block.Bytes)
	if err != nil {
		logger.Error().AnErr("error", err).Msg("Failed Parsing private key from PEM block.")
	}
	block, _ = pem.Decode([]byte(slickconfig.Configuration.TokenEncryption.JWTPublicKey))
	public_key, err := x509.ParsePKIXPublicKey(block.Bytes)

	if JwtRSAPublicKey, ok = public_key.(*rsa.PublicKey); !ok {
		logger.Error().Msg("Failed Parsing RSA public key from PEM block.")
	}
}

func CreateJWTForUser(user slickqa.UserInfo) (string, error) {
	permissions := SlickPermissions{}
	permissions.Companies = make(map[string]SlickCompany)
	for _, company := range user.Permissions.Companies {
		slickCompany := SlickCompany{
			CompanyAdmin:       company.CompanyAdmin,
			ProjectPermissions: make(map[string]uint32),
		}
		for _, project := range company.Projects {
			slickCompany.ProjectPermissions[project.ProjectName] = slickconfig.PermissionFromRoles(project.Roles)
		}
		permissions.Companies[company.CompanyName] = slickCompany
	}
	permissions.SlickAdmin = user.Permissions.SlickAdmin
	iat := time.Now()
	claims := SlickClaims{
		permissions,
		user.FullName,
		user.GivenName,
		jwt.StandardClaims{
			Subject:   user.EmailAddress,
			IssuedAt:  iat.Unix(),
			ExpiresAt: iat.Add(time.Minute * 30).Unix(),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodRS256, claims)
	if JwtRSAPublicKey == nil || JwtRSAPrivateKey == nil {
		initKeys()
	}
	return token.SignedString(JwtRSAPrivateKey)
}

func keyFunction(token *jwt.Token) (interface{}, error) {
	if JwtRSAPublicKey == nil {
		initKeys()
	}
	if JwtRSAPublicKey != nil {
		return JwtRSAPublicKey, nil
	} else {
		return nil, errors.New("cannot get JwtRSAPublicKey from configuration")
	}
}

func GetClaimsFromContext(ctx context.Context) (*SlickClaims, error) {
	md, ok := metadata.FromIncomingContext(ctx)
	if !ok {
		return nil, errors.New("unable to get metadata from context")
	}
	authorization, ok := md["authorization"]
	if !ok {
		return nil, errors.New("no authorization header key found")
	}

	if len(authorization) < 1 {
		return nil, errors.New("no authorization value found")
	}

	if !strings.HasPrefix(authorization[0], "Bearer ") {
		return nil, errors.New("malformed authorization value, does not start with Bearer ")
	}

	token, err := jwt.ParseWithClaims(authorization[0][7:], &SlickClaims{}, keyFunction)
	if err != nil {
		return nil, err
	}
	if claims, ok := token.Claims.(*SlickClaims); ok && token.Valid {
		return claims, nil
	} else {
		return nil, errors.New("token was not valid")
	}
}

func GetClaimsCheckPermission(ctx context.Context, CompanyName string, ProjectName string, Permission uint32) (*SlickClaims, error) {
	claims, err := GetClaimsFromContext(ctx)
	if err != nil {
		return nil, err
	}
	if claims.Permissions.SlickAdmin != 0 {
		return claims, nil
	}
	if CompanyName == "" {
		return nil, errors.New("invalid empty company name")
	}
	if company, ok := claims.Permissions.Companies[CompanyName]; ok {
		if company.CompanyAdmin != 0 {
			return claims, nil
		}
		if projectPermission, ok := company.ProjectPermissions[ProjectName]; ok {
			if (projectPermission & slickconfig.PERMISSION_ADMIN) != 0 {
				return claims, nil
			}
			if (projectPermission&Permission) != 0 || Permission == 0 {
				return claims, nil
			}
			return nil, errors.New("user " + claims.Subject + " does not have " + slickconfig.DescribePermission(Permission) + " for company " + CompanyName + " project " + ProjectName)

		} else {
			return nil, errors.New("user " + claims.Subject + " does not have any access to project " + ProjectName + " from company " + CompanyName)
		}
	} else {
		return nil, errors.New("user " + claims.Subject + " does not have permission to company " + CompanyName)
	}
}

func HasPermission(ctx context.Context, CompanyName string, ProjectName string, Permission uint32) error {
	_, err := GetClaimsCheckPermission(ctx, CompanyName, ProjectName, Permission)
	if err != nil {
		return err
	}
	return nil
}
