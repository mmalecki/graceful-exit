var net = require('net'),
    http = require('http');

module.exports = function (options) {
  options = options || {};

  return function () {
    var interval = options.interval || 10,
        ignore = options.ignore || [ net.Server ];

    function checkHandles() {
      var handles = process._getActiveHandles().filter(function (handle) {
        if (typeof handle.ontimeout === 'function') {
          //
          // Ignore timers. Trying to handle it gracefully sucks - return
          // value of `setTimeout` isn't equal to the handle it creates.
          //
          return false;
        }

        return !ignore.some(function (ignored) {
          if (typeof ignored === 'function') {
            return handle instanceof ignored;
          }
          else {
            return handle === ignored;
          }
        });
      });

      //
      // Discard the interval we use to poll for active handles.
      //
      if (handles.length === 0) {
        process.exit();
      }
    }

    setInterval(checkHandles, interval);
    checkHandles();
  };
};
