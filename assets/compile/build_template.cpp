
#include <ProTrinketKeyboard.h>



#include "Arduino.h"

class key {
public:
  int pin;
  int keyVal;
  int mod;
  bool pressed;
  bool repeat;
  unsigned long db;
  bool state;
  key(int p,int val){
    pin = p;
    keyVal = val;
    db=0;
    pressed=0;
    state=0;
    mod=0;
  }
  key(int p, int val, int m, bool rpt=0){
    pin = p;
    keyVal = val;
    db=0;
    pressed=0;
    state=0;
    mod=m;
    repeat = rpt;
  }
  void addModifier(int m){
    mod=m;
  }
  bool check(){
    state = !digitalRead(pin);

    if(state && !pressed ){
      pressed = true;
      db = millis()+100;
    } else if(!state && (db>millis() || !db)){
      TrinketKeyboard.pressKey(0, 0);
      pressed=false;
    } else if (pressed && (db<millis() && db) && state)
    {
      db = 0;
      if(repeat) db = millis()+100;
      TrinketKeyboard.pressKey(mod, keyVal);
    } else if(repeat && db>millis() && state && pressed){
      TrinketKeyboard.pressKey(0, 0);
    }
    return state;
  }
};

class keyBoard {
public:
  key* keys[10];
  int numKeys;
  keyBoard(){
    numKeys=0;
  }
  void addKey(int p, int val, int m=0, int rpt=0){
    if(numKeys<10){
      keys[numKeys] = new key(p,val,m,rpt);
      numKeys++;
    }
  }
  void checkKeys(){
    for(int i=0; i<numKeys; i++){
      keys[i]->check();
    }
  }
};

keyBoard keys;

void setup() {

  TrinketKeyboard.begin();
  ${SETUP}

}

void loop() {
  TrinketKeyboard.poll();

  keys.checkKeys();
}
