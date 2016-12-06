const request = require('./testRequest');

describe('i18n.smallfish.com', function() {

  it('/', function() {
    return request.get({
      url: '/api/translations/smallfish?lang=en',
      host: 'i18n.smallfish.com'
    });
  });

});
