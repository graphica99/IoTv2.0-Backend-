const mqtt = require("mqtt");
// const client = mqtt.connect("mqtt://localhost:8080");
const client = mqtt.connect("mqtt://https://iotdevlab.herokuapp.com:2356");
const topic_val = "eco";

console.log("mqtt broker connected on server");
client.on("connect", () => {
  console.log("mqtt broker connected on server");
  setInterval(() => {
    const rndNumHum = Math.floor(Math.random() * 60);
    const rndNumTemp = Math.floor(Math.random() * 60);
    const data = [
      {
        sensor: "temperature",
        value: rndNumTemp,
      },
      { sensor: "humidity", value: rndNumHum },
    ];
    const mess = JSON.stringify(data);
    client.publish(topic_val, mess);
  }, 2000);
});
