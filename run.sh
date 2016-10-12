docker build -t smallfish_proxy_fe .
docker run -p 80:80 smallfish_proxy_fe:latest
