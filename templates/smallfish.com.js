module.exports = env => {
  const prefix = env === '' ? 'www.' : env;
  return (`server {
          listen 80;
          server_name ${prefix}smallfish.com;
          server_name ${prefix}sml-server.com;

          location / {
            set $backend "http://website-smallfish-homepage-${env}s3-website-eu-west-1.amazonaws.com";
            proxy_pass  $backend;
        		proxy_redirect		off;
          }
    }`);
};
