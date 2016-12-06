const request = require('./testRequest');

describe('alive page', function() {

  it('should be available to requests to default host', function() {
    return request.get({
      url: '/status/alive',
      host: 'any.host'
    });
  });
});
