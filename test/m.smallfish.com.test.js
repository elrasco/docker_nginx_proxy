const request = require('./testRequest');

test('m.smallfish.com');
test('m.sml-server.com');

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
