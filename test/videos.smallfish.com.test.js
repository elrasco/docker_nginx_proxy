const request = require('./testRequest');

test('videos.smallfish.com');
test('videos.sml-server.com');

function test(host) {
  describe(host, function() {

    it('/p', function() {
      return request.get({
        url: '/p/',
        host: host
      });
    });

    it('/videohub', function() {
      return request.get({
        url: '/videohub/',
        host: host
      });
    });
  });

}
