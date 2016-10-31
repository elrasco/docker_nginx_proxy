const request = require('supertest-promised');

describe('status configuration', function() {

  it('should be available to requests in default host', function() {

    return request('http://localhost')
      .get('/status/alive')
      .set('Host', 'any.host')
      .expect(200);

  });

});
