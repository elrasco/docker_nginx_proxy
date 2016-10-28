module.exports = env => (`
  server {
    listen 80;
    server_name ${env}upload.smallfish.com;
    server_name ${env}upload.sml-server.com;

    location / {
      if ($request_method = OPTIONS ) {
        add_header Access-Control-Allow-Origin "*";
        add_header Access-Control-Allow-Methods "GET, OPTIONS";
        add_header Access-Control-Allow-Headers "Authorization";
        add_header Access-Control-Allow-Credentials "true";
        add_header Content-Length 0;
        add_header Content-Type text/plain;
      }
      proxy_pass		http://${env}services.sml-server.com:82/;
      proxy_redirect		off;
    }
  }
`);
