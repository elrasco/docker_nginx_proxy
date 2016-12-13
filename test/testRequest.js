const request = require('supertest-as-promised');
const promise = require('bluebird');
const sails = require('sails.io.js');
const sockets = require('socket.io-client');

const proxy = {
  test: 'http://localhost',
  development: 'http://dev.proxy.sml-server.com',
  stage: 'http://stage.proxy.sml-server.com',
  production: 'http://proxy.sml-server.com'
};
const host = {
  test: (host) => 'dev.' + host,
  development: (host) => 'dev.' + host,
  stage: (host) => 'stage.' + host,
  production: (host) => host.replace(/^smallfish\.com/, 'www.smallfish.com')
};
const webSocketAsUsedInProduction = () => {
  const io = sails(sockets);
  io.sails.autoConnect = false;
  io.sails.environment = 'production';
  io.sails.transports = ['websocket'];
  return io;
};

module.exports = {
  get: data => {
    const expect = data.expect ? data.expect : 200;
    return request(proxy[process.env.NODE_ENV])
      .get(data.url)
      .set('Host', host[process.env.NODE_ENV](data.host))
      .set('Accept-Encoding', 'gzip')
      .expect(expect);
  },
  options: data => {
    return request(proxy[process.env.NODE_ENV])
      .options(data.url)
      .set('Host', host[process.env.NODE_ENV](data.host))
      .set('Accept-Encoding', 'gzip')
      .expect(200)
      .expect('x-powered-by', /Sails/);
  },
  socket: data => {
    return new promise(function(resolve) {
      const socket = webSocketAsUsedInProduction().sails.connect(proxy[process.env.NODE_ENV], {
        initialConnectionHeaders: {
          Host: host[process.env.NODE_ENV](data.host)
        }
      });
      socket.on('connect', function() {
        resolve(this);
      });
    });
  }
};
