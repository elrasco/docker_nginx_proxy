const request = require('./testRequest');

describe('reverse proxy configuration', function(){

  it('gzip should be enabled', function(){
    return request.get({
      url: '/marketplace-api/api/rest/format',
      host: 'admin.smallfish.com'
    })
    .expect('Content-Encoding', 'gzip');
  });
});
