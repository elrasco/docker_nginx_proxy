module.exports = (env, raw_env) => (`
    server {
            listen 80;
            server_name ${env}market.smallfish.com;
            server_name ${env}travelpeople.smallfish.com;
            server_name ${env}market.sml-server.com;

            location / {
              set $backend "http://WEBSITES-marketplace-fe-${raw_env}.s3-website-eu-west-1.amazonaws.com";
              proxy_pass  $backend;
              proxy_redirect		off;
            }

            location /marketplace-be {
              set $backend "http://${env}services.sml-server.com:81";
              rewrite ^/marketplace-be(.*) /$1 break;
              proxy_pass  $backend;
        			proxy_redirect		off;
            }

            location /smallfish-upload {
              set $backend "http://${env}services.sml-server.com:82";
              rewrite ^/smallfish-upload(.*) /$1 break;
              proxy_pass  $backend;
        			proxy_redirect		off;
            }

            location /socket.io {
              set $backend http://${env}live.sml-server.com;
              proxy_pass  $backend;
              proxy_http_version 1.1;
              proxy_set_header Upgrade $http_upgrade;
              proxy_set_header Connection "upgrade";
              proxy_set_header X-Real-IP $remote_addr;
              proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
              proxy_set_header Host $host;
            }
    }
`);
