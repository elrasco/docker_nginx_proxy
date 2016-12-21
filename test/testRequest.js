const request = require('supertest-as-promised');
const promise = require('bluebird');

const io = require('sails.io.js')(require('socket.io-client'));
io.sails.autoConnect = false;
io.sails.environment = 'production';
io.sails.transports = ['websocket'];

const inEnvironment = object => object[process.env.NODE_ENV];
const toProxy = () => inEnvironment({
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
const send = data => {
  const theRequest = request(toProxy());
  const using = method => method(data.url)
    .set('Host', host(data.host))
    .set('Authorization', `Bearer ${data.token}`)
    .set('Accept-Encoding', 'gzip');
  return {
    post: () => using(theRequest.post).send(data.body),
    get: () => using(theRequest.get).expect(200),
    options: () => using(theRequest.options)
      .expect(200)
      .expect('x-powered-by', /Sails/)
  };
};

module.exports = {
  post: data => send(data).post(),
  get: data => send(data).get(),
  options: data => send(data).options(),
  socket: data => {
    return new promise(function(resolve) {
      const socket = io.sails.connect(toProxy(), {
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
