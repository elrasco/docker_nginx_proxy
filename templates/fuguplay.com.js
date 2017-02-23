module.exports = env => {
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
  }`);
};
