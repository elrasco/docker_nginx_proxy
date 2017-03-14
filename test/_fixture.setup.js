before(function() {
  return require('./testRequest').post({
      host: 'api.smallfish.com',
      url: '/login',
      body: {
        email: "luca.rasconi@smallfish.com",
        password: "password"
      }
    })
    .expect(200)
    .then(response => global.auth = response.body.token);
});
