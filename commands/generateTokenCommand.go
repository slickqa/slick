package commands

import (
	"github.com/urfave/cli"
	"github.com/slickqa/slick/slickqa"
	"github.com/slickqa/slick/jwtauth"
	"fmt"
)

var (
	GenerateTokenCommand = cli.Command{
		Name: "generate-token",
		Flags: []cli.Flag {
			cli.StringFlag{
				Name: "email",
			},
		},
		Action: GenerateToken,
	}
)

func GenerateToken(c *cli.Context) {
	user := slickqa.UserInfo{
		EmailAddress: "genereated@slick-cli",
		Permissions: &slickqa.SlickPermissionInfo{
			SlickAdmin: 1,
		},
	}
	token, _ := jwtauth.CreateJWTForUser(user)
	fmt.Printf("Authorization: Bearer %s\n", token)
}
