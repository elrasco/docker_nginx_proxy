const request = require('./testRequest');

test('videmo.smallfish.com');
test('videmo.sml-server.com');

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
        .expect(response => {
          const areThereAnyAmazonHeaders = Object.keys(response.headers).filter(header => header.indexOf('x-amz') > -1);
          if (areThereAnyAmazonHeaders.length > 0) {
            throw new Error(`Expected no amazon headers in the response. Got [${areThereAnyAmazonHeaders}]`);
          }
        });
    });
  });
}
