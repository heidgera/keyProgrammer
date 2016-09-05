'use strict';

let pinMap = [3, 4, 5, 6, 8, 9, 10, 11, 12, 16];

let nameMap = [];
let keyMap = [];

//REGEX :: #define KEYCODE_([A-Za-z0-9_]*)[ \t]*([A-Za-z0-9]*)

//#define KB_LED_NUM			0x01
//#define KB_LED_CAPS			0x02
//#define KB_LED_SCROLL		0x04

// some convenience definitions for modifier keys
nameMap[0x01] = 'MOD_LEFT_CONTROL';
nameMap[0x02] = 'MOD_LEFT_SHIFT';
nameMap[0x04] = 'MOD_LEFT_ALT';
nameMap[0x08] = 'MOD_LEFT_GUI';
nameMap[0x10] = 'MOD_RIGHT_CONTROL';
nameMap[0x20] = 'MOD_RIGHT_SHIFT';
nameMap[0x40] = 'MOD_RIGHT_ALT';
nameMap[0x80] = 'MOD_RIGHT_GUI';

// some more keycodes
nameMap[0xE0] = 'LEFT_CONTROL';
nameMap[0xE1] = 'LEFT_SHIFT';
nameMap[0xE2] = 'LEFT_ALT';
nameMap[0xE3] = 'LEFT_GUI';
nameMap[0xE4] = 'RIGHT_CONTROL';
nameMap[0xE5] = 'RIGHT_SHIFT';
nameMap[0xE6] = 'RIGHT_ALT';
nameMap[0xE7] = 'RIGHT_GUI';
nameMap[0x1E] = '1';
nameMap[0x1F] = '2';
nameMap[0x20] = '3';
nameMap[0x21] = '4';
nameMap[0x22] = '5';
nameMap[0x23] = '6';
nameMap[0x24] = '7';
nameMap[0x25] = '8';
nameMap[0x26] = '9';
nameMap[0x27] = '0';
nameMap[0x04] = 'A';
nameMap[0x05] = 'B';
nameMap[0x06] = 'C';
nameMap[0x07] = 'D';
nameMap[0x08] = 'E';
nameMap[0x09] = 'F';
nameMap[0x0A] = 'G';
nameMap[0x0B] = 'H';
nameMap[0x0C] = 'I';
nameMap[0x0D] = 'J';
nameMap[0x0E] = 'K';
nameMap[0x0F] = 'L';
nameMap[0x10] = 'M';
nameMap[0x11] = 'N';
nameMap[0x12] = 'O';
nameMap[0x13] = 'P';
nameMap[0x14] = 'Q';
nameMap[0x15] = 'R';
nameMap[0x16] = 'S';
nameMap[0x17] = 'T';
nameMap[0x18] = 'U';
nameMap[0x19] = 'V';
nameMap[0x1A] = 'W';
nameMap[0x1B] = 'X';
nameMap[0x1C] = 'Y';
nameMap[0x1D] = 'Z';
nameMap[0x36] = 'COMMA';
nameMap[0x37] = 'PERIOD';
nameMap[0x2D] = 'MINUS';
nameMap[0x2E] = 'EQUAL';
nameMap[0x31] = 'BACKSLASH';
nameMap[0x2F] = 'SQBRAK_LEFT';
nameMap[0x30] = 'SQBRAK_RIGHT';
nameMap[0x38] = 'SLASH';
nameMap[0x3A] = 'F1';
nameMap[0x3B] = 'F2';
nameMap[0x3C] = 'F3';
nameMap[0x3D] = 'F4';
nameMap[0x3E] = 'F5';
nameMap[0x3F] = 'F6';
nameMap[0x40] = 'F7';
nameMap[0x41] = 'F8';
nameMap[0x42] = 'F9';
nameMap[0x43] = 'F10';
nameMap[0x44] = 'F11';
nameMap[0x45] = 'F12';
nameMap[0x65] = 'APP';
nameMap[0x28] = 'ENTER';
nameMap[0x2A] = 'BACKSPACE';
nameMap[0x29] = 'ESC';
nameMap[0x2B] = 'TAB';
nameMap[0x2C] = 'SPACE';
nameMap[0x49] = 'INSERT';
nameMap[0x4A] = 'HOME';
nameMap[0x4B] = 'PAGE_UP';
nameMap[0x4C] = 'DELETE';
nameMap[0x4D] = 'END';
nameMap[0x4E] = 'PAGE_DOWN';
nameMap[0x46] = 'PRINTSCREEN';
nameMap[0x4F] = 'ARROW_RIGHT';
nameMap[0x50] = 'ARROW_LEFT';
nameMap[0x51] = 'ARROW_DOWN';
nameMap[0x52] = 'ARROW_UP';
nameMap[51] = 'SEMI_COLON';
nameMap[52] = 'QUOTE';
nameMap[57] = 'CAPS_LOCK';
nameMap[53] = 'BACK_TICK';

