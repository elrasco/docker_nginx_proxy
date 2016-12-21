FROM nginx

# Convenience tools
RUN apt-get update && \
    apt-get install -y iptables curl

# Main configs
RUN rm /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx

# Virtual hosts
COPY dist/* /etc/nginx/conf.d/
