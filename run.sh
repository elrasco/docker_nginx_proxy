docker build -t smallfish_proxy_fe_test .
docker run -p 80:80 smallfish_proxy_fe_test:latest
