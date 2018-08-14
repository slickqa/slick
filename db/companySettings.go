package db

import (
	"github.com/slickqa/slick/slickqa"
	"github.com/slickqa/slick/slickconfig"
	"errors"
	"github.com/rs/zerolog/log"
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
	mongo := MongoSession.Copy()
	defer mongo.Close()
	result := slickqa.CompanySettings{}
	err := mongo.DB(slickconfig.Configuration.Mongo.Database).C(CompanySettingsCollectionName).Find(companyIdQuery{CompanyName: CompanyName}).One(&result)
	return &result, err
}

func (u *companySettingsType) FindAll() ([]*slickqa.CompanySettings, error) {
	mongo := MongoSession.Copy()
	defer mongo.Close()
	result := make([]*slickqa.CompanySettings, 0)
	err := mongo.DB(slickconfig.Configuration.Mongo.Database).C(CompanySettingsCollectionName).Find(nil).All(&result)
	return result, err
}

func (u *companySettingsType) FindAllIn(companies ...string) ([]*slickqa.CompanySettings, error) {
	mongo := MongoSession.Copy()
	defer mongo.Close()
	result := make([]*slickqa.CompanySettings, 0)
	err := mongo.DB(slickconfig.Configuration.Mongo.Database).C(CompanySettingsCollectionName).Find(companyListQuery{CompanyName: inStringList{companies}}).All(&result)
	return result, err
}

func (u *companySettingsType) AddCompanySettings(companySettings *slickqa.CompanySettings) error {
	mongo := MongoSession.Copy()
	defer mongo.Close()
	err := mongo.DB(slickconfig.Configuration.Mongo.Database).C(CompanySettingsCollectionName).Insert(companySettings)
	return err
}

func (u *companySettingsType) UpdateCompanySettings(companyName string, companySettings *slickqa.CompanySettings) error {
	logger := log.With().Str("loggerName", "db.CompanySettings.UpdateCompanySettings").Logger()
	if companySettings.CompanyName != companyName {
		logger.Error().Str("providedCompanyName", companyName).Str("updatedCompanySettingsCompanyName", companySettings.CompanyName).Msg("Request to update company with a name that is different.  Can't change company name!")
		return errors.New("not allowed to change company name in settings")
	}
	mongo := MongoSession.Copy()
	defer mongo.Close()
	err := mongo.DB(slickconfig.Configuration.Mongo.Database).C(CompanySettingsCollectionName).Update(companyIdQuery{CompanyName:companyName}, companySettings)
	return err
}
