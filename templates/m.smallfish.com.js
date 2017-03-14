module.exports = env => (`
  server {
          listen 80;
          server_name ${env}m.smallfish.com;
          server_name ${env}m.sml-server.com;

          location / {
            set $backend "http://${env}services.sml-server.com:93";
            proxy_pass  $backend;
            proxy_redirect		off;
          }
  }
`);
