const http = require('http');
const fileSystem = require('fs');

function onRequest(request, response) {
    response.writeHead(200, {'Content-Type': 'text/html'});

    fileSystem.readFile('./index.html', null, (error, data) => {
        if (error) {
            response.writeHead(404);
            response.write('File not found!');
        } else {
            response.write(data);
        }

        response.end();
    });
}

http.createServer(onRequest).listen(8000);
