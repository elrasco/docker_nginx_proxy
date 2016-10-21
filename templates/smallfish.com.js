module.exports = env => (`
  server {
          listen 80;
          server_name ${env}smallfish.com;
          server_name ${env}sml-server.com;

          location / {
            proxy_pass		http://${env}services.sml-server.com:80/;
      			proxy_redirect		off;
          }
  }
`);
