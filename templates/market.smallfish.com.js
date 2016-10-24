module.exports = env => (`
    server {
            listen 80;
            server_name ${env}market.smallfish.com;
            server_name ${env}market.sml-server.com;

            location / {
              proxy_pass		http://${env}services.sml-server.com:90/;
        			proxy_redirect		off;
            }

            location /marketplace-be {
              proxy_pass		http://${env}api.smallfish.com/;
        			proxy_redirect		off;
            }

            location /smallfish-upload {
              proxy_pass		http://${env}upload.smallfish.com/;
        			proxy_redirect		off;
            }

            location /smallfish-live {
              proxy_pass		http://stage-live.smallish.com/;
        			proxy_redirect		off;
            }
    }
`);
