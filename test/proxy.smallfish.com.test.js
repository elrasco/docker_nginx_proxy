const request = require('./testRequest');

describe('reverse proxy configuration', function(){

  it('gzip should be enabled', function(){
    return request.get({
      url: '/status/alive',
      host: 'any.host'
    })
    .expect('Content-Encoding', 'gzip');
  });
});
