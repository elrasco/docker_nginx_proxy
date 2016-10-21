module.exports = env => (`
  server {
          listen 80;
          server_name ${env}m.smallfish.com;
          server_name ${env}m.sml-server.com;

          location / {
            proxy_pass		http://${env}services.sml-server.com:93/;
            proxy_redirect		off;
          }
  }
`);
