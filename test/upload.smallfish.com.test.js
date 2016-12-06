const request = require('./testRequest');

describe('upload.smallfish.com', function() {

  it('/', function() {
    return request.options({
      url: '/file/getSignedUrl',
      host: 'upload.smallfish.com'
    });
  });

});
