const request = require('./testRequest');

test('fuguplay.com');
test('www.fuguplay.com');
test('fuguplay.it');
test('www.fuguplay.it');
test('fuguplay.sml-server.com');

function test(host) {
  describe(host, function() {
    it('/', function() {
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
        .expect(response => {
          const areThereAnyAmazonHeaders = Object.keys(response.headers).filter(header => header.indexOf('x-amz') > -1);
          if (areThereAnyAmazonHeaders.length > 0) {
            throw new Error(`Expected no amazon headers in the response. Got [${areThereAnyAmazonHeaders}]`);
          }
        });
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
