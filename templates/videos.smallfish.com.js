module.exports = env => (
  `
  server {
          listen 80;
          server_name ${env}videos.smallfish.com;
          server_name ${env}videos.sml-server.com;

          location /p {
            proxy_pass		http://${env}services.sml-server.com:303/p/;
            proxy_redirect		off;
          }
          location /videohub {
            proxy_pass		http://${env}services.sml-server.com:303;
            proxy_redirect		off;
          }
  }
`
);
