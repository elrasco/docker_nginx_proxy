const request = require('./testRequest');

test('fuguplay.com');
test('fuguplay.sml-server.com');

function test(host) {
  describe(host, function() {
    it('/', function() {
      return request.frontend({
          url: '/',
          host
        });
    });

    it('/landing/it/', function() {
      return request.frontend({
          url: '/landing/it/',
          host
        })
        .expect(/Fuguplay/);
    });

    it('/landing/it', function() {
      return request.frontend({
          url: '/landing/it',
          host
        })
        .expect(/Fuguplay/);
    });

    it('/landing/favicon.ico', function() {
      return request.frontend({
          url: '/landing/favicon.ico',
          host
        });
    });
  });
}
