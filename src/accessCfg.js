'use strict';

//const dlog = require('electron').remote;
var fs  = require('fs');

exports.saveConfig = () => {
  require('electron').remote.dialog.showSaveDialog({
    title: 'Save Encoder Configuration',
    filters: [
      { name: 'Custom File Type', extensions: ['json'] },
    ], }, (file)=> {
      if (file) fs.writeFileSync(file, JSON.stringify(µ('#keyGroup')));

      //var data = fs.readFileSync(path); //file exists, get the contents
      //settings = JSON.parse(data);
    });
};

exports.openConfig = () => {
  require('electron').remote.dialog.showOpenDialog({
    title: 'Load Encoder Configuration',
    buttonLabel: 'Load',
    properties: ['openFile'],
    filters: [
      { name: 'Custom File Type', extensions: ['json'] },
    ], }, (file)=> {
      //fs.writeFileSync(file, JSON.stringify(µ('#keyGroup')));
      if (file) {
        //console.log(file);
        let data = fs.readFileSync(file[0]); //file exists, get the contents
        let settings = JSON.parse(data);
        for (var i = 0; i < settings.keys.length; i++) {
          µ('key-set')[i].setFromObj(settings.keys[i]);
        }

        //console.log(settings);
      }
    });
};
