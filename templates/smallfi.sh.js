module.exports = env => (`
  server {
          listen 80;
          server_name ${env}smallfi.sh;

          location / {
            set $backend "http://${env}services.sml-server.com:81";
            rewrite ^/(.*) /tiny/$1 break;
            proxy_pass  $backend;
        		proxy_redirect		off;
          }
  }
`);
