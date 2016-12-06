const request = require('./testRequest');

describe('api.smallfish.com', function() {

  it('/', function() {
    return request.options({
      url: '/api/company',
      host: 'api.smallfish.com'
    });
  });
});
