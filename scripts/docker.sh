#!/usr/bin/env bash

PROJECT_PATH=$1
TAG=$2

$(aws ecr get-login --region eu-west-1)

docker build -t $PROJECT_PATH .

docker tag $PROJECT_PATH:latest $PROJECT_PATH:$TAG

docker push $PROJECT_PATH:$TAG

docker rmi $PROJECT_PATH:$TAG
