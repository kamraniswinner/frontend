pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "kamran7777777/frontend-image"
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/kamraniswinner/amour.git'
                dir('frontend') {
                    // Ensure we're working in the frontend directory
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    dir('frontend') {
                        // Add diagnostic steps
                        sh 'echo $PATH'
                        sh 'node -v'
                        sh 'npm -v'
                        sh 'npm install'
                        sh 'npm run build'
                    }
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    dir('frontend') {
                        sh "docker build -t ${DOCKER_IMAGE}:latest ."
                    }
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    try {
                        withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                            sh '''
                                echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin
                                docker push ${DOCKER_IMAGE}:latest
                            '''
                        }
                        echo 'Successfully pushed Docker image to Docker Hub'
                    } catch (Exception e) {
                        echo "Failed to push Docker image to Docker Hub: ${e.message}"
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Build, Docker image creation, and push successful!'
        }
        failure {
            echo 'Build failed!'
        }
    }
}
