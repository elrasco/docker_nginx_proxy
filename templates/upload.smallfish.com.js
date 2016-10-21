module.exports = env => (`
  server {
    listen 80;
    server_name ${env}upload.smallfish.com;
    server_name ${env}upload.sml-server.com;

    location / {
      proxy_pass		http://${env}services.sml-server.com:82/;
      proxy_redirect		off;
    }
  }
`);
