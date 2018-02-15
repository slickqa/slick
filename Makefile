
all: slickqa/slick.pb.go slickqa/slick.pb.gw.go web/public/slick.swagger.json web/slick-client

slickqa/slick.pb.go:
	protoc -I/usr/local/include -I. -I${GOPATH}/src -I${GOPATH}/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis --go_out=plugins=grpc+retag:slickqa/ slick.proto

slickqa/slick.pb.gw.go:
	protoc -I/usr/local/include -I. -I${GOPATH}/src -I${GOPATH}/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis --grpc-gateway_out=logtostderr=true:slickqa/ slick.proto

web/public/slick.swagger.json:
	protoc -I/usr/local/include -I. -I${GOPATH}/src -I${GOPATH}/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis --swagger_out=logtostderr=true:web/public/ slick.proto

swagger-codegen-cli-2.3.1.jar:
	wget http://repo1.maven.org/maven2/io/swagger/swagger-codegen-cli/2.3.1/swagger-codegen-cli-2.3.1.jar

web/slick-client: web/public/slick.swagger.json swagger-codegen-cli-2.3.1.jar
	java -jar swagger-codegen-cli-2.3.1.jar generate -t web/webpack-swagger-template -i web/public/slick.swagger.json -c web/swagger-codegen-config.json -l javascript -o web/slick-client

clean:
	rm -rf slickqa/slick.pb.go slickqa/slick.pb.gw.go web/public/slick.swagger.json web/slick-client
