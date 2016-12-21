const request = require('./testRequest');

const randomString = function(length) {
  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

describe('reverse proxy configuration', function() {

  it('gzip should be enabled', function() {
    return request.api({
        url: '/marketplace-api/api/rest/format',
        host: 'admin.smallfish.com'
      })
      .expect('Content-Encoding', 'gzip');
  });

  it('should handle a very long url', function() {
    const veryLongString = randomString(8000);
    return request.frontend({
      url: `/?parameter=${veryLongString}`,
      host: 'smallfish.com'
    });
  });
});
