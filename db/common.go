package db


type inStringList struct {
	Items []string `bson:"$in"`
}

