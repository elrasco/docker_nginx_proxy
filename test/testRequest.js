const request = require('supertest');
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
                  .replace(/^fuguplay\.com/, 'www.fuguplay.com')
                  .replace(/^fuguplay\.it/, 'www.fuguplay.it')
                  .replace(/^sml-server\.com/, 'www.sml-server.com')
});
const send = data => {
  const theRequest = request(toProxy());
  const using = method => method(data.url)
    .set('Host', host(data.host))
    .set('Authorization', `Bearer ${global.auth}`)
    .set('Accept-Encoding', 'gzip')
    .redirects(1);
  return {
    post: () => using(theRequest.post).send(data.body),
    get: () => using(theRequest.get),
    options: () => using(theRequest.options)
  };
};

module.exports = {

  post: data => send(data).post(),
  options: data => send(data).options().expect(200),
  api: data => send(data).get().expect(200).expect('x-powered-by', /Sails/),
  frontend: data => send(data).get().expect(200),
  notFound: data => send(data).get().expect(404),

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
