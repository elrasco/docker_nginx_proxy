const http = require('http');

const echo = (port) => {
  const server = http.createServer(function(request, response) {
    response.writeHead(200, {"Content-Type": "application/json"});
    response.write(JSON.stringify({
      headers: request.headers,
      uri: request.url,
      body: request.body
    }));
    response.end();
  });
  server.listen(port);
  return server;
};

module.exports = echo;
