module.exports = () => (`
  server {
    listen  80 default_server;
    location /status/alive {
      return      200 'OK';
    }
  }
`);
