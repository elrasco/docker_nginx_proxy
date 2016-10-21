module.exports = env => (`
    server {
            listen 80;
            server_name ${env}market.smallfish.com;
            server_name ${env}market.sml-server.com;

            location / {
              proxy_pass		http://${env}services.sml-server.com:90/;
        			proxy_redirect		off;
            }
    }
`);
