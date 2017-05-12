module.exports = (env, raw_env) => {
  return (`server {
          listen 80;
          server_name ${env}videmo.smallfish.com;
          server_name ${env}videmo.sml-server.com;

          location / {
            set $backend "http://website-videmo-landing-${raw_env}.s3-website-eu-west-1.amazonaws.com";
            proxy_pass  $backend;
            proxy_hide_header x-amz-id-2;
            proxy_hide_header x-amz-request-id;
        		proxy_redirect		off;
          }
    }`);
};
