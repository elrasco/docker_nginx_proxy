module.exports = env => (`
  server {
          listen 80;
          server_name ${env}old.market.smallfish.com;
          server_name ${env}old.market.sml-server.com;

          location / {
            proxy_pass		http://${env}services.sml-server.com:99/;
      			proxy_redirect		off;
          }
  }
`);
