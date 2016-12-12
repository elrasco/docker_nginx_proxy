const request = require('./testRequest');

describe('market.smallfish.com', function(){

  it('/', function(){
    return request.get({
      url: '/',
      host: 'market.smallfish.com'
    });
  });

  it('/marketplace-be', function() {
    return request.get({
      url: '/api/format/find',
      host: 'market.smallfish.com'
    });
  });

  it('/smallfish-upload', function() {
    return request.get({
      url: '/file/getSignedUrl',
      host: 'market.smallfish.com'
    });
  });
});
