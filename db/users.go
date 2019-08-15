package db

import (
	"context"
	"fmt"
	"github.com/slickqa/slick/slickconfig"
	"github.com/slickqa/slick/slickqa"
	"go.mongodb.org/mongo-driver/bson"
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
	result := slickqa.UserInfo{}
	findResult := Client.Database(slickconfig.Configuration.Mongo.Database).Collection(UsersCollectionName).FindOne(context.TODO(), userIdQuery{Email: email})
	if findResult == nil || findResult.Err() != nil {
		return nil, fmt.Errorf("user with email %s not found", email)
	}
	err := findResult.Decode(&result)
	return &result, err
}

func (u *userType) FindByToken(token string) (*slickqa.UserInfo, error) {
	result := slickqa.UserInfo{}
	findResult := Client.Database(slickconfig.Configuration.Mongo.Database).Collection(UsersCollectionName).FindOne(context.TODO(), bson.M{"apiToken": token})
	if findResult == nil || findResult.Err() != nil {
		return nil, fmt.Errorf("user with token %s not found", token)
	}
	err := findResult.Decode(&result)
	return &result, err
}

func (u *userType) AddUser(user *slickqa.UserInfo) error {
	_, err := Client.Database(slickconfig.Configuration.Mongo.Database).Collection(UsersCollectionName).InsertOne(context.TODO(), user)
	return err
}

func (u *userType) UpdateUser(user *slickqa.UserInfo) error {
	_, err := Client.Database(slickconfig.Configuration.Mongo.Database).Collection(UsersCollectionName).UpdateOne(context.TODO(), userIdQuery{Email: user.EmailAddress}, user)
	return err
}
