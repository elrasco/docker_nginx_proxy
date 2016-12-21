const request = require('./testRequest');

describe('smallfi.sh', function() {

  it('/', function() {
    return request.post({
        url: '/api/preview',
        host: 'api.smallfish.com',
        body: {}
      })
      .then(response => response.body.url.split('/')[1])
      .then(url => request.frontend({
        url: '/' + url,
        host: 'smallfi.sh'
      }));
  });

});
