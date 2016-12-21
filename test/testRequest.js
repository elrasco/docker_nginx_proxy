const request = require('supertest-as-promised');
const promise = require('bluebird');

const io = require('sails.io.js')(require('socket.io-client'));
io.sails.autoConnect = false;
io.sails.environment = 'production';
io.sails.transports = ['websocket'];

const inEnvironment = object => object[process.env.NODE_ENV];
const proxy = () => inEnvironment({
  test: 'http://localhost',
  development: 'http://dev.proxy.sml-server.com',
  stage: 'http://stage.proxy.sml-server.com',
  production: 'http://proxy.sml-server.com'
});
const host = host => inEnvironment({
  test: 'dev.' + host,
  development: 'dev.' + host,
  stage: 'stage.' + host,
  production: host.replace(/^smallfish\.com/, 'www.smallfish.com')
                  .replace(/^sml-server\.com/, 'www.sml-server.com')
});

module.exports = {
  post: data => {
    return request(proxy())
      .post(data.url)
      .set('Host', host(data.host))
      .set('Authorization', `Bearer ${data.token}`)
      .set('Accept-Encoding', 'gzip')
      .send(data.body);
  },
  get: data => {
    return request(proxy())
      .get(data.url)
      .set('Host', host(data.host))
      .set('Authorization', `Bearer ${data.token}`)
      .set('Accept-Encoding', 'gzip')
      .expect(200);
  },
  options: data => {
    return request(proxy())
      .options(data.url)
      .set('Host', host(data.host))
      .set('Authorization', `Bearer ${data.token}`)
      .set('Accept-Encoding', 'gzip')
      .expect(200)
      .expect('x-powered-by', /Sails/);
  },
  socket: data => {
    return new promise(function(resolve) {
      const socket = io.sails.connect(proxy(), {
        initialConnectionHeaders: {
          Host: host(data.host)
        }
      });
      socket.on('connect', function() {
        resolve(this);
      });
    });
  }
};
