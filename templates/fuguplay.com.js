module.exports = env => {
  const port = env === '' ? 80 : 81;
  const envPrefix = env === '' ? 'prod' : env.replace('\.', '');

  return (`server {
          listen 80;
          server_name ${env}fuguplay.com;
          server_name ${env}fuguplay.sml-server.com;

          location / {
            set $backend "http://52.210.144.140:${port}";
            proxy_pass  $backend;
            proxy_redirect		off;
          }

          location /landing {
            set $backend "http://${envPrefix}-fugu-landing.s3-website-us-east-1.amazonaws.com";
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
