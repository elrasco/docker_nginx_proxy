const request = require('./testRequest');
const promise = require('bluebird');

function retry(what) {
  return what().catch(function(err) {
      return retry(what);
    });
}

it('proxy should be warmed up', function() {
  return retry(() => {
    return promise.delay(2000).then(() => request
      .get({
        url: '/status/alive',
        host: 'any.host'
      }));
  });
});
