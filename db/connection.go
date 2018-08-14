package db

import (
	"github.com/globalsign/mgo"
	"github.com/slickqa/slick/slickconfig"
	"crypto/tls"
	"crypto/x509"
	"io/ioutil"
	"github.com/rs/zerolog/log"
)

var (
	MongoSession *mgo.Session
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

		dialInfo, err := mgo.ParseURL(slickconfig.Configuration.Mongo.URL)
		if err == nil {
			MongoSession, err = mgo.DialWithInfo(dialInfo)
			if err != nil {
				logger.Fatal().AnErr("error", err).Str("url", slickconfig.Configuration.Mongo.URL).Msg("Error connecting to mongodb!")
				return err
			}
		} else {
			logger.Fatal().AnErr("error", err).Str("url", slickconfig.Configuration.Mongo.URL).Msg("Unable to parse URL and connect to mongo!")
			return err
		}

	} else {
		MongoSession, err = mgo.Dial(slickconfig.Configuration.Mongo.URL)
		if err != nil {
			logger.Fatal().AnErr("error", err).Str("url", slickconfig.Configuration.Mongo.URL).Msg("Error connecting to mongodb!")
			return err
		}
	}
	return nil
}

func CloseMongoConnection() {
	if MongoSession != nil {
		MongoSession.Close()
	}
}
