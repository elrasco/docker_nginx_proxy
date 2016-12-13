const request = require('./testRequest');

test('old.market.smallfish.com');
test('old.market.sml-server.com');

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
