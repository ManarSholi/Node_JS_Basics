// Thsi file to handle the requests (routing)
const {URL} = require('url');
const fileSystem = require('fs');

function renderHTML(path, response) {
    fileSystem.readFile(path, null, (error, data) => {
        if (error) {
            response.writeHead(404);
            response.write('File not found!');
        } else {
            response.write(data);
        }

        response.end();
    });
}

module.exports = {
    handleRequests: function (request, response) {
        response.writeHead(200, {'Content-Type': 'text/html'});

        let baseUrl = 'http://127.0.0.1:8000';
        let url = new URL(request.url, baseUrl);
        let path = url.pathname;

        switch (path) {
            case '/':
                renderHTML('./index.html', response);
                break;
            case '/login':
                renderHTML('./login.html', response);
                break;
            default:
                response.writeHead(404);
                response.write('Route not defined');
                response.end();
        }
    }
};
