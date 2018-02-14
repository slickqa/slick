package db

import (
	"github.com/globalsign/mgo"
	"github.com/serussell/logxi/v1"
	"github.com/slickqa/slick/slickconfig"
	"crypto/tls"
	"crypto/x509"
	"io/ioutil"
)

var (
	MongoSession *mgo.Session
)

func InitializeMongoConnection() error {
	var err error
	logger := log.New("db.connection")
	logger.Debug("Connecting to mongo database",
		"url", slickconfig.Configuration.Mongo.URL,
		"useTLS", slickconfig.Configuration.Mongo.UseTLS)
	if slickconfig.Configuration.Mongo.UseTLS {
		roots := x509.NewCertPool()

		if ca, err := ioutil.ReadFile(slickconfig.Configuration.Mongo.RootCertificatesLocation); err == nil {
			roots.AppendCertsFromPEM(ca)
		} else {
			logger.Error("Trying to load Root Certificate Location contained an error, continuing on as if it worked.",
				"RootCertificatesLocation", slickconfig.Configuration.Mongo.RootCertificatesLocation,
				"Error", err)
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
				logger.Fatal("Error connecting to mongodb!",
					"URL", slickconfig.Configuration.Mongo.URL,
					"Error", err)
				return err
			}
		} else {
			logger.Fatal("Unable to parse URL and connect to mongo!",
				"URL", slickconfig.Configuration.Mongo.URL,
				"Error", err)
			return err
		}

	} else {
		MongoSession, err = mgo.Dial(slickconfig.Configuration.Mongo.URL)
		if err != nil {
			logger.Fatal("Error connecting to mongodb!",
				"URL", slickconfig.Configuration.Mongo.URL,
				"Error", err)
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
