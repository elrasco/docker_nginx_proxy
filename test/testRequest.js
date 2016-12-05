const request = require('supertest-promised');

module.exports = data => {
  const port = data.port ? data.port : 80;
  return request('http://localhost:' + port)
            .get(data.url)
            .set('Host', data.host)
            .expect(data.expect);
};
