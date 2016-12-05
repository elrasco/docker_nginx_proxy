const echo = require('./echo');
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

describe('admin.smallfish.com proxy', function() {

  describe('to marketplace-api', function() {
    let server;
    beforeEach(done => {
      server = echo(1341);
      done();
    });
    afterEach(done => {
      server.close();
      done();
    });
    it('should rewrite urls', function() {
      return on({
        url: '/marketplace-api/api/rest',
        host: 'dev.admin.smallfish.com',
        expect: /"uri":"\/\/api\/rest"/
      });
    });
  });

  describe('to smallfish-auth', function() {
    let server;
    beforeEach(done => {
      server = echo(1343);
      done();
    });
    afterEach(done => {
      server.close();
      done();
    });
    it('should rewrite urls', function() {
      return on({
        url: '/smallfish-auth/api/rest',
        host: 'dev.admin.smallfish.com',
        expect: /"uri":"\/\/api\/rest"/
      });
    });
  });
});