/*shift	16
ctrl	17
alt	18
left_special	91
right_special	92
pause_break	19
caps_lock	20
select	93
num_lock	144
scroll_lock	145
numpad_0	96
numpad_1	97
numpad_2	98
numpad_3	99
numpad_4	100
numpad_5	101
numpad_6	102
numpad_7	103
numpad_8	104
numpad_9	105
multiply	106
add	107
subtract	109
decimal_point	110
divide	111*/

keyMap[8] = 'BACKSPACE';
keyMap[9] = 'TAB';
keyMap[13] = 'ENTER';
keyMap[27] = 'ESC';
keyMap[32] = 'SPACE';
keyMap[33] = 'PAGE_UP';
keyMap[34] = 'PAGE_DOWN';
keyMap[35] = 'END';
keyMap[36] = 'HOME';
keyMap[37] = 'ARROW_LEFT';
keyMap[38] = 'ARROW_UP';
keyMap[39] = 'ARROW_RIGHT';
keyMap[40] = 'ARROW_DOWN';
keyMap[45] = 'INSERT';
keyMap[46] = 'DELETE';
keyMap[48] = '0';
keyMap[49] = '1';
keyMap[50] = '2';
keyMap[51] = '3';
keyMap[52] = '4';
keyMap[53] = '5';
keyMap[54] = '6';
keyMap[55] = '7';
keyMap[56] = '8';
keyMap[57] = '9';
keyMap[65] = 'A';
keyMap[66] = 'B';
keyMap[67] = 'C';
keyMap[68] = 'D';
keyMap[69] = 'E';
keyMap[70] = 'F';
keyMap[71] = 'G';
keyMap[72] = 'H';
keyMap[73] = 'I';
keyMap[74] = 'J';
keyMap[75] = 'K';
keyMap[76] = 'L';
keyMap[77] = 'M';
keyMap[78] = 'N';
keyMap[79] = 'O';
keyMap[80] = 'P';
keyMap[81] = 'Q';
keyMap[82] = 'R';
keyMap[83] = 'S';
keyMap[84] = 'T';
keyMap[85] = 'U';
keyMap[86] = 'V';
keyMap[87] = 'W';
keyMap[88] = 'X';
keyMap[89] = 'Y';
keyMap[90] = 'Z';
keyMap[112] = 'F1';
keyMap[113] = 'F2';
keyMap[114] = 'F3';
keyMap[115] = 'F4';
keyMap[116] = 'F5';
keyMap[117] = 'F6';
keyMap[118] = 'F7';
keyMap[119] = 'F8';
keyMap[120] = 'F9';
keyMap[121] = 'F10';
keyMap[122] = 'F11';
keyMap[123] = 'F12';
keyMap[187] = 'EQUAL';
keyMap[186] = 'SEMI_COLON';
keyMap[222] = 'QUOTE';
keyMap[188] = 'COMMA';
keyMap[189] = 'MINUS';
keyMap[190] = 'PERIOD';
keyMap[191] = 'SLASH';
keyMap[219] = 'SQBRAK_LEFT';
keyMap[220] = 'BACKSLASH';
keyMap[221] = 'SQBRAK_RIGHT';
keyMap[16] = 'LEFT_SHIFT';
keyMap[17] = 'LEFT_CONTROL';
keyMap[18] = 'LEFT_ALT';
keyMap[91] = 'LEFT_GUI';
keyMap[20] = 'CAPS_LOCK';
keyMap[192] = 'BACK_TICK';
/*single_quote	222
semi_colon	186
grave_accent	192*/

