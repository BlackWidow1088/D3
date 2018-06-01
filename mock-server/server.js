/**
 * mock server for serving sunburst data to angular client
 */
const express = require('express');
const bodyParser = require('body-parser');

const data = require('./sunburst-data');

const app = express();
const responseDelayQuick = 10;
const responseDelayModerate = 1000;
const responseDelaySlow = 3000;

app.use(bodyParser.json());

app.get('/data', (req, res) => {
  console.log('API- DOC');
  setTimeout(() => {
    res.send(JSON.stringify(data));
  }, responseDelaySlow);
});

console.log('Mock Invar listening on port 5051');
const server = app.listen('5051');

var gracefulShutdown = function () {
  console.log("Shutting down....");
  server.close(function () {
    setTimeout(function () {
      console.log("Terminated");
      process.exit(0);
    }, 10);
  });
}

// listen for TERM signal .e.g. kill
process.on('SIGTERM', gracefulShutdown);

// listen for INT signal e.g. Ctrl-C
process.on('SIGINT', gracefulShutdown);
