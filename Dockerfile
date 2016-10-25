FROM nginx

# Main configs
RUN rm /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx

# Virtual hosts
COPY dist/* /etc/nginx/conf.d/
