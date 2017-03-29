const request = require('./testRequest');

const host = 'legacy.fuguplay.com';

describe(host, function() {
  it('/', function() {
    return request.frontend({
      url: '/',
      host
    });
  });
});
