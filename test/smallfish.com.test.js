const request = require('./testRequest');

test('videmo.smallfish.com');
test('videmo.sml-server.com');

function test(host) {

  describe(host, function() {

    it('/', function() {
      return request.frontend({
        url: '/',
        host: host
      });
    });

  });
}
