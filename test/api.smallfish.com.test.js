const request = require('./testRequest');

test('api.smallfish.com');
test('api.sml-server.com');

function test(host) {
  describe(host, function() {

    it('/', function() {
      return request.options({
        url: '/api/company',
        host: host
      });
    });
  });
}
