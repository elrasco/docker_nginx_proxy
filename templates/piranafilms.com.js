module.exports = (env, raw_env) => {
  const prefix = env === '' ? 'www.' : env;
  return (`server {
          listen 80;
          server_name ${prefix}piranafilms.com;

          location / {
            set $backend "http://ec2-52-58-104-171.eu-central-1.compute.amazonaws.com";
            proxy_pass  $backend;
        		proxy_redirect		off;
          }
    }`);
};
