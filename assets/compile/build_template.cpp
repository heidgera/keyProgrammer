
#include <ProTrinketKeyboard.h>



#include "Arduino.h"

class key {
public:
  int pin;
  int keyVal;
  int mod;
  bool pressed;
  bool held;
  bool repeat;
  bool oneShot;
  unsigned long db;
  unsigned long rptTmr;
  unsigned long shotTmr;
  bool state;
  key(int p,int val){
    pin = p;
    keyVal = val;
    db=0;
    pressed=0;
    state=0;
    mod=0;
    held =0;
  }
  key(int p, int val, int m, bool rpt=0, bool once=0){
    pin = p;
    pinMode(p,INPUT_PULLUP);
    keyVal = val;
    db=0;
    pressed=0;
    held = 0;
    state=0;
    mod=m;
    repeat = rpt;
    oneShot = once;
  }
  void addModifier(int m){
    mod=m;
  }
  bool check(){
    state = !digitalRead(pin);

    /*if(state && !pressed ){
      TrinketKeyboard.pressKey(mod, keyVal);
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
    }*/
    if(state && !pressed && millis() > db){
        pressed = true;
        held = true;
        //TrinketKeyboard.pressKey(mod, keyVal);
        db = millis()+20;
        if(repeat) rptTmr = millis() + 100;
        if(oneShot) shotTmr = millis()+50;
    }
    else if(pressed && ! state && millis() > db){
      db = millis()+20;
      pressed = false;
      held = false;
      //TrinketKeyboard.pressKey(0, 0);
    } else if(pressed && millis() > shotTmr && oneShot){
      held = false;
      //TrinketKeyboard.pressKey(0, 0);
    } else if(pressed && state && millis() > rptTmr && repeat){
      //TrinketKeyboard.pressKey(0, 0);
      //TrinketKeyboard.pressKey(mod, keyVal);
      held = !held;
      rptTmr = millis() + 100;
    }
    return state;
  }
};

class keyBoard {
public:
  key* keys[12];
  int numKeys;
  keyBoard(){
    numKeys=0;
  }
  void addKey(int p, int val, int m=0, int rpt=0,int once=0){
    if(numKeys<12){
      keys[numKeys] = new key(p,val,m,rpt,once);
      numKeys++;
    }
  }
  void checkKeys(){
    int numPress = 0;
    for(int i=0; i<numKeys; i++){
      if(keys[i]->check()) numPress++;
    }
    if(numPress){
      uint8_t presses[numPress];
      int track = 0;
      int mod = 0;
      for(int i=0; i<numKeys; i++){
        if(keys[i]->held){
          presses[track++] = keys[i]->keyVal;
          if(keys[i]->mod) mod = keys[i]->mod;
        }
      }
      TrinketKeyboard.pressKeys(mod, presses, numPress);
    } else {
      TrinketKeyboard.pressKey(0, 0);
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