var keySet = inheritFrom(HTMLElement, function() {
  this.createdCallback = function() {
    var _this = this;

    _this.keyCode = 0;
    _this.repeat = 0;
    _this.shift = 0;
    _this.control = 0;

  };

  this.attachedCallback = function() {
    var _this = this;

    _this.nameDiv = µ('+div', _this);
    var key = µ('+input', _this);
    key.type = 'text';
    var rptTtl = µ('+div', _this);
    rptTtl.textContent = 'Repeat:';
    var repeat = µ('+input', _this);
    repeat.type = 'checkbox';
    var shftTtl = µ('+div', _this);
    shftTtl.textContent = 'Shift:';
    var shift = µ('+input', _this);
    shift.type = 'checkbox';
    var ctlTtl = µ('+div', _this);
    ctlTtl.textContent = 'Control:';
    var control = µ('+input', _this);
    control.type = 'checkbox';

    control.onclick = () => {
      _this.control = control.checked;
    };

    repeat.onclick = () => {
      _this.repeat = repeat.checked;
    };

    shift.onclick = () => {
      _this.shift = shift.checked;
    };

    key.onkeydown = function(e) {
      e.preventDefault();
      let keyCode = e.keyCode;
      console.log(keyCode);
      _this.keyCode = nameMap.indexOf(keyMap[keyCode]);

      //console.log(_this.keyCode);
      key.value = keyMap[keyCode];
    };

    _this.input = parseInt(µ('|>input', _this));
    _this.nameDiv.innerHTML = 'Input ' + (_this.input + 1) + ':';

    _this.getString = function() {
      if (_this.keyCode) {
        let mod = ((_this.shift) ? 2 : 0) + ((_this.control) ? 1 : 0);
        let ret = '\tkeys.addKey(' + pinMap[_this.input] + ',';
        ret += _this.keyCode + ',';
        return ret + mod + ',' + ((_this.repeat) ? 1 : 0) + ');\n';
      } else {
        return null;
      }

    };

    _this.clear = function() {
      key.value = '';
      _this.keyCode = 0;
      _this.repeat = repeat.checked = false;
      _this.control = control.checked = false;
      _this.shift = shift.checked = false;
    };

    _this.setFromObj = (obj) => {
      _this.repeat = repeat.checked = obj.repeat;
      _this.control = control.checked = obj.control;
      _this.shift = shift.checked = obj.shift;
      _this.keyCode = obj.keyCode;
      if (nameMap[_this.keyCode]) key.value = nameMap[_this.keyCode];
      else key.value = '';
    };
  };
});

var KeySet = document.registerElement('key-set', keySet);

var keyFig = inheritFrom(HTMLElement, function() {
  this.createdCallback = function() {
    var _this = this;
    _this.keys = [];
    let numKeys = parseInt(µ('|>keys', _this));

    for (let i = 0; i < numKeys; i++) {
      let nextKey = new KeySet();
      _this.keys.push(nextKey);
      nextKey.setAttribute('input', i);
      _this.appendChild(nextKey);
    }

    _this.getStrings = function() {
      let strs = [];
      for (var i = 0; i < _this.keys.length; i++) {
        let next = _this.keys[i].getString();
        if (next) strs.push(next);
      }

      return strs;
    };

    _this.clear = function() {
      for (var i = 0; i < _this.keys.length; i++) {
        _this.keys[i].clear();
      }
    };
  };
});

var KeyFig = document.registerElement('key-fig', keyFig);
