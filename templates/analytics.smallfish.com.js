module.exports = env => (
  `
  server {
          listen 80;
          server_name ${env}analytics.smallfish.com;
          server_name ${env}analytics.sml-server.com;

          location / {
            set $backend "http://${env}services.sml-server.com:85";
            proxy_pass  $backend;
            proxy_redirect		off;
          }
  }
`
);
