const request = require('./testRequest');

describe('m.smallfish.com', function() {

  it('/', function() {
    return request.get({
      url: '/',
      host: 'm.smallfish.com'
    });
  });

});
