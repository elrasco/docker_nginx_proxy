const echo = require('./echo');
const on = require('./testRequest');

describe('echo server', () => {
  let server;
  beforeEach(done => {
    server = echo(6666);
    done();
  });
  afterEach(done => {
    server.close();
    done();
  });
  it('should echo the request', function() {
    return on({
      port: 6666,
      url: '/status/proxy',
      host: 'any.host',
      expect: /any\.host/
    });
  });
});
