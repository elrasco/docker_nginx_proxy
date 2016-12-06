const request = require('./testRequest');

describe('admin.smallfish.com', function() {

  let token;

  before(function() {
    return request.post({
        url: '/api/auth/login',
        host: 'admin.smallfish.com',
        body: {
          email: "luca.rasconi@smallfish.com",
          password: "password"
        }
      })
      .then(response => {
        token = response.body.token;
      });
  });

  it('/', function() {
    return request.get({
      url: '/',
      host: 'admin.smallfish.com'
    });
  });

  it('/api', function() {
    return request.get({
      url: '/api/auth/authenticated',
      host: 'admin.smallfish.com',
      token: token
    });
  });

  it('/smallfish-auth', function() {
    return request.get({
      url: '/smallfish-auth/user?populate=roles',
      host: 'admin.smallfish.com',
      token: token
    });
  });

  it('/smallfish-api', function() {
    return request.get({
      url: '/smallfish-api/api/rest/company',
      host: 'admin.smallfish.com',
      token: token
    });
  });

  it('/marketplace-api', function() {
    return request.get({
      url: '/marketplace-api/api/rest/asset',
      host: 'admin.smallfish.com',
      token: token
    });
  });

  it('/mailfish', function() {
    return request.get({
      url: '/mailfish',
      host: 'admin.smallfish.com',
      expect: 303
    });
  });

  it('/projects', function() {
    return request.get({
      url: '/projects',
      host: 'admin.smallfish.com'
    });
  });

  it('/marketplace', function() {
    return request.get({
      url: '/marketplace',
      host: 'admin.smallfish.com'
    });
  });
});
