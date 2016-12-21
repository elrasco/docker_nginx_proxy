const request = require('./testRequest');
const assert = require('assert');

test('market.smallfish.com');
test('market.sml-server.com');
test('travelpeople.smallfish.com');

function test(host) {

  describe(host, function() {

    it('/', function() {
      return request.frontend({
        url: '/',
        host: host
      });
    });

    it('/marketplace-be', function() {
      return request.api({
        url: '/marketplace-be/api/format/BySections',
        host: host
      });
    });

    it('/smallfish-upload', function() {
      return request.post({
        url: '/smallfish-upload/file/getSignedUrl',
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
