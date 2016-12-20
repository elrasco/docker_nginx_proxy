module.exports = env => (`
  server {
          listen 80;
          server_name ${env}admin.smallfish.com;
          server_name ${env}admin.sml-server.com;

          resolver 172.31.0.2;

          location / {
            set $backend "http://${env}services.sml-server.com:300";
            proxy_pass  $backend;
            proxy_redirect  off;
          }
          location /api {
            set $backend "http://${env}services.sml-server.com:301";
            proxy_pass  $backend;
            proxy_redirect  off;
          }
          location /smallfish-auth {
            set $backend "http://${env}services.internal.sml-server.com:1343";
            rewrite ^/smallfish-auth(.*) /$1 break;
            proxy_pass  $backend;
      			proxy_redirect		off;
          }
          location /smallfish-upload {
            set $backend "http://${env}services.sml-server.com:82";
            rewrite ^/smallfish-upload(.*) /$1 break;
            proxy_pass  $backend;
      			proxy_redirect		off;
          }
          location /smallfish-api {
            set $backend "http://${env}services.internal.sml-server.com:1342";
            rewrite ^/smallfish-api(.*) /$1 break;
            proxy_pass  $backend;
      			proxy_redirect		off;
          }
          location /marketplace-api {
            set $backend "http://${env}services.internal.sml-server.com:1341";
            rewrite ^/marketplace-api(.*) /$1 break;
            proxy_pass  $backend;
            proxy_redirect  off;
          }
          location /mailfish {
            set $backend "http://${env}services.sml-server.com:302";
            proxy_pass  $backend;
            proxy_redirect  off;
          }
          location /videohub {
            set $backend "http://${env}services.sml-server.com:303";
            proxy_pass  $backend;
      			proxy_redirect		off;
          }
          location /projects {
            set $backend "http://${env}services.sml-server.com:305";
            proxy_pass  $backend;
            proxy_redirect		off;
          }
          location /marketplace {
            set $backend "http://${env}services.sml-server.com:306";
            proxy_pass  $backend;
            proxy_redirect		off;
          }
  }
`);
