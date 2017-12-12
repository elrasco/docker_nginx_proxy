module.exports = (env, raw_env) => {
  const port = env === "" ? 80 : 81;
  const prefix = env === "" ? "www." : env;

  return `server {
          listen 80;
          server_name ${env}legacy.fuguplay.com;

          proxy_ignore_client_abort   on;
          fastcgi_connect_timeout 75s;

          location / {
            set $backend "http://52.210.144.140:${port}";
            proxy_connect_timeout       600s;
            proxy_send_timeout          600s;
            proxy_read_timeout          600s;
            send_timeout                120s;
            proxy_pass  $backend;
            proxy_redirect		off;
          }
  }`;
};
