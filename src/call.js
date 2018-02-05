'use strict';

const spawn = require('child_process').spawn;

exports.call = function(cmd) {
  var _this = this;
  _this.command = cmd;
  _this.running = false;
  var args = [];

  _this.addArgument = (str) => {
    args.push(str);
    return _this;
  };

  _this.setArguments = (argarray) => {
    args = argarray;
  }

  _this.outHandler = (data)=> {
    console.log(`stdout: ${data}`);
  };

  _this.errHandler = (data)=> {
    console.log(`stderr: ${data}`);
  };

  _this.onClose = ()=> {};

  _this.run = () => {
    _this.running = true;
    let proc = spawn(_this.command, args);
    proc.stdout.on('data', (data)=> {
      _this.outHandler(data);
    });

    proc.stderr.on('data', (data)=> {
      _this.errHandler(data);
    });

    proc.on('exit', (code)=> {
      _this.running = false;
      _this.onClose();
    });
  };
};
