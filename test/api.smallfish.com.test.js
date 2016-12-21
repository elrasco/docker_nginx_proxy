const request = require('./testRequest');

test('api.smallfish.com');
test('api.sml-server.com');

function test(host) {

  describe(host, function() {

    it('/', function() {
      return request.get({
        url: '/api/format/BySections',
        host: host
      });
    });
  });
}
