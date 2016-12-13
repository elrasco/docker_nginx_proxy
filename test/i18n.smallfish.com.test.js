const request = require('./testRequest');

test('i18n.smallfish.com');
test('i18n.sml-server.com');

function test(host) {

  describe(host, function() {

    it('/', function() {
      return request.options({
        url: '/api/translations/smallfish?lang=en',
        host: host
      });
    });

  });
}
