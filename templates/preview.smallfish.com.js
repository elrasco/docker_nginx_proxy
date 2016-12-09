module.exports = env => (
  `
  server {
          listen 80;
          server_name ${env}preview.smallfish.com;
          server_name ${env}preview.sml-server.com;

          location / {
            proxy_pass		http://${env}services.sml-server.com:303/preview/;
            proxy_redirect		off;
          }
  }
`
);
