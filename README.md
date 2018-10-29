# slick
Slick Test Management and Result Repository

## Getting Started 
The easiest way to get started is by pulling the repo using go get and opening your project from $GOPATH/go/src/github.com/slickqa/slick

  `go get github.com/slickqa/slick`

Get the dependancies:  

    `$GOHOME/src/github.com/slickqa/slick/make deps`

Build:

    `$GOHOME/src/github.com/slickqa/slick/go build`
  
Generate config slick.toml:

    `./slick init -o slick.toml`
  
Start your slick backend:

    `./slick -d serve -dev`
  
Set up Google Authentication.  You will need to add the "client-id" and the "secret" to the slick.toml in the "google-authentication" section:
    
    `go to https://console.developers.google.com and create a project, and then go to API and Services -> Credentials and create credentials.`

Start the frontend: 
    `cd web`
    
    `npm run dev`
    
You can now browse to https://localhost:8888 and get to the UI
