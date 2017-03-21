module.exports = (env, env_raw) => {
  const port = env === '' ? 80 : 81;

  return (`server {
          listen 80;
          server_name ${env}fuguplay.com;
          server_name ${env}fuguplay.sml-server.com;

          location / {
            set $backend "http://52.210.144.140:${port}";
            proxy_pass  $backend;
            proxy_redirect		off;
          }

          location /profilo/campaigns {
            set $backend "http://website-fuguplay-fe-${raw_env}.s3-website-eu-west-1.amazonaws.com";
            rewrite /(?!.*js|.*ico|.*css) / break;
            rewrite ^/(.*)/$ $1 break;
            proxy_pass  $backend;
            proxy_redirect		off;
          }

          location /landing {
            set $backend "http://website-fugu-landing-${env_raw}.s3-website-eu-west-1.amazonaws.com";
            rewrite ^/landing(.*js|.*ico) $1 break;
            rewrite ^/landing(.*)/$ $1/ break;
            rewrite ^/landing(.*)$ /landing$1/ permanent;
            proxy_hide_header x-amz-id-2;
            proxy_hide_header x-amz-request-id;
            proxy_hide_header x-amz-version-id;
            proxy_pass  $backend;
      			proxy_redirect		off;
          }
  }`);
};
