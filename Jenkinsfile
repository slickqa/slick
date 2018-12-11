pipeline {
  agent any
  stages {
    stage('Prepare') {
      steps {
        sh '''if ! docker volume list |grep -q slickqa-slick-build; 
then 
    docker volume create slickqa-slick-build;
fi
JENKINS_UID=$(id jenkins -u)
JENKINS_GID=$(id jenkins -g)
docker run --rm=true -v slickqa-slick-build:/development slickqa/slick-development /bin/bash -c "mkdir /development/go /development/.cache /development/home 2>/dev/null; chown -R $JENKINS_UID:$JENKINS_GID /development/go /development/.cache /development/home;"
'''
      }
    }
    stage('Build') {
      agent {
        docker {
          image 'slickqa/slick-development'
          args '-v slickqa-slick-build:/development -e HOME=/development/home'
        }

      }
      steps {
        sh '''mkdir -p $GOPATH/src/github.com/slickqa
ln -svf $(pwd) $GOPATH/src/github.com/slickqa/slick
cd $GOPATH/src/github.com/slickqa/slick
make deps
go get .
cd web
npm install'''
        sh 'make dist'
      }
    }
    stage('Build Test') {
      agent {
        docker {
          image 'slickqa/slick-development'
          args '-v slickqa-slick-build:/development -e HOME=/development/home'
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
