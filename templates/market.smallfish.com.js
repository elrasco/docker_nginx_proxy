module.exports = env => (`
    server {
            listen 80;
            server_name ${env}market.smallfish.com;
            server_name ${env}travelpeople.smallfish.com;
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

            location /socket.io {
              proxy_pass		http://${env}live.smallfish.com;
              proxy_http_version 1.1;
              proxy_set_header Upgrade $http_upgrade;
              proxy_set_header Connection "upgrade";
              proxy_set_header X-Real-IP $remote_addr;
              proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
              proxy_set_header Host $host;
            }
    }
`);
