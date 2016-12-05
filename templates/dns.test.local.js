module.exports = env => (`
  server {
    listen  80;
    server_name dns.test.local;

    location / {
      proxy_pass		http://${env}services.sml-server.com:6666;
      proxy_redirect		off;
    }
    location /rewrite {
      proxy_pass	  http://${env}services.internal.sml-server.com:6666/;
      proxy_redirect		off;
    }
  }
`);
