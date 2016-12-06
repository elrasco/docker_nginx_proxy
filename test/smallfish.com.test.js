const request = require('./testRequest');

describe('smallfish.com', function() {

  it('/', function() {
    return request.get({
      url: '/',
      host: 'smallfish.com'
    });
  });

});
