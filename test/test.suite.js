const ok = require('./testRequest');

describe('alive page', function() {

  it('should be available to requests to default host', function() {
    return ok({
      url: '/status/alive',
      host: 'any.host'
    });
  });

});

describe('admin.smallfish.com', function() {

  it('/', function() {
    return ok({
      url: '/',
      host: 'admin.smallfish.com'
    });
  });

});
