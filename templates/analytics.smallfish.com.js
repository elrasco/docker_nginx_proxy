module.exports = env => (
  `
  server {
          listen 80;
          server_name ${env}analytics.smallfish.com;
          server_name ${env}analytics.sml-server.com;

          location / {
            proxy_pass		http://${env}services.sml-server.com:85;
            proxy_redirect		off;
          }
  }
`
);
