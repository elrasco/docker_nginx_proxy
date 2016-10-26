FROM nginx

# Main configs
RUN rm /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx

# Status page
RUN mkdir -p /usr/share/nginx/html/status &&\
    echo OK > /usr/share/nginx/html/status/alive

# Virtual hosts
COPY dist/* /etc/nginx/conf.d/
