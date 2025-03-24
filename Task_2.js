const http = require('http');
const url = require('url');

const host = 'localhost';
const port = 8000;

const server = http.createServer((req, res) => {
    const queryObject = url.parse(req.url, true).query;
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    
    if (queryObject.name) {
        res.end(`Hello ${queryObject.name}`);
    } else {
        res.end('You should provide name parameter');
    }
});

server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});