package slickversion

import "fmt"

const (
	Release = "5.0.0"
)


func GetVersion() string {
	return fmt.Sprintf("%s.%s", Release, Build)
}
