const http = require('http');
const url = require('url');

const host = 'localhost';
const port = 8000;

const server = http.createServer((req, res) => {
    const queryObject = url.parse(req.url, true).query;
    
    if (queryObject.name) {
        res.writeHead(200);
        res.end(`Hello ${queryObject.name}`);
    } else {
        res.writeHead(400);
        res.end('You should provide name parameter');
    }
});

server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});