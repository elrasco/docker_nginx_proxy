module.exports = env => (`
  server {
          listen 80;
          server_name ${env}smallfi.sh;

          location / {
            proxy_pass		http://${env}api.smallfish.com/tiny/;
            proxy_redirect		off;
          }
  }
`);
