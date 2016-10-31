const request = require('supertest-promised');

const on = data => request('http://localhost')
  .get(data.url)
  .set('Host', data.host)
  .expect(data.expect);

describe('alive page', function() {

  it('should be available to requests to default host', function() {

    return on({
      url: '/status/alive',
      host: 'any.host',
      expect: 200
    });

  });
});

describe('smallfish.com', function() {

  it('should be available to requests to smallfish.com', function() {

    return on({
      url: '/',
      host: 'dev.smallfish.com',
      expect: /<title>Smallfish<\/title>/
    });

  });

});


describe('market.smallfish.com', function() {

  it('should be available to requests to market.smallfish.com', function() {

    return on({
      url: '/',
      host: 'dev.market.smallfish.com',
      expect: /<title>Smallfish - Marketplace<\/title>/
    });

  });

  it('should be reverse requests to backend', function() {

    return on({
      url: '/marketplace-be/auth/authenticated',
      host: 'dev.market.smallfish.com',
      expect: {"auth": false, "guest": false}
    });

  });
});
