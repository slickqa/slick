package main

import (
	"os"
	"github.com/codegangsta/cli"
	"github.com/rs/zerolog/log"
	"github.com/slickqa/slick/slickconfig"
	"github.com/slickqa/slick/commands"
	"github.com/slickqa/slick/slickversion"
	"github.com/rs/zerolog"
	"golang.org/x/crypto/ssh/terminal"
)

func main() {
	app := cli.NewApp()
	app.Name = "slick"
	app.Version = slickversion.GetVersion()

	app.Flags = []cli.Flag {
		cli.StringFlag{
			Name: "config, c",
		},
		cli.BoolFlag{
			Name: "debug, d",
		},
	}
	zerolog.SetGlobalLevel(zerolog.InfoLevel)

	if terminal.IsTerminal(int(os.Stdout.Fd())) {
		log.Logger = log.Output(zerolog.ConsoleWriter{Out: os.Stderr})
	}


	app.Before = func(c *cli.Context) error {
		if c.Bool("d") {
			zerolog.SetGlobalLevel(zerolog.DebugLevel)
		}
		if c.IsSet("c") {
			log.Info().Str("source", c.String("c")).Msg("Loading config from source specified")
			slickconfig.Configuration.LoadFromLocation(c.String("c"))
		} else {
			log.Debug().Msg("Loading config from standard locations.")

			slickconfig.Configuration.LoadFromStandardLocations()
		}
		return nil
	}

	app.Commands = []cli.Command{
		commands.InitCommand,
		commands.ServeCommand,
		commands.GenerateTokenCommand,
	}

	app.Run(os.Args)
}
