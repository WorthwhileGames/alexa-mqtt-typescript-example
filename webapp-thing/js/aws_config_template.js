// Change these settings to point this web app to your IOT Thing

const REGION         = 'us-east-1';

// IOT Thing
const ThingName      = '<YOUR THING NAME>';
const SubscribeTopic = '$aws/things/' + ThingName + '/shadow/update/accepted';
const mqttEndpoint   = "<YOUR MQTT HHTPS ENDPOINT>";

// Cognito Identity Pool ID
const IdentityPoolId = '<YOUR COGNITO IDENTITY POOL ID>';
