const AWS = require('aws-sdk')
const AWSMqtt = require('aws-mqtt')
const WebSocket = require('ws')

const config = require('./data/aws-config.json');

AWS.config.region = config.region;
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: config.cognitoIdentityPoolId
});

const client = AWSMqtt.connect({
  WebSocket: WebSocket,
  region: AWS.config.region,
  credentials: AWS.config.credentials,
  endpoint: config.thingEndpoint, // NOTE: get this value with `aws iot describe-endpoint`
  clientId: 'mqtt-client-' + (Math.floor((Math.random() * 100000) + 1)), // clientId to register with MQTT broker. Need to be unique per client
});

client.on('connect', () => {
  client.subscribe('$aws/things/' + config.thingName + '/shadow/update/accepted')
});

client.on('message', (topic, message) => {
  console.log(topic, message.toString());
});

client.on('close', () => {
  // ...
});

client.on('offline', () => {
  // ...
});
