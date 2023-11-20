const express = require('express');

const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

module.exports = server;