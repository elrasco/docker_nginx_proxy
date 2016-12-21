const request = require('./testRequest');

test('analytics.smallfish.com');
test('analytics.sml-server.com');

function test(host) {
  describe(host, function() {
    it('/', function() {
      return request.get({
        url: '/',
        host: host
      });
    });
  });
}
