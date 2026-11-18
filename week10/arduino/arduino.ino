float prevLever0State;
float prevLever1State;
float prevLever2State;
float prevLever3State;
float prevLever4State;

const int lever0Pin = 2;
const int lever1Pin = 4;
const int lever2Pin = 7;
const int lever3Pin = 8;
const int lever4Pin = 12;


const int LEDPin = 13;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  pinMode(lever0Pin, INPUT);
  pinMode(lever1Pin, INPUT);
  pinMode(lever2Pin, INPUT);
  pinMode(lever3Pin, INPUT);
  pinMode(lever4Pin, INPUT);

  // pinMode(lever0Pin, INPUT_PULLUP);
  // pinMode(lever1Pin, INPUT_PULLUP);
  // pinMode(lever2Pin, INPUT_PULLUP);
  // pinMode(lever3Pin, INPUT_PULLUP);
  // pinMode(lever4Pin, INPUT_PULLUP);

  pinMode(LEDPin, OUTPUT);
}

void loop() {
  int lever0 = digitalRead(lever0Pin);
  int lever1 = digitalRead(lever1Pin);
  int lever2 = digitalRead(lever2Pin);
  int lever3 = digitalRead(lever3Pin);
  int lever4 = digitalRead(lever4Pin);

// to make sure circuit is working properly
  if(prevLever0State == LOW && lever0 == HIGH){
    // Serial.println("lever0 pushed");
    digitalWrite(LEDPin, HIGH);
  } else if(prevLever1State == LOW && lever1 == HIGH){
    // Serial.println("lever0 pushed");
    digitalWrite(LEDPin, HIGH);
  } else if(prevLever2State == LOW && lever2 == HIGH){
    // Serial.println("lever0 pushed");
    digitalWrite(LEDPin, HIGH);
  } else if(prevLever3State == LOW && lever3 == HIGH){
    // Serial.println("lever0 pushed");
    digitalWrite(LEDPin, HIGH);
  } else if(prevLever4State == LOW && lever4 == HIGH){
    // Serial.println("lever0 pushed");
    digitalWrite(LEDPin, HIGH);
  } else{
    digitalWrite(LEDPin, LOW);
  }
  prevLever0State = lever0;
  prevLever1State = lever1;
  prevLever2State = lever2;
  prevLever3State = lever3;
  prevLever4State = lever4;

  Serial.print(lever0);
  Serial.print(",");
  Serial.print(lever1);
  Serial.print(",");
  Serial.print(lever2);
  Serial.print(",");
  Serial.print(lever3);
  Serial.print(",");
  Serial.print(lever4);
  Serial.println();

  delay(20);
}
