module.exports = env => {
  const prefix = env === '' ? 'www.' : env;
  return (`server {
          listen 80;
          server_name ${prefix}smallfish.com;
          server_name ${prefix}sml-server.com;

          location / {
            set $backend "http://${env}services.sml-server.com:80";
            proxy_pass  $backend;
        		proxy_redirect		off;
          }
    }`);
};
