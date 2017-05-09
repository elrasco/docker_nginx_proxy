module.exports = (env, raw_env) => (`
  server {
          listen 80;
          server_name ${env}m.smallfish.com;
          server_name ${env}m.sml-server.com;

          location / {
            set $backend "http://website-smallfish-homepage-${raw_env}.s3-website-eu-west-1.amazonaws.com";
            proxy_pass  $backend;
            proxy_redirect		off;
          }
  }
`);
