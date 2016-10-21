FROM nginx
COPY dist/* /etc/nginx/conf.d/
