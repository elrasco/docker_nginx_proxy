module.exports = (env, raw_env) => {
  return (`server {
          listen 80;
          server_name ${env}trev.smallfish.com;
          server_name ${env}trev.sml-server.com;

          location / {
            set $backend "http://website-videmo-landing-${raw_env}.s3-website-eu-west-1.amazonaws.com";
            proxy_pass  $backend;
        		proxy_redirect		off;
          }
    }`);
};
