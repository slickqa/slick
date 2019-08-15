package db

import (
	"context"
	"errors"
	"fmt"
	"github.com/rs/zerolog/log"
	"github.com/slickqa/slick/slickconfig"
	"github.com/slickqa/slick/slickqa"
)

const (
	CompanySettingsCollectionName = "company-settings"
)

type companySettingsType struct {}
var CompanySettings = companySettingsType{}

type companyIdQuery struct {
	CompanyName string `bson:"_id"`
}

type companyListQuery struct {
	CompanyName inStringList `bson:"_id"`
}

func EmptyCompanySettingsFor(name string) *slickqa.CompanySettings {
	return &slickqa.CompanySettings{
		CompanyName: name,
		StorageSettings: &slickqa.S3StorageSettings{},
		Links: make([]*slickqa.Link, 0),
		UserPreferenceTemplate: &slickqa.Preferences{
			Favorites: make([]*slickqa.Link, 0),
			HomeUrl: "/user/settings",
			Theme: "Red",
		},
	}
}

func (u *companySettingsType) Find(CompanyName string) (*slickqa.CompanySettings, error) {
	result := slickqa.CompanySettings{}
	findResult := Client.Database(slickconfig.Configuration.Mongo.Database).Collection(CompanySettingsCollectionName).FindOne(context.TODO(), companyIdQuery{CompanyName: CompanyName})
	if findResult == nil || findResult.Err() != nil {
		return nil, fmt.Errorf("no company settings for %s found", CompanyName)
	}
	err := findResult.Decode(&result)
	return &result, err
}

func (u *companySettingsType) FindAll() ([]*slickqa.CompanySettings, error) {
	result := make([]*slickqa.CompanySettings, 0)
	cursor, err := Client.Database(slickconfig.Configuration.Mongo.Database).Collection(CompanySettingsCollectionName).Find(context.TODO(), nil)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(context.TODO())
	err = cursor.All(context.TODO(), &result)
	return result, err
}

func (u *companySettingsType) FindAllIn(companies ...string) ([]*slickqa.CompanySettings, error) {
	result := make([]*slickqa.CompanySettings, 0)
	cursor, err := Client.Database(slickconfig.Configuration.Mongo.Database).Collection(CompanySettingsCollectionName).Find(context.TODO(), companyListQuery{CompanyName: inStringList{companies}})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(context.TODO())
	err = cursor.All(context.TODO(), &result)
	return result, err
}

func (u *companySettingsType) AddCompanySettings(companySettings *slickqa.CompanySettings) error {
	_, err := Client.Database(slickconfig.Configuration.Mongo.Database).Collection(CompanySettingsCollectionName).InsertOne(context.TODO(), companySettings)
	return err
}

func (u *companySettingsType) UpdateCompanySettings(companyName string, companySettings *slickqa.CompanySettings) error {
	logger := log.With().Str("loggerName", "db.CompanySettings.UpdateCompanySettings").Logger()
	if companySettings.CompanyName != companyName {
		logger.Error().Str("providedCompanyName", companyName).Str("updatedCompanySettingsCompanyName", companySettings.CompanyName).Msg("Request to update company with a name that is different.  Can't change company name!")
		return errors.New("not allowed to change company name in settings")
	}
	_, err := Client.Database(slickconfig.Configuration.Mongo.Database).Collection(CompanySettingsCollectionName).UpdateOne(context.TODO(), companyIdQuery{CompanyName:companyName}, companySettings)
	return err
}
