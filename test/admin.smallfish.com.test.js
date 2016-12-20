const request = require('./testRequest');

test('admin.smallfish.com');
test('admin.sml-server.com');

function test(host) {

  describe(host, function() {

    let auth = '';

    before(function() {
      return request.post({
          url: '/api/auth/login',
          host: host,
          body: {
            email: "luca.rasconi@smallfish.com",
            password: "password"
          }
        })
        .then(response => response.body.token)
        .then(token => {
          auth = token;
        });
    });

    it('/', function() {
      return request.get({
        url: '/',
        host: host
      });
    });

    it('/api', function() {
      return request.get({
        url: '/api/auth/authenticated',
        host: host,
        token: auth
      });
    });

    it('/smallfish-auth', function() {
      return request.get({
        url: '/smallfish-auth/user?populate=roles',
        host: host,
        token: auth
      });
    });

    it('/smallfish-api', function() {
      return request.get({
        url: '/smallfish-api/api/rest/company',
        host: host,
        token: auth
      });
    });

    it('/marketplace-api', function() {
      return request.get({
        url: '/marketplace-api/api/rest/asset',
        host: host,
        token: auth
      });
    });

    it('/smallfish-upload', function() {
      return request.post({
        url: '/smallfish-upload/file/getSignedUrl',
        host: host,
        token: auth
      });
    });

    it('/mailfish', function() {
      return request.get({
        url: '/mailfish',
        host: host,
        expect: 303
      });
    });

    it('/projects', function() {
      return request.get({
        url: '/projects',
        host: host
      });
    });

    it('/marketplace', function() {
      return request.get({
        url: '/marketplace',
        host: host
      });
    });

    it('/videohub', function() {
      return request.get({
        url: '/videohub',
        host: host
      });
    });
  });
}
