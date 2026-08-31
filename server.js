import { createServer } from 'node:http'

const server = createServer((req, res) => {
    console.log('Request received:', req.method, req.url);

    res.write('Hello, World! This is a simple Node.js server.\n');

    return res.end('Finally, the server is running!');
})

server.listen(3333, () => {
    console.log('Server is listening on port 3333');
})