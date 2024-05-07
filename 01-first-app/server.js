const http = require('http');

function onRequest(request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write('Hello world');
    response.end();
}

http.createServer(onRequest).listen(8000);


// node server.js
// http://localhost:8000/