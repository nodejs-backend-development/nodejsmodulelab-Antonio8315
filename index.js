const http = require('http');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const split2 = require('split2');
const through2 = require('through2');
const url = require('url');

const host = 'localhost';
const port = 8000;
const csvFilePath = path.join(__dirname, 'data.csv');

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        const readStream = fs.createReadStream(csvFilePath);
        let headers;
        const jsonObjects = [];
        
        readStream
            .pipe(split2())
            .pipe(through2.obj(function (line, _, callback) {
                const values = line.toString().split(',');
                if (!headers) {
                    headers = values;
                } else {
                    const obj = {};
                    headers.forEach((header, index) => {
                        obj[header] = values[index];
                    });
                    jsonObjects.push(obj);
                }
                callback();
            }))
            .on('finish', () => {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(jsonObjects, null, 2));
            })
            .on('error', (err) => {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error reading or processing file');
            });
    } else {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Only GET requests are allowed');
    }
});

server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
