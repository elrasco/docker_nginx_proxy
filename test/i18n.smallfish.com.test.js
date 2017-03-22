const request = require('./testRequest');
const skip = require('./skip');

test('i18n.smallfish.com');
test('i18n.sml-server.com');

function test(host) {

  describe(host, function() {

    it('/', function() {
      skip.unlessProduction(this);
      return request.api({
        url: '/api/translations/smallfish?lang=en',
        host: host
      });
    });

  });
}
