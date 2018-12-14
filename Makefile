BUILD_NUMBER?=dev
JAVASCRIPT_SOURCE_FILES:=$(shell find web/src -print)

all: generated

generated: slickqa/slick.pb.go slickqa/slick.pb.gw.go web/public/slick.swagger.json web/src/slick-api

slickqa/slick.pb.go: slick.proto
	protoc -I/usr/local/include -I. -I${GOPATH}/src -I${GOPATH}/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis --go_out=plugins=grpc+retag:slickqa/ slick.proto

slickqa/slick.pb.gw.go: slick.proto
	protoc -I/usr/local/include -I. -I${GOPATH}/src -I${GOPATH}/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis --grpc-gateway_out=logtostderr=true:slickqa/ slick.proto

web/public/slick.swagger.json: slick.proto
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
	perl -pi -e 's/Id\.([A-Z])/Id_\1/g' web/src/slick-api/Agents.js
	patch -p1 <fixcodecompletion.diff
clean:
	rm -rf slickqa/slick.pb.go slickqa/slick.pb.gw.go web/public/slick.swagger.json web/src/slick-api build dist web/dist slickversion/build.go

web/dist/index.js: web/src/slick-api $(JAVASCRIPT_SOURCE_FILES)
	cd web; npm install; npm run dist 

dist/web.zip: web/dist/index.js
	mkdir -p dist
	cd web/dist; zip -9 -r ../../dist/web.zip .

slickversion/build.go:
	cd slickversion; echo "package slickversion\n\nconst (\n\tBuild = \"${BUILD_NUMBER}\"\n)\n" > build.go

dist/linux-amd64-normal/slick: generated
	mkdir -p dist/linux-amd64-normal
	GOOS=linux GOARCH=amd64 CGO_ENABLED=0 go build -a -ldflags '-extldflags "-static"' -o dist/linux-amd64-normal/slick

dist/linux-amd64-embedded/slick: dist/web.zip dist/linux-amd64-normal/slick
	mkdir -p dist/linux-amd64-embedded
	cp dist/linux-amd64-normal/slick dist/linux-amd64-embedded/slick
	rice append -i ./commands --exec dist/linux-amd64-embedded/slick

dist/mac-amd64-normal/slick: generated
	mkdir -p dist/mac-amd64-normal
	GOOS=darwin GOARCH=amd64 go build -o dist/mac-amd64-normal/slick

dist/mac-amd64-embedded/slick: dist/web.zip dist/mac-amd64-normal/slick
	mkdir -p dist/mac-amd64-embedded
	cp dist/mac-amd64-normal/slick dist/mac-amd64-embedded/slick
	rice append -i ./commands --exec dist/mac-amd64-embedded/slick

dist/windows-amd64-normal/slick.exe: generated
	mkdir -p dist/windows-amd64-normal
	GOOS=windows GOARCH=amd64 go build -o dist/windows-amd64-normal/slick.exe

dist/windows-amd64-embedded/slick.exe: dist/web.zip dist/linux-amd64-normal/slick
	mkdir -p dist/windows-amd64-embedded
	cp dist/windows-amd64-normal/slick.exe dist/windows-amd64-embedded/slick.exe
	rice append -i ./commands --exec dist/windows-amd64-embedded/slick.exe


dist: dist/web.zip slickversion/build.go dist/linux-amd64-normal/slick dist/linux-amd64-embedded/slick dist/mac-amd64-normal/slick dist/mac-amd64-embedded/slick dist/windows-amd64-normal/slick.exe dist/windows-amd64-embedded/slick.exe

deps:
	go get -u github.com/GeertJohan/go.rice
	go get -u github.com/GeertJohan/go.rice/rice
	go get -u github.com/slickqa/protobuf/protoc-gen-go
	go get -u github.com/grpc-ecosystem/grpc-gateway/protoc-gen-grpc-gateway
	go get -u github.com/grpc-ecosystem/grpc-gateway/protoc-gen-swagger
	go list ./... |xargs go list -f '{{ join .Imports "\n" }}' |grep -v github.com/slickqa/slick | grep -v workspace |xargs go get -u -t -f
