module.exports = env => (`
    server {
              listen 80;
              server_name ${env}api.smallfish.com;
              server_name ${env}api.sml-server.com;

              resolver

              location / {
                proxy_pass		http://${env}services.sml-server.com:81;
    			      proxy_redirect		off;
              }
          }
`);
