module.exports = env => (`
  server {
    listen 80;
    server_name ${env}upl.smallfish.com;
    server_name ${env}upload.smallfish.com;
    server_name ${env}upload.sml-server.com;

    location / {
      set $backend "http://${env}services.sml-server.com:82";
      proxy_pass  $backend;
      proxy_redirect		off;
    }
  }
`);
