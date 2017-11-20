#include <DHT.h>
#include <DHT_U.h>

#define DHTTYPE DHT11
#define DHTPIN 2

DHT dht(DHTPIN, DHTTYPE);

#include <ESP8266WiFi.h>
#include <PubSubClient.h>

// Update these with values suitable for your network.

const char* ssid = "cesctechodemo";
const char* password = "wearethebest";
const char* mqtt_server = "iot.eclipse.org";
char tempR[10] = "";
char humidityR[10] = "";
char airR[10] = "";
String resultStr;
char resultChar[100] = "";

WiFiClient espClient;
PubSubClient client(espClient);
long lastMsg = 0;
char msg[50];
int value = 0;

void setup() {
  pinMode(BUILTIN_LED, OUTPUT);     // Initialize the BUILTIN_LED pin as an output
  Serial.begin(9600);
  setup_wifi();
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
}

void setup_wifi() {

  delay(10);
  // We start by connecting to a WiFi network
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();

  // Switch on the LED if an 1 was received as first character
  if ((char)payload[0] == '1') {
    digitalWrite(BUILTIN_LED, LOW);   // Turn the LED on (Note that LOW is the voltage level
    // but actually the LED is on; this is because
    // it is acive low on the ESP-01)
  } else {
    digitalWrite(BUILTIN_LED, HIGH);  // Turn the LED off by making the voltage HIGH
  }

}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Attempt to connect
    if (client.connect("ESP8266Client4811515")) {
      Serial.println("connected");
      // Once connected, publish an announcement...
      client.publish("presence", "gateway ready");
      // ... and resubscribe
      //client.subscribe("inTopic");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}
void loop() {

  if (!client.connected()) {
    reconnect();
  }
  client.loop();
  
  float sensorValue;
  sensorValue = analogRead(A0);
  float h = dht.readHumidity();
  // Read temperature as Celsius (the default)
  float t = dht.readTemperature();
  Serial.println(t);
  Serial.println(h);
  Serial.println(sensorValue);
  Serial.println("------------------------");
  
  dtostrf(t, 6, 2, tempR);
  dtostrf(h, 6, 2, humidityR);
  dtostrf(sensorValue, 6, 2, airR);

  Serial.println(tempR);
  Serial.println(humidityR);
  Serial.println(airR);
  Serial.println("------------------------");
delay(500);
  
String tempS(tempR);
String humidityS(humidityR);
String sensorValueS(airR);

  Serial.println(tempS);
  Serial.println(humidityS);
  Serial.println(sensorValueS);
  Serial.println("------------------------");

delay(300);
  
resultStr = tempS +"," + humidityS + "," + sensorValueS;
resultStr.toCharArray(resultChar, 100);

delay(200);
  client.publish("techo_mqtt", resultChar);
  delay(1000);
}
