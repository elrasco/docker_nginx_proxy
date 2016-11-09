
module.exports = env => (`
  server {
          listen 80;
          server_name ${env}admin.smallfish.com;
          server_name ${env}admin.sml-server.com;

          location / {
            proxy_pass		http://${env}services.sml-server.com:300/;
      			proxy_redirect		off;
          }
          location /api {
            proxy_pass		http://${env}services.sml-server.com:301;
      			proxy_redirect		off;
          }
          location /smallfish-api {
            proxy_pass	  http://${env}services.internal.sml-server.com:1342/;
      			proxy_redirect		off;
          }
          location /marketplace-api {
            proxy_pass	  http://${env}services.internal.sml-server.com:1341/;
      			proxy_redirect		off;
          }
          location /mailfish {
            proxy_pass		http://${env}services.sml-server.com:302;
      			proxy_redirect		off;
          }
          location /projects {
            proxy_pass		http://${env}services.sml-server.com:305;
      			proxy_redirect		off;
          }
          location /marketplace {
            proxy_pass		http://${env}services.sml-server.com:306;
      			proxy_redirect		off;
          }
  }
`);
