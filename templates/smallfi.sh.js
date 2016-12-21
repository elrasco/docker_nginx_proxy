module.exports = env => (`
  server {
          listen 80;
          server_name ${env}smallfi.sh;

          location / {
            set $backend "http://${env}api.smallfish.com";
            rewrite ^/(.*) /tiny/$1 break;
            proxy_pass  $backend;
        		proxy_redirect		off;
          }
  }
`);
