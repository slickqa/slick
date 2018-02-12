package main

import (
	"os"
	"github.com/codegangsta/cli"
	"github.com/serussell/logxi/v1"
	"github.com/slickqa/slick/slickconfig"
	"github.com/slickqa/slick/commands"
)

func main() {
	logger := log.New("slick")
	app := cli.NewApp()
	app.Name = "slick"
	app.Version = "5.0.0"

	app.Flags = []cli.Flag {
		cli.StringFlag{
			Name: "config, c",
		},
	}

	app.Before = func(c *cli.Context) error {
		if c.IsSet("c") {
			logger.Debug("Loading config from %s", c.String("c"))
			slickconfig.Configuration.LoadFromLocation(c.String("c"))
		} else {
			logger.Debug("Loading config from standard locations.")
			slickconfig.Configuration.LoadFromStandardLocations()
		}
		return nil
	}

	app.Commands = []cli.Command{
		commands.InitCommand,
		commands.ServeCommand,
	}

	app.Run(os.Args)
}
