const request = require('supertest-promised');

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
  production: (host) => host,
};

module.exports = data => {
  return request(proxy[process.env.NODE_ENV])
            .get(data.url)
            .set('Host', host[process.env.NODE_ENV](data.host))
            .expect(200);
};
