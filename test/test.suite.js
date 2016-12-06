const on = require('./testRequest');

describe('alive page', function() {

  it('should be available to requests to default host', function() {
    return on({
      url: '/status/alive',
      host: 'any.host',
      expect: 200
    });
  });
  
});
