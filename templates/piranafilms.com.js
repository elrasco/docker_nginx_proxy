module.exports = () => {
  return (`server {
          listen 80;
          server_name piranafilms.com;
          server_name www.piranafilms.com;

          location / {
            set $backend "http://ec2-52-58-104-171.eu-central-1.compute.amazonaws.com";
            proxy_pass  $backend;
            proxy_set_header  Host $host;
        		proxy_redirect		off;
          }
    }`);
};
