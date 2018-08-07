var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('The start of something great\n');
}).listen(3000);
console.log('Server running at localhost:3000');
