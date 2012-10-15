# graceful-exit [![Build Status](https://secure.travis-ci.org/mmalecki/graceful-exit.png)](http://travis-ci.org/mmalecki/graceful-exit)
Gracefully exit your node process (e.g., wait for network connections to close).

## Installation

    npm install graceful-exit

## Usage
```js
var http = require('http'),
    gracefulExit = require('graceful-exit')();

http.createServer(function (req, res) {
  gracefulExit();
  setTimeout(function () {
    res.end();
    // Process will exit now.
  }, 1000);
}).listen(8000, function () {
  http.get({
    host: 'localhost',
    port: 8000
  });
});
```
