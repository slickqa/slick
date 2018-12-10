pipeline {
  agent any
  stages {
    stage('Prepare') {
      steps {
        sh '''if ! docker volume list |grep -q slickqa-slick-build; then docker volume create --opt o=uid=jenkins,gid=jenkins slickqa-slick-build; fi'''
      }
    }
    stage('Build') {
      agent {
        docker {
          image 'slickqa/slick-development'
          args '-v slickqa-slick-build:/development'
        }

      }
      steps {
        sh '''mkdir -p $GOPATH/src/github.com/slickqa
ln -svf $(pwd) $GOPATH/src/github.com/slickqa/slick
cd $GOPATH/src/github.com/slickqa/slick
make deps
cd web
npm install'''
        sh 'make dist'
      }
    }
    stage('Build Test') {
      agent {
        docker {
          image 'slickqa/slick-development'
          args '-v slickqa-slick-build:/development'
        }

      }
      steps {
        sh '''cd $GOPATH/src/github.com/slickqa/slick
go fmt $(go list ./...)
go vet $(go list ./...)
go test -race $(go list ./...)
'''
      }
    }
    stage('Archive the Artifacts') {
      steps {
        archiveArtifacts(artifacts: 'dist/**/*', fingerprint: true, onlyIfSuccessful: true)
      }
    }
  }
}
