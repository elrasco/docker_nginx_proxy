#!/bin/bash

node index.js --env=$1
docker build -t smallfish_proxy .
docker run -p 80:80 -d --name smallfish_proxy smallfish_proxy:latest