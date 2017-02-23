module.exports = env => (`
  server {
          listen 80;
          server_name ${env}fuguplay.com;

          location / {
            set $backend "http://52.210.144.140:81";
            proxy_pass  $backend;
            proxy_redirect		off;
          }
  }
`);
