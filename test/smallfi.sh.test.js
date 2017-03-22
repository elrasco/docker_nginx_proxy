const request = require('./testRequest');
const skip = require('./skip');

describe('smallfi.sh', function() {

  it('/', function() {
    skip.unlessProduction(this);
    return request.post({
        url: '/api/preview',
        host: 'api.smallfish.com',
        body: {}
      })
      .then(response => response.body.url.replace('http://', '').split('/')[1])
      .then(url => request.frontend({
        url: '/' + url,
        host: 'smallfi.sh'
      }));
  });

});
