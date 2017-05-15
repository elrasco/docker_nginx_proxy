module.exports = env => (`
    server {
              listen 80;
              server_name ${env}mail.smallfish.com;
              server_name ${env}mail.sml-server.com;

              location /public/send {
                set $backend "http://${env}services.internal.sml-server.com:1344";
                proxy_pass  $backend;
                proxy_redirect		off;
              }
          }
`);
