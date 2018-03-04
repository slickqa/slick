package db

import (
	"github.com/slickqa/slick/slickqa"
	"github.com/slickqa/slick/slickconfig"
	"github.com/serussell/logxi/v1"
	"errors"
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

func (u *companySettingsType) Find(CompanyName string) (*slickqa.CompanySettings, error) {
	mongo := MongoSession.Copy()
	defer mongo.Close()
	result := slickqa.CompanySettings{}
	err := mongo.DB(slickconfig.Configuration.Mongo.Database).C(CompanySettingsCollectionName).Find(companyIdQuery{CompanyName: CompanyName}).One(&result)
	return &result, err
}

func (u *companySettingsType) FindAll(companies ...string) ([]*slickqa.CompanySettings, error) {
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
	logger := log.New("db.connection")
	if companySettings.CompanyName != companyName {
		logger.Error("Request to update company with a name that is different.  Can't change company name!", "Company Name", companyName, "Company Settings", companySettings)
		return errors.New("not allowed to change company name in settings")
	}
	mongo := MongoSession.Copy()
	defer mongo.Close()
	err := mongo.DB(slickconfig.Configuration.Mongo.Database).C(CompanySettingsCollectionName).Update(companyIdQuery{CompanyName:companyName}, companySettings)
	return err
}
