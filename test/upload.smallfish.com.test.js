const request = require('./testRequest');

test('upload.smallfish.com');
test('upl.smallfish.com');
test('upload.sml-server.com');

function test(host) {

  describe(host, function() {

    it('/', function() {
      return request.post({
        url: '/file/getSignedUrl',
        host: host
      });
    });

  });
}
