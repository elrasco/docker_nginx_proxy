const request = require('./testRequest');
const headers = require('./headers');
const skip = require('./skip');

test('fuguplay.com');
test('fuguplay.it');
test('fuguplay.sml-server.com');

function test(host) {

  describe(host, function() {
    it('/', function() {
      skip(this).onStage();
      return request.frontend({
        url: '/',
        host
      });
    });

    it('/landing routes headers should be obfuscated', function() {
      return request.frontend({
          url: '/landing/it/',
          host
        })
        .expect(headers.noneFromAmazon);
    });

    it('/landing/it/', function() {
      return request.frontend({
          url: '/landing/it/',
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

    it('/landing/not_existing_resource', function() {
      return request.notFound({
        url: '/landing/not_existing_resource/',
        host
      });
    });
  });
}
