const request = require('./testRequest');

describe('admin.smallfish.com', function() {

  describe('host', function(){

    it('public', function(){
      return request.get({
        url: '/',
        host: 'admin.smallfish.com'
      });
    });

    it('internal', function(){
      return request.get({
        url: '/',
        host: 'admin.sml-server.com'
      });
    });
  });

  it('/', function() {
    return request.get({
      url: '/',
      host: 'admin.smallfish.com'
    });
  });

  it('/api', function() {
    return request.options({
      url: '/api/auth/authenticated',
      host: 'admin.smallfish.com'
    });
  });

  it('/smallfish-auth', function() {
    return request.options({
      url: '/smallfish-auth/user?populate=roles',
      host: 'admin.smallfish.com'
    });
  });

  it('/smallfish-api', function() {
    return request.options({
      url: '/smallfish-api/api/rest/company',
      host: 'admin.smallfish.com'
    });
  });

  it('/marketplace-api', function() {
    return request.options({
      url: '/marketplace-api/api/rest/asset',
      host: 'admin.smallfish.com'
    });
  });

  it('/smallfish-upload', function() {
    return request.options({
      url: '/smallfish-upload/file/getSignedUrl',
      host: 'upload.smallfish.com'
    });
  });

  it('/mailfish', function() {
    return request.get({
      url: '/mailfish',
      host: 'admin.smallfish.com',
      expect: 303
    });
  });

  it('/projects', function() {
    return request.get({
      url: '/projects',
      host: 'admin.smallfish.com'
    });
  });

  it('/marketplace', function() {
    return request.get({
      url: '/marketplace',
      host: 'admin.smallfish.com'
    });
  });

  it('/videohub', function() {
    return request.get({
      url: '/videohub',
      host: 'admin.smallfish.com'
    });
  });
});
