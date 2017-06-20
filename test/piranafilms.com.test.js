const request = require('./testRequest');
const skip = require('./skip');

describe('piranafilms.com', function() {

  it('/', function() {
    skip(this).unlessProduction();
    return request.frontend({
      url: '/',
      host: 'piranafilms.com'
    });
  });
});


describe('www.piranafilms.com', function() {

  it('/', function() {
    skip(this).unlessProduction();
    return request.frontend({
      url: '/',
      host: 'www.piranafilms.com'
    });
  });
});
