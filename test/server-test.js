var http = require('http'),
    assert = require('assert'),
    gracefulExit = require('../')();

http.createServer(function (req, res) {
}).listen(8120, function () {
  gracefulExit();

  process.nextTick(function () {
    assert(false, 'Process should have exited by now');
  });
});
