const http = require('http');
const app = require('./startup/app');

//startup database
require('./startup/db')();

const server = http.createServer(app);
const port = process.env.PORT || 5000;

server.listen(port, () => {
    console.log('--------------------------------------------------');
    console.log(`Server listening on ${port}`);
});