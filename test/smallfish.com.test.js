const request = require('./testRequest');

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

    it('/heineken', function() {
      return request.frontend({
        url: '/heineken',
        host: host
      });
    });
  });
}
