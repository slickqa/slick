pipeline {
  agent any
  options { 
	disableConcurrentBuilds()
        lock('Cache Volume')
  }
  stages {
    stage('Prepare') {
      steps {
        sh '''
            if ! docker volume list |grep -q slickqa-slick-build; 
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
        sh '''
            mkdir -p $GOPATH/src/github.com/slickqa
            rm $GOPATH/src/github.com/slickqa/slick
            ln -svf $(pwd) $GOPATH/src/github.com/slickqa/slick
            cd $GOPATH/src/github.com/slickqa/slick
            make deps
            cd web
            npm install
        '''
        sh 'make dist'
        sh '''
            cd $GOPATH/src/github.com/slickqa/slick
            go fmt $(go list ./...)
            go vet $(go list ./...)
            go test -race $(go list ./...)
        '''
        stash(name: 'dist', includes: 'dist/**/*')
      }
    }
    stage('Publish Version') {
      when {
        branch 'master'  //only run these steps on the master branch
      }
      steps {
        unstash('dist')
        sh '''
            docker build -t slickqa/slick -t slickqa/slick:5 -t slickqa/slick:5.0 -t slickqa/slick:5.0.0 -t slickqa/slick:5.0.0.${BUILD_NUMBER} .
            docker push slickqa/slick
            docker rmi slickqa/slick:latest slickqa/slick:5 slickqa/slick:5.0 slickqa/slick:5.0.0 slickqa/slick:5.0.0.${BUILD_NUMBER}
        '''
        archiveArtifacts(artifacts: 'dist/**/*', fingerprint: true, onlyIfSuccessful: true)
      }
    }
  }
}
