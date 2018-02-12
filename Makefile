
all: slickqa/slick.pb.go slickqa/slick.pb.gw.go web/public/slick.swagger.json

slickqa/slick.pb.go:
	protoc -I/usr/local/include -I. -I${GOPATH}/src -I${GOPATH}/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis --go_out=plugins=grpc:slickqa/ slick.proto

slickqa/slick.pb.gw.go:
	protoc -I/usr/local/include -I. -I${GOPATH}/src -I${GOPATH}/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis --grpc-gateway_out=logtostderr=true:slickqa/ slick.proto

web/public/slick.swagger.json:
	protoc -I/usr/local/include -I. -I${GOPATH}/src -I${GOPATH}/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis --swagger_out=logtostderr=true:web/public/ slick.proto

clean:
	rm -f slick.pb.go slick.pb.gw.go slick.swagger.json
