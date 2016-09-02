#line 1 "keyboardEncoders.ino"
#include <ProTrinketKeyboard.h>                                    

                                                           

#include "Arduino.h"
void setup();
void loop();
#line 5
class key {
public:
  int pin;
  int keyVal;
  int mod;
  bool pressed;
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
    } else if (pressed && db>millis() && state)
    {
      db = 0;
      TrinketKeyboard.pressKey(mod, keyVal);
    }
    return state;
  }
};

key aKey(3,KEYCODE_A);
key bKey(4,KEYCODE_B);
key cKey(5,KEYCODE_C);

void setup() {
                                           
  TrinketKeyboard.begin();
}

void loop() {
  TrinketKeyboard.poll();
                                                
  aKey.check();
  bKey.check();
  cKey.check();
}

