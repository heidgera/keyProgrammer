/*** Process to upload to the controller

To compile from the .cpp file:

	path/to/avr-g++ -c -g -Os -w -fno-exceptions -ffunction-sections -fdata-sections -DF_CPU=processor_speed
		-I(includes_for_cpp) -mmcu=processor_name path/to/target.cpp -o target.o

To assemble .elf

	path/to/avr-gcc -Os -lm-Wl,--gc-sections -o path/to/target.elf path/to/target.o path/to/core.a

To assemble .hex

	path/to/avr-objcopy -O ihex -R .eeprom path/to/target.elf path/to/target.hex

To upload to the mcu

	path/to/avrdude -V -F -C path/to/avrdude.conf -p mcu_name -P port_name -c programmer_name
		-b transfer_rate -U flash:w:path/to/target.hex

*/
'use strict';

var cfg = require('./config.js').config;
var Call = require('./call.js').call;
var obj = require('./objects.js').object;

var rootDir = process.cwd() + '/assets/compile/';
var hwDir = rootDir + cfg.platform + '/hardware/';
var toolDir = hwDir + 'tools/avr/bin/';

let Cmplr = function() {
  var _this = this;
  _this.mode = 'wait';
  var uploading = false;
  _this.onComplete = ()=> {};

  _this.onError = () => {};

  let cmp = new Call(toolDir + 'avr-g++');
  cmp.addArgument('-c')
    .addArgument('-g')
    .addArgument('-Os')
    .addArgument('-w')
    .addArgument('-fno-exceptions')
    .addArgument('-ffunction-sections')
    .addArgument('-fdata-sections')
    .addArgument('-fno-threadsafe-statics')
    .addArgument('-MMD')
    .addArgument('-mmcu=atmega328p')
    .addArgument('-DF_CPU=16000000L')
    .addArgument('-DARDUINO=10605')
    .addArgument('-DARDUINO_AVR_PROTRINKET5')
    .addArgument('-DARDUINO_ARCH_AVR')
    .addArgument('-I' + hwDir + 'arduino/avr/cores/arduino')
    .addArgument('-I' + hwDir + 'arduino/avr/variants/eightanaloginputs')
    .addArgument('-I' + rootDir + 'libraries/ProTrinketKeyboard')
    .addArgument(rootDir + 'build/build.cpp') //TODO:: rename file here
    .addArgument('-o' + rootDir + 'build/build.o');

  let lnk = new Call(toolDir + 'avr-gcc');
  lnk.addArgument('-w')
    .addArgument('-Os')
    .addArgument('-Wl,--gc-sections')
    .addArgument('-mmcu=atmega328p')
    .addArgument('-o' + rootDir + 'build/build.elf')
    .addArgument(rootDir + 'build/build.o')
    .addArgument(rootDir + 'build/keyLibrary/usbdrvasm_includer.S.o')
    .addArgument(rootDir + 'build/keyLibrary/ProTrinketKeyboardC.c.o')
    .addArgument(rootDir + 'build/keyLibrary/usbdrv_includer.c.o')
    .addArgument(rootDir + 'build/keyLibrary/ProTrinketKeyboard.cpp.o')
    .addArgument(rootDir + 'build/core.a')
    .addArgument('-Lbuild')
    .addArgument('-lm');

  //assets/compile/osx/hardware/tools/avr/bin/avr-gcc -w -Os -Wl,--gc-sections -mmcu=atmega328p assets/compile/build/keyboardEncoders.cpp.o assets/compile/build/keyLibrary/usbdrvasm_includer.S.o assets/compile/build/keyLibrary/ProTrinketKeyboardC.c.o assets/compile/build/keyLibrary/usbdrv_includer.c.o assets/compile/build/keyLibrary/ProTrinketKeyboard.cpp.o assets/compile/build/core.a -Lbuild -lm -o assets/compile/build/keyboardEncoders.cpp.elf

  let hex = new Call(toolDir + 'avr-objcopy');
  hex.addArgument('-O')
    .addArgument('ihex')
    .addArgument('-R')
    .addArgument('.eeprom')
    .addArgument(rootDir + 'build/build.elf')
    .addArgument(rootDir + 'build/build.hex');

  let upl = new Call(toolDir + 'avrdude');
  upl.addArgument('-C' + hwDir + 'tools/avr/etc/avrdude.conf')
    .addArgument('-v')
    .addArgument('-patmega328p')
    .addArgument('-cusbtiny')
    .addArgument('-Uflash:w:' + rootDir + 'build/build.hex:i');

  cmp.onClose = () => {
    console.log('compile done');
    lnk.run();
  };

  lnk.onClose = () => {
    console.log('link done');
    hex.run();
  };

  hex.onClose = () => {
    console.log('hex done');
    upl.run();
  };

  let writingInd = 0;
  let hashCount = 0;

  //50? hashes total for full upload.

  upl.errHandler = (data) => {
    let str = data.toString();
    if (str.indexOf('Error') > 0) {
      _this.onError();
      _this.error = true;
    }

    //if (str.indexOf('Writing | ') > 0) writingInd = 1;
    //else if (str.indexOf('| 100%') > 0) writingInd = 0, console.log('hashes: ' + hashCount);

    //if (writingInd) for (let i = 0; i < str.length; i++) {
    //  if (str.charAt(i) == '#') hashCount++;
    //}
  };

  upl.onClose = () => {
    console.log('upload done');
    if(!_this.error) _this.onComplete();
    uploading = false;
  };

  _this.upload = () => {
    if (!uploading) {
      uploading = true;
      _this.error = false;
      cmp.run();
    }

  };
};

