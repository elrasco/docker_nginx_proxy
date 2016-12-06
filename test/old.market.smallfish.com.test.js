const request = require('./testRequest');

describe('smallfi.sh', function() {

  it('/', function() {
    return request.options({
      url: '/any',
      host: 'smallfi.sh'
    });
  });

});
