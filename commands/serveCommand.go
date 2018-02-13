package commands

import (
	"github.com/codegangsta/cli"
	"github.com/slickqa/slick/db"
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

func RunService(c *cli.Context) {
	db.InitializeMongoConnection()
	defer db.CloseMongoConnection()


}

