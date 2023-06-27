#!/usr/bin/env node

/*
const http = require('http');
const spawn = require('child_process').spawn;
const data = require('./data.json');

const requestListener = (req, res) => {
  res.writeHead(200, {"Content-Type": "application/json"});
  res.end(JSON.stringify(data));
};

const server = http.createServer(requestListener);
server.listen(8080, () => {
  console.log('Server started; starting create-react-app...');
  spawn('react-scripts', ['start'], {stdio: 'inherit'})
});
*/

const express = require('express');
const app = express();
const data = require('./data.json');
const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
  optionsSuccessStatus: 200,
  header: {
    'Access-Control-Allow-Headers': 'http://localhost:3000',
  },
};

app.use(cors(corsOptions));
app.use(express.json());
app.get('/data', (req, res) => {
  res.json(data);
});

app.listen(8080, () => {
  console.log('Server started on port 8080');
});
