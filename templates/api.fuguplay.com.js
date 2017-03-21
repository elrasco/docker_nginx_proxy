module.exports = env => (`
    server {
              listen 80;
              server_name ${env}api.fuguplay.com;
              server_name ${env}api.fuguplay.sml-server.com;

              location / {
                set $backend "http://${env}services.sml-server.com:86";
                proxy_pass  $backend;
                proxy_redirect		off;
              }
          }
`);
