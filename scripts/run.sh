#!/bin/bash

host_ip=$(ifconfig docker0 | grep inet | grep -v inet6 | cut -d' ' -f12 | cut -d':' -f2)

node index.js --env=$1
docker build -t smallfish_proxy .
docker run -p 80:80 --add-host dev.services.internal.sml-server.com:$host_ip -d --name smallfish_proxy smallfish_proxy:latest
