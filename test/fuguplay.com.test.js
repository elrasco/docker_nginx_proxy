const request = require('./testRequest');

describe('fuguplay.com', function() {
  it('/', function() {
    return request.frontend({
        url: '/',
        host: 'fuguplay.com'
      })
      .expect(200);
  });
});
