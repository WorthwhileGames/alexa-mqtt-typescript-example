## A TypeScript Alexa Skill Example with IoT Integration Using mqtt

### Build and Test
- `npm install`
- `npm run build`
- `npm run test` (node testflow.js)

### Webpack
- webpack us used to build the `index.ts` and `data/aws-config.json` into one, bundled js file: `dist/index.js`
- this `dist/index.js` is then deployed (manually) to the skill's lambda
- Note: in this example, tsc is also used to build `lib/index.js`, however this file is not complete because it does not contain the `data/aws-config.json` data

### aws-config.json
- in order to run/test the code:
- - Copy data/aws-config-template.json and rename it aws-config.json
- - Edit the appId and cogitoIdentityPoolId fields
```
{
    "region": "us-east-1",
    "cogitoIdentityPoolId": "[your cogito identity pool id]",
    "appId": "[your skill's app id]",
    "skillLambdaName": "[your skill lambda name]",
    "alexaDynamoDBTableName": "[your skill's dynamo db table name]",
    "lambdaFunctionNameForDBAccess": "[name of the lambda function used to test DB access by callLambda.js]",
    "thingARN": "[your thing's ARN]",
    "thingEndpoint": "[your thing's HTTPS endpoint]",
    "thingName": "[your thing's name]"
}
```

### testflow.js
- provided by amazon in the alexa-cookbook repo
- invokes the intents specified in dialogs/default.txt
- - https://github.com/alexa/alexa-cookbook/tree/master/testing/TestFlow
- requests a valid alexa skill/app id
```
var appId = '[your skill's app id]';
```

### callLambda.js
- Shows how to access the app/skill's DynamoDB using a vanilla (non-alexa) lambda

### mqttTest.js
- subscribes to the mqtt endpoint and topic used by the thing's endpoint

### Speech Assets
- these are not part of the lambda build process but are helpful when creating the skill
- speechAssets/IntentSchema.json
- speechAssets/InteractionModel.json (can be pasted into a new skill)
- speechAssets/SampleUtterances.txt

### Deploy
- copy dist/index.js to the lambda code editor
- (or set up the aws CLI ...)
