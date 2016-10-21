module.exports = env => (`
  server {
          listen 80;
          server_name ${env}i18n.smallfish.com;
          server_name ${env}i18n.sml-server.com;

          location / {
            proxy_pass		http://${env}services.sml-server.com:84;
            proxy_redirect		off;
          }
  }
`);
