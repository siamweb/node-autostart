# node-autostart [![Build Status](https://travis-ci.org/maxrimue/node-autostart.svg)](https://travis-ci.org/maxrimue/node-autostart)

node-autostart is a Node.js module that enables your module to activate autostart easily. You can also use it as a global module to set-up autostart for anything and anywhere via the command line interface (CLI). Currently, it supports:

- [ ] Linux
- [x] OS X
- [ ] Windows

**Note: Currently, once a command has been assigned to a new autostart, it will be started, and if that autostart gets removed, it will be stopped. This is due to standard behaviour of launchd(OS X), and is welcome to be repaired by a pull request!**

This module is currently a work in progress. Once all desired features work, and Linux, OS X and Windows are supported, this module will go live on npm. Following features could be implemented:

- `.autostart` file in your `$HOME` folder to keep track of current activated services
- `doctor`-function to remove old services belonging to paths that were deleted

Pull requests are _very_ appreciated!

## Documentation
You can use `node-autostart` both programmatically and per CLI. To use it inside you Node.js app, look at the <b>API for Programmatic Use</b>, if you want to use it in the CLI, use `autostart -h` for further information.

### API for Programmatic Use

First, require this module inside your app like this:
```javascript
var autostart = require('node-autostart')
```
Now, you can simply enable autostart and disable it, and you can also check if it is enabled:
```javascript
autostart.enableAutostart(key, command, path, function (err) {
  if(err) console.error(err);
})

autostart.disableAutostart(key, function (err) {
  if(err) console.error(err);
})

autostart.isAutostartEnabled(key, function (isEnabled, err) {
  if(err) console.error(err);

  if(isEnabled) {
    console.log('Autostart is enabled');
  }
  else {
    console.log('Autostart is not enabled');
  }

})
```
#### Variables
`key`: Unique identifier for startup items (always required! (Make it unique! (Don't lose it ಠ_ಠ)))

`command`: Command to be executed in the specified path

`path`: Place in which the command will be executed (Use `process.cwd()` if you just want it to happen in your current working directory)
#### Functions
`.enableAutostart`
Requires `key`, `command` and `path` variables, returns `err` variable (`null` if no errors occurred).

`.disableAutostart`
Requires `key` variable, returns `err` variable (`null` if no errors occurred).

`.isAutostartEnabled`
Requires `key` variable, returns `isEnabled` and `err` variables (err is `null` if no errors occurred).

### License
The MIT License (MIT)

Copyright (c) 2015 Max Rittmüller

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.