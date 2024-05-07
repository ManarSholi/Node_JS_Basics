const http = require('http');
const app = require('./app');

http.createServer(app.handleRequests).listen(8000);
