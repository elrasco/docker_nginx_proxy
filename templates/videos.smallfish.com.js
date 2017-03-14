module.exports = env => (
  `
  server {
          listen 80;
          server_name ${env}videos.smallfish.com;
          server_name ${env}videos.sml-server.com;

          location /p {
            set $backend "http://${env}services.sml-server.com:303/p";
            rewrite ^/p(.*) /$1 break;
            proxy_pass  $backend;
            proxy_redirect		off;
          }
          location /videohub {
            set $backend "http://${env}services.sml-server.com:303";
            proxy_pass  $backend;
        		proxy_redirect		off;
          }
  }
`
);
