module.exports = (env, raw_env) => (
  `
  server {
          listen 80;
          server_name ${env}videos.smallfish.com;
          server_name ${env}videos.sml-server.com;

          location /p {
            set $backend "http://website-backoffice-videohub-${raw_env}.s3-website-eu-west-1.amazonaws.com";
            rewrite /(?!.*js|.*ico|.*css) / break;
            rewrite ^/(.*)/$ $1 break;
            proxy_pass  $backend;
            proxy_redirect		off;
          }
          location /videohub {
            set $backend "http://website-backoffice-videohub-${raw_env}.s3-website-eu-west-1.amazonaws.com";
            rewrite /(?!.*js|.*ico|.*css) / break;
            rewrite ^/(.*)/$ $1 break;
            proxy_pass  $backend;
        		proxy_redirect		off;
          }
  }
`
);
