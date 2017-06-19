module.exports = (env, raw_env) => {
  const prefix = env === '' ? 'www.' : env;
  return (`server {
          listen 80;
          server_name ${prefix}piranafilms.com;

          location / {
            set $backend "http://ec2-52-28-116-99.eu-central-1.compute.amazonaws.com:9000";
            proxy_pass  $backend;
        		proxy_redirect		off;
          }
    }`);
};
