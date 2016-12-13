const request = require('./testRequest');

test('smallfish.com');
test('sml-server.com');

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
