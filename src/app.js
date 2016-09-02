'use strict';

var compiler = require('./compiler.js').compiler;
var writeOutput = require('./outputFile.js').writeOutput;
var saveCfg = require('./accessCfg.js').saveConfig;
var openCfg = require('./accessCfg.js').openConfig;
require('./keyConfig.js');

/*document.onkeypress = (e) => {
  var press = String.fromCharCode(e.keyCode);
  if (press == 'u') {
    compiler.upload();
  } else if (press == 'w') {
    let keys = [];
    keys.push('keys.addKey(3,KEYCODE_D);');
    writeOutput(keys);
  } else if (press == 's') {
    let keys = [];
    keys.push('keys.addKey(3,KEYCODE_E,0,1);');
    writeOutput(keys);
    compiler.upload();
  }
};*/

compiler.onError = () => {
  µ('#error').style.display = 'block';
  µ('#outputText').textContent = 'Board not found; Reconnect board and try again';
  setTimeout(()=> {
    µ('#upload').className = 'header menuItem';
    µ('#error').style.display = 'none';
  }, 3000);
};

µ('#upload').onclick = function() {
  µ('#upload').className = 'header menuItem clicked';
  µ('#outputText').textContent = 'Uploading...';
  let strs = µ('#keyGroup').getStrings();
  writeOutput(strs);
  compiler.onComplete = ()=> {
    µ('#upload').className = 'header menuItem';
    µ('#outputText').textContent = 'Done uploading.';
  };

  compiler.upload();
};

µ('#clear').onclick = function() {
  µ('#keyGroup').clear();
};

µ('#save').onclick = function() {
  saveCfg();
};

µ('#load').onclick = function() {
  openCfg();
};

window.onbeforeunload = function(e) {
  let r = dialog.showMessageBox({ message:'Close window without saving changes?', buttons:['Cancel', 'Save', 'Close Without Saving'] });
  if (r == 2) {
    e.returnValue = undefined;
  } else if (r == 1) {
    e.returnValue = false;
    saveCfg();
  } else {e.returnValue = false;}
};
