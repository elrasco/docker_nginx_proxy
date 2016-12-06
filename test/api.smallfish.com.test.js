const request = require('./testRequest');

describe('api.smallfish.com', function() {

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
      url: '/rest/company',
      host: 'admin.smallfish.com'
    });
  });
});
