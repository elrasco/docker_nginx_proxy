#!/bin/bash

host_ip=$(ifconfig docker0 | grep inet | grep -v inet6 | cut -d' ' -f12 | cut -d':' -f2)

if [ $2 == --testing ]
then
  host_mappings="--add-host dev.services.internal.sml-server.com:${host_ip} --add-host dev.services.sml-server.com:${host_ip}"
fi

node index.js --env=$1
docker build -t smallfish_proxy .
docker run \
-p 80:80 \
$host_mappings \
-d \
--name smallfish_proxy \
smallfish_proxy:latest
