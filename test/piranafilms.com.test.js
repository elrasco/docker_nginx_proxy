const request = require('./testRequest');

describe('piranafilms.com', function() {

  it('/', function() {
    return request.frontend({
      url: '/',
      host: 'piranafilms.com'
    });
  });
});
