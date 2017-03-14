const request = require('./testRequest');

test('videos.smallfish.com');
test('videos.sml-server.com');

function test(host) {
  describe(host, function() {

    it('/p', function() {
      return request.frontend({
        url: '/p/',
        host: host
      });
    });

    it('/videohub', function() {
      return request.frontend({
        url: '/videohub/',
        host: host
      });
    });
  });

}
