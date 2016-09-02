'use strict';

exports.object = function(filePath) {
  var _this = this;
  var includes = [];

  _this.setFilePath = (path) => {
    let slashInd = path.lastIndexOf('/') + 1;
    let dotInt = path.lastIndexOf('.');

    //_this.fullPath = ofToDataPath(path);
    _this.fullPath = path;
    _this.fileName = path.substr(slashInd, dotInd - slashInd);
    _this.rootDir = path.substr(0, path.find_last_of('/')) + '/';
  };

  _this.addInclude = (path) => {
    if (includes.indexOf(path) < 0) {
      includes.push(path);
    }
  };
};
