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

  it('/api', function() {
    return ok({
      url: '/api/auth/authenticated',
      host: 'admin.smallfish.com',
      status: 403
    });
  });

  it('/smallfish-auth', function() {
    return ok({
      url: '/smallfish-auth/user?populate=roles',
      host: 'admin.smallfish.com',
      status: 403
    });
  });

});
