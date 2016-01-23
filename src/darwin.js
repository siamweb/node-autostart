var fs = require('fs'),
  username = require('username');

function enableAutostart(key, command, path, callback) {
  isAutostartEnabled(key, function(error, isEnabled) {
    if (error) {
      if (error.code !== 'ENOENT') {
        callback(error);
        return;
      }
    }

    if (isEnabled) {
      callback('Autostart already is enabled');
      return;
    }

    //Adding a service with the given key to launchd, by placing a launchd compatible .plist in the user's LaunchAgents folder
    var plistFileContent = '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" ' +
      '"http://www.apple.com/DTDs/PropertyList-1.0.dtd"><plist version="1.0"><dict><key>Label</key><string>' + key +
      '</string><key>ProgramArguments</key><array><string>bash</string><string>-c</string><string>cd ' + path + ' && ' + command +
      '</string></array><key>RunAtLoad</key><true/></dict></plist>';

    fs.writeFile('/Users/' + username.sync() + '/Library/LaunchAgents/' + key + '.plist', plistFileContent, function(error) {
      callback(error);
      return;
    });
  });
}

function disableAutostart(key, callback) {
  isAutostartEnabled(key, function(error, isEnabled) {
    if (error) {
      if (error.code !== 'ENOENT') {
        callback(error);
        return;
      }
    }

    if (!isEnabled) {
      callback('Autostart is not enabled');
      return;
    }

    //Removing the launchd .plist with the name of the passed key
    fs.unlink('/Users/' + username.sync() + '/Library/LaunchAgents/' + key + '.plist', function(error) {
      callback(error);
    });
  });
}

function isAutostartEnabled(key, callback) {
  fs.stat('/Users/' + username.sync() + '/Library/LaunchAgents/' + key + '.plist', function(error, stat) {

    if (process.env.NODE_ENV == 'test' && process.env.FORCEERROR === 'true') {
      error = new Error('Test error');
    }

    if (!error && stat.isFile()) {
      callback(null, true);
    } else {
      callback(error, false);
    }

    return;
  });
}

module.exports = {
  enableAutostart: enableAutostart,
  disableAutostart: disableAutostart,
  isAutostartEnabled: isAutostartEnabled
};
