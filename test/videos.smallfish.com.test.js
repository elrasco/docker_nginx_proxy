const request = require('./testRequest');

describe('videos.smallfish.com', function() {

  it('/p', function() {
    return request.get({
      url: '/p/',
      host: 'videos.smallfish.com'
    });
  });

  it('/videohub', function() {
    return request.get({
      url: '/videohub/',
      host: 'videos.smallfish.com'
    });
  });
});
