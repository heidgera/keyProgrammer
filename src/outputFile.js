exports.writeOutput = function(array) {
  var fs  = require('fs');
  fs.writeFileSync('./assets/compile/build/build.cpp', '');
  fs.readFileSync('./assets/compile/build_template.cpp').toString().split('\n').forEach(function(line) {
    //console.log(line);
    if (line.toString().indexOf('${SETUP}') >= 0) {
      for (var i = 0; i < array.length; i++) {
        fs.appendFileSync('./assets/compile/build/build.cpp', array[i] + '\n');
      }
    } else {
      fs.appendFileSync('./assets/compile/build/build.cpp', line.toString() + '\n');
    }
  });
};
