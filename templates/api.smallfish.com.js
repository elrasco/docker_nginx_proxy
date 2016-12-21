module.exports = env => (`
    server {
              listen 80;
              server_name ${env}api.smallfish.com;
              server_name ${env}api.sml-server.com;

              location / {
                set $backend "http://${env}services.sml-server.com:81";
                proxy_pass  $backend;
                proxy_redirect		off;
              }
          }
`);
