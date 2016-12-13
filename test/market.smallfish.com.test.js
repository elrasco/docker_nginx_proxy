const request = require('./testRequest');
const assert = require('assert');

test('market.smallfish.com');
test('market.sml-server.com');
test('travelpeople.smallfish.com');

function test(host) {

  describe(host, function() {

    it('/', function() {
      return request.get({
        url: '/',
        host: host
      });
    });

    it('/marketplace-be', function() {
      return request.get({
        url: '/api/format/find',
        host: host
      });
    });

    it('/smallfish-upload', function() {
      return request.get({
        url: '/file/getSignedUrl',
        host: host
      });
    });

    it('should expose a socket.io endpoint', function() {
      return request.socket({
          host: host
        })
        .then(socket => { assert(socket.connected); });
    });
  });
}