exports.compiler = new Cmplr();

/*********************************
  For Keyboard Encoders:

/Applications/Arduino.app/Contents/Java/hardware/tools/avr/bin/avr-g++ -c -g -Os -w -fno-exceptions -ffunction-sections -fdata-sections -fno-threadsafe-statics -MMD -mmcu=atmega328p -DF_CPU=16000000L -DARDUINO=10605 -DARDUINO_AVR_PROTRINKET5 -DARDUINO_ARCH_AVR -I/Applications/Arduino.app/Contents/Java/hardware/arduino/avr/cores/arduino -I/Applications/Arduino.app/Contents/Java/hardware/arduino/avr/variants/eightanaloginputs -I/Users/aheidgerken/Documents/Arduino/libraries/ProTrinketKeyboard /var/folders/dv/tfv7k2d16zn5jppj93520yl1qg9vcy/T/build6284573731456832116.tmp/keyboardEncoders.cpp -o /var/folders/dv/tfv7k2d16zn5jppj93520yl1qg9vcy/T/build6284573731456832116.tmp/keyboardEncoders.cpp.o
osx/hardware/tools/avr/bin/avr-g++ -c -g -Os -w -fno-exceptions -ffunction-sections -fdata-sections -fno-threadsafe-statics -MMD -mmcu=atmega328p -DF_CPU=16000000L -DARDUINO=10605 -DARDUINO_AVR_PROTRINKET5 -DARDUINO_ARCH_AVR -Iosx/hardware/arduino/avr/cores/arduino -Iosx/hardware/arduino/avr/variants/eightanaloginputs -I/Users/aheidgerken/Documents/Arduino/libraries/ProTrinketKeyboard build/keyboardEncoders.cpp -o build/keyboardEncoders.cpp.o

/Applications/Arduino.app/Contents/Java/hardware/tools/avr/bin/avr-gcc -w -Os -Wl,--gc-sections -mmcu=atmega328p -o /var/folders/dv/tfv7k2d16zn5jppj93520yl1qg9vcy/T/build6284573731456832116.tmp/keyboardEncoders.cpp.elf /var/folders/dv/tfv7k2d16zn5jppj93520yl1qg9vcy/T/build6284573731456832116.tmp/keyboardEncoders.cpp.o /var/folders/dv/tfv7k2d16zn5jppj93520yl1qg9vcy/T/build6284573731456832116.tmp/Pro Trinket USB Keyboard Library/usbdrvasm_includer.S.o /var/folders/dv/tfv7k2d16zn5jppj93520yl1qg9vcy/T/build6284573731456832116.tmp/Pro Trinket USB Keyboard Library/ProTrinketKeyboardC.c.o /var/folders/dv/tfv7k2d16zn5jppj93520yl1qg9vcy/T/build6284573731456832116.tmp/Pro Trinket USB Keyboard Library/usbdrv_includer.c.o /var/folders/dv/tfv7k2d16zn5jppj93520yl1qg9vcy/T/build6284573731456832116.tmp/Pro Trinket USB Keyboard Library/ProTrinketKeyboard.cpp.o /var/folders/dv/tfv7k2d16zn5jppj93520yl1qg9vcy/T/build6284573731456832116.tmp/core.a -L/var/folders/dv/tfv7k2d16zn5jppj93520yl1qg9vcy/T/build6284573731456832116.tmp -lm
osx/hardware/tools/avr/bin/avr-gcc -w -Os -Wl,--gc-sections -mmcu=atmega328p -o build/keyboardEncoders.cpp.elf build/keyboardEncoders.cpp.o "build/keyLibrary/usbdrvasm_includer.S.o" "build/keyLibrary/ProTrinketKeyboardC.c.o" "build/keyLibrary/usbdrv_includer.c.o" "build/keyLibrary/ProTrinketKeyboard.cpp.o" build/core.a -Lbuild -lm

/Applications/Arduino.app/Contents/Java/hardware/tools/avr/bin/avr-objcopy -O ihex -R .eeprom /var/folders/dv/tfv7k2d16zn5jppj93520yl1qg9vcy/T/build6284573731456832116.tmp/keyboardEncoders.cpp.elf /var/folders/dv/tfv7k2d16zn5jppj93520yl1qg9vcy/T/build6284573731456832116.tmp/keyboardEncoders.cpp.hex
osx/hardware/tools/avr/bin/avr-objcopy -O ihex -R .eeprom build/keyboardEncoders.cpp.elf build/keyboardEncoders.cpp.hex

/Applications/Arduino.app/Contents/Java/hardware/tools/avr/bin/avrdude -C/Applications/Arduino.app/Contents/Java/hardware/tools/avr/etc/avrdude.conf -v -patmega328p -cusbtiny -Uflash:w:/var/folders/dv/tfv7k2d16zn5jppj93520yl1qg9vcy/T/build6284573731456832116.tmp/keyboardEncoders.cpp.hex:i
osx/hardware/tools/avr/bin/avrdude -Cosx/hardware/tools/avr/etc/avrdude.conf -v -patmega328p -cusbtiny -Uflash:w:build/keyboardEncoders.cpp.hex:i

**********************************/
