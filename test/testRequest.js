const request = require('supertest-promised');

const urls = {
  test: 'http://localhost',
  development: 'http://dev.proxy.sml-server.com',
  stage: 'http://stage.proxy.sml-server.com',
  production: 'http://proxy.sml-server.com'
};

module.exports = data => {
  return request(urls[process.env.NODE_ENV])
            .get(data.url)
            .set('Host', data.host)
            .expect(data.expect);
};
