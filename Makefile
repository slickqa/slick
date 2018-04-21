
all: slickqa/slick.pb.go slickqa/slick.pb.gw.go web/public/slick.swagger.json web/src/slick-api

slickqa/slick.pb.go:
	protoc -I/usr/local/include -I. -I${GOPATH}/src -I${GOPATH}/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis --go_out=plugins=grpc+retag:slickqa/ slick.proto

slickqa/slick.pb.gw.go:
	protoc -I/usr/local/include -I. -I${GOPATH}/src -I${GOPATH}/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis --grpc-gateway_out=logtostderr=true:slickqa/ slick.proto

web/public/slick.swagger.json:
	protoc -I/usr/local/include -I. -I${GOPATH}/src -I${GOPATH}/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis --swagger_out=logtostderr=true:web/public/ slick.proto

web/node_modules/.bin/openapi:
	cd web; npm install

web/src/slick-api: web/public/slick.swagger.json web/node_modules/.bin/openapi
	cd web; ./node_modules/.bin/openapi -s public/slick.swagger.json -o src/slick-api -l js
	perl -pi -e 's/module:types.//' web/src/slick-api/*.js
	perl -pi -e 's/typedef slickqa/typedef {Object} slickqa/' web/src/slick-api/types.js
	cat web/additionalTypeDef.txt >> web/src/slick-api/types.js
	perl -pi -e 's/Promise<slickqa(.*?)>/Promise<HttpResponse<slickqa\1>>/' web/src/slick-api/*.js
	perl -pi -e 's/Id\.([A-Z])/Id_\1/g' web/src/slick-api/Links.js
	patch -p1 <fixcodecompletion.diff
clean:
	rm -rf slickqa/slick.pb.go slickqa/slick.pb.gw.go web/public/slick.swagger.json web/src/slick-api
