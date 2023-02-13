'use strict';
require('@babel/register');
require('@babel/polyfill');

const app = require('../app').default;
const http = require("http");
require('dotenv').config();
const port = process.env.port_no;


const server = http.createServer(app);
server.listen(port);

server.on('listening', () => {
    console.log(`Listening on ${port}`);
});