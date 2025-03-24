const queryObject = url.parse(req.url, true).query;
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    
    if (queryObject.name) {
        res.end(`Hello ${queryObject.name}`);
    } else {
        res.end('You should provide name parameter');
    }