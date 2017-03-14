#!/bin/bash

scripts/build.sh $1
docker build -t smallfish_proxy .
docker run -p 80:80 -d --privileged --name smallfish_proxy smallfish_proxy:latest
docker exec -it smallfish_proxy iptables -t nat -A OUTPUT -d 172.31.0.2 -j DNAT --to-destination 8.8.8.8
