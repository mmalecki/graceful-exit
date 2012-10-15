var net = require('net'),
    assert = require('assert'),
    cb = require('assert-called'),
    gracefulExit = require('../')();

setTimeout(function () {
  assert(false, 'Process should have exited by now');
}, 500);

var server = net.createServer(cb(function (conn) {
  console.log('Got connection');
  setTimeout(function () {
    console.log('Closing connection');
    conn.end();
  }, 100);
}));
server.listen(8121);

var conn = net.connect({
  host: 'localhost',
  port: 8121
}, function () {
  console.log('Connected');
  gracefulExit();

  process.nextTick(cb(function () {
    //
    // At this point process should be still alive.
    //
  }));
});
