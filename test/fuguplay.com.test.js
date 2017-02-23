const request = require('./testRequest');

test('fuguplay.com');
test('fuguplay.sml-server.com');

function test(host) {
  describe(host, function() {
    it('/', function() {
      return request.frontend({
          url: '/',
          host
        })
        .expect(200);
    });
  });
}
