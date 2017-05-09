const request = require('./testRequest');
const skip = require('./skip');

test('smallfish.com');
test('sml-server.com');

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
