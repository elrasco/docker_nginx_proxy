const request = require('./testRequest');
const headers = require('./headers');

test('trev.smallfish.com');
test('trev.sml-server.com');

function test(host) {

  describe(host, function() {

    it('/', function() {
      return request.frontend({
        url: '/',
        host: host
      });
    });

    it('/ routes headers should be obfuscated', function() {
      return request.frontend({
          url: '/',
          host
        })
        .expect(headers.noneFromAmazon);
    });
  });
}
