#### Setup

1. Login to [AWS IOT Console](https://console.aws.amazon.com/iotv2/home)
1. Verify your Region on the top right: ```N. Virginia```
1. On the left panel, locate and click on the "Registry" link
1. A sub-menu appears. Click on the "Things" link
1. Click on the blue "Create" button
1. Give your Thing a name, such as ```waterPump``` and click "Create"
1. On the next page, you will see thing details.  Click the "Interact" item on the left menu.
1. Record the HTTPS Rest API Endpoint you see, such as ```a2eshrcp6u0000.iot.us-east-1.amazonaws.com```


#### IAM
Add IOT Full Access policy to the role used for lambda that uses this IOT api. *(Cognito_MarketGuideLambdaDBUnauth_Role)*


 *AWS IOT documentation: (https://aws.amazon.com/iot-platform/getting-started/) *


 *MQTT subscribing: (https://forums.aws.amazon.com/thread.jspa?threadID=220654, https://forums.aws.amazon.com/message.jspa?messageID=683453) *

 *AWS MQTT: (https://www.npmjs.com/package/aws-mqtt) *

 *AWS Webpack: (http://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/webpack.html, https://aws.amazon.com/blogs/developer/using-webpack-and-the-aws-sdk-for-javascript-to-create-and-bundle-an-application-part-1/) *
