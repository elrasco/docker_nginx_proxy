const request = require('./testRequest');

describe('old.market.smallfish.com', function() {

  it('/', function() {
    return request.get({
      url: '/',
      host: 'old.market.smallfish.com'
    });
  });

});
