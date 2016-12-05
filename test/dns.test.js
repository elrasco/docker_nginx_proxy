const echo = require('./echo');
const on = require('./testRequest');

describe('dns.test.local', function() {
  let server;
  beforeEach(done => {
    server = echo(6666);
    done();
  });
  afterEach(done => {
    server.close();
    done();
  });
  it('root url should be forwarded without rewriting', function() {
    return on({
      url: '/a/random/url',
      host: 'dns.test.local',
      expect: /"uri":"\/a\/random\/url"/
    });
  });
  it('custom rewrite', function() {
    return on({
      url: '/rewrite/to/url',
      host: 'dns.test.local',
      expect: /"uri":"\/\/to\/url"/
    });
  });
});
