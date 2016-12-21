const request = require('./testRequest');

test('admin.smallfish.com');
test('admin.sml-server.com');

function test(host) {

  describe(host, function() {

    it('/', function() {
      return request.get({
        url: '/',
        host: host
      });
    });

    it('/api', function() {
      return request.get({
        url: '/api/auth/authenticated',
        host: host
      });
    });

    it('/smallfish-auth', function() {
      return request.get({
        url: '/smallfish-auth/user?populate=roles',
        host: host
      });
    });

    it('/smallfish-api', function() {
      return request.get({
        url: '/smallfish-api/api/rest/company',
        host: host
      });
    });

    it('/marketplace-api', function() {
      return request.get({
        url: '/marketplace-api/api/rest/asset',
        host: host
      });
    });

    it('/smallfish-upload', function() {
      return request.post({
        url: '/smallfish-upload/file/getSignedUrl',
        host: host
      });
    });

    it('/mailfish', function() {
      return request.get({
        url: '/mailfish/',
        host: host
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
