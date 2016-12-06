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

module.exports = {
  get: data => {
    const token = data.token ? data.token : '';
    const expect = data.expect ? data.expect : 200;
    return request(proxy[process.env.NODE_ENV])
      .get(data.url)
      .set('Host', host[process.env.NODE_ENV](data.host))
      .set('Authorization', 'Bearer ' + token)
      .expect(expect);
  },
  post: data => {
    const status = data.status ? data.status : 200;
    return request(proxy[process.env.NODE_ENV])
      .post(data.url)
      .set('Host', host[process.env.NODE_ENV](data.host))
      .send(data.body);
  }
};
