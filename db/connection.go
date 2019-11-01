package db

import (
	"context"
	"crypto/tls"
	"crypto/x509"
	"github.com/rs/zerolog/log"
	"github.com/slickqa/slick/slickconfig"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"io/ioutil"
)

var (
	Client *mongo.Client
)

func InitializeMongoConnection() error {
	var err error
	logger := log.With().Str("loggerName", "db.connection.init").Logger()
	logger.Debug().Str("url", slickconfig.Configuration.Mongo.URL).Bool("useTLS", slickconfig.Configuration.Mongo.UseTLS).Msg("Connecting to mongo database")

	if slickconfig.Configuration.Mongo.UseTLS {
		roots := x509.NewCertPool()

		if ca, err := ioutil.ReadFile(slickconfig.Configuration.Mongo.RootCertificatesLocation); err == nil {
			roots.AppendCertsFromPEM(ca)
		} else {
			logger.Error().AnErr("error", err).Str("RootCertificatesLocation", slickconfig.Configuration.Mongo.RootCertificatesLocation).Msg("Trying to load Root Certificate Location contained an error, continuing on as if it worked.")
		}

		tlsConfig := &tls.Config{}
		if slickconfig.Configuration.Mongo.RootCertificatesLocation != "" {
			tlsConfig.RootCAs = roots
		} else {
			tlsConfig.InsecureSkipVerify = true
		}

		dialInfo := options.Client().ApplyURI(slickconfig.Configuration.Mongo.URL)
		dialInfo.SetTLSConfig(tlsConfig)
		Client, err = mongo.NewClient(dialInfo)
		if err != nil {
			logger.Fatal().AnErr("error", err).Str("url", slickconfig.Configuration.Mongo.URL).Msg("Unable to parse URL and connect to mongo!")
			return err
		}
	} else {
		dialInfo := options.Client().ApplyURI(slickconfig.Configuration.Mongo.URL)
		Client, err = mongo.NewClient(dialInfo)
		if err != nil {
			logger.Fatal().AnErr("error", err).Str("url", slickconfig.Configuration.Mongo.URL).Msg("Error creating client for mongodb!")
			return err
		}
	}
	err = Client.Connect(context.TODO())
	if err != nil {
		logger.Fatal().AnErr("error", err).Str("url", slickconfig.Configuration.Mongo.URL).Msg("Error connecting to mongodb!")
	}
	return nil
}

func CloseMongoConnection() {
	if Client != nil {
		err := Client.Disconnect(context.Background())
		if err != nil {
			logger := log.With().Str("loggerName", "db.connection.close").Logger()
			logger.Fatal().AnErr("error", err).Msg("Error closing to mongodb connection")
		}
	}
}
