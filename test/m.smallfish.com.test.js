const request = require('./testRequest');
const skip = require('./skip');

test('m.smallfish.com');
test('m.sml-server.com');

function test(host) {

  describe(host, function() {

    it('/', function() {
      skip.unlessProduction(this);
      return request.frontend({
        url: '/',
        host: host
      });
    });

  });
}
