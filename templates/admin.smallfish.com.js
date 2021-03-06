const backoffice_app = (name, raw_env) => {
  return `location /${name} {
            set $backend "http://website-backoffice-${name}-${raw_env}.s3-website-eu-west-1.amazonaws.com";
            rewrite /(?!.*js|.*ico|.*css) / break;
            rewrite ^/(.*)/$ /${name}/$1 break;
            proxy_pass  $backend;
            proxy_redirect		off;
          }`;
};

module.exports = (env, raw_env) => (`
  server {
          listen 80;
          server_name ${env}admin.smallfish.com;
          server_name ${env}admin.sml-server.com;

          location /api {
            set $backend "http://${env}services.sml-server.com:301";
            proxy_pass  $backend;
            proxy_redirect  off;
          }
          location /smallfish-auth {
            set $backend "http://${env}services.internal.sml-server.com:1343";
            rewrite ^/smallfish-auth(.*) /$1 break;
            proxy_pass  $backend;
      			proxy_redirect		off;
          }
          location /smallfish-upload {
            set $backend "http://${env}services.sml-server.com:82";
            rewrite ^/smallfish-upload(.*) /$1 break;
            proxy_pass  $backend;
      			proxy_redirect		off;
          }
          location /smallfish-api {
            set $backend "http://${env}services.internal.sml-server.com:1342";
            rewrite ^/smallfish-api(.*) /$1 break;
            proxy_pass  $backend;
      			proxy_redirect		off;
          }
          location /marketplace-api {
            set $backend "http://${env}services.internal.sml-server.com:1341";
            rewrite ^/marketplace-api(.*) /$1 break;
            proxy_pass  $backend;
            proxy_redirect  off;
          }
          location / {
            set $backend "http://website-backoffice-container-${raw_env}.s3-website-eu-west-1.amazonaws.com";
            rewrite /(?!.*js|.*ico|.*css) / break;
            rewrite ^/(.*)/$ $1 break;
            proxy_pass  $backend;
            proxy_redirect  off;
          }
          ${backoffice_app('videohub',raw_env)}
          ${backoffice_app('projects',raw_env)}
          ${backoffice_app('marketplace',raw_env)}
          ${backoffice_app('users',raw_env)}
          location /mailfish {
            set $backend "http://${env}services.sml-server.com:302";
            proxy_pass  $backend;
            proxy_redirect  off;
          }
  }
`);
