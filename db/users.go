package db

import (
	"github.com/slickqa/slick/slickqa"
	"github.com/slickqa/slick/slickconfig"
)

const (
	UsersCollectionName = "slickusers"
)

type userType struct {}
var User = userType{}

type userIdQuery struct {
	Email string `bson:"_id"`
}

func (u *userType) Find(email string) (*slickqa.UserInfo, error) {
	mongo := MongoSession.Copy()
	defer mongo.Close()
	result := slickqa.UserInfo{}
	err := mongo.DB(slickconfig.Configuration.Mongo.Database).C(UsersCollectionName).Find(userIdQuery{Email: email}).One(&result)
	return &result, err
}

func (u *userType) AddUser(user *slickqa.UserInfo) error {
	mongo := MongoSession.Copy()
	defer mongo.Close()
	err := mongo.DB(slickconfig.Configuration.Mongo.Database).C(UsersCollectionName).Insert(user)
	return err
}

func (u *userType) UpdateUser(user *slickqa.UserInfo) error {
	mongo := MongoSession.Copy()
	defer mongo.Close()
	err := mongo.DB(slickconfig.Configuration.Mongo.Database).C(UsersCollectionName).Update(userIdQuery{Email: user.EmailAddress}, user)
	return err
}
