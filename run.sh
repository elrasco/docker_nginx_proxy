docker build -t smallfish_proxy_fe -f Dockerfile.dev .
docker run -p 80:80 smallfish_proxy_fe:latest
