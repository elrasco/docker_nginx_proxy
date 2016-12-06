const request = require('./testRequest');

describe('api.smallfish.com', function() {

  it('/', function() {
    return request.get({
      url: '/rest/company',
      host: 'admin.smallfish.com'
    });
  });
});
