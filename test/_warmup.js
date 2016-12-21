const request = require('./testRequest');
const promise = require('bluebird');

function retry(what) {
  return what().catch(function(err) {
      return retry(what);
    });
}

it('proxy should be ready to rumble', function() {
  return retry(() => {
    return promise.delay(2000).then(() => request
      .frontend({
        url: '/status/alive',
        host: 'any.host'
      }));
  });
});
