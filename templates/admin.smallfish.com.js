module.exports = (env, raw_env) => (`
  server {
          listen 80;
          server_name ${env}admin.smallfish.com;
          server_name ${env}admin.sml-server.com;

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

          location / {
            set $backend "http://website-backoffice-container-${raw_env}.s3-website-eu-west-1.amazonaws.com";            
            proxy_pass  $backend;
            proxy_redirect  off;
          }
          location /mailfish {
            set $backend "http://website-backoffice-mailfish-${raw_env}.s3-website-eu-west-1.amazonaws.com";            
            proxy_pass  $backend;
            proxy_redirect  off;
          }
          location /videohub {
            set $backend "http://website-backoffice-videohub-${raw_env}.s3-website-eu-west-1.amazonaws.com";            
            proxy_pass  $backend;
      			proxy_redirect		off;
          }
          location /projects {
            set $backend "http://website-backoffice-projects-${raw_env}.s3-website-eu-west-1.amazonaws.com";            
            proxy_pass  $backend;
            proxy_redirect		off;
          }
          location /marketplace {
            set $backend "http://website-backoffice-marketplace-${raw_env}.s3-website-eu-west-1.amazonaws.com";            
            proxy_pass  $backend;
            proxy_redirect		off;
          }
          location /users {
            set $backend "http://website-backoffice-users-${raw_env}.s3-website-eu-west-1.amazonaws.com";            
            proxy_pass  $backend;
            proxy_redirect		off;
          }
  }
`);
