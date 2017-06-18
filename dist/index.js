(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("aws-sdk");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = {
	"region": "us-east-1",
	"cogitoIdentityPoolId": "us-east-1:2c15a7db-7fc4-43e5-be3c-452b9805bd89",
	"appId": "amzn1.ask.skill.6adaade3-4b2c-40ae-a8e5-f42f2c6eb026",
	"skillLambdaName": "MarketGuide",
	"alexaDynamoDBTableName": "MarketGuideDynamo",
	"lambdaFunctionNameForDBAccess": "MarketGuideLambdaDB",
	"thingARN": "arn:aws:iot:us-east-1:237862827682:thing/robot",
	"thingEndpoint": "a85qxqlg9bdjq.iot.us-east-1.amazonaws.com",
	"thingName": "robot"
};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("alexa-sdk");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const AWS = __webpack_require__(0);
const Alexa = __webpack_require__(2);
const config = __webpack_require__(1);
const iotConfig = {};
iotConfig.IOT_BROKER_ENDPOINT = config.thingEndpoint; // also called the REST API endpoint
iotConfig.IOT_BROKER_REGION = config.region; // eu-west-1 corresponds to the Ireland Region.  Use us-east-1 for the N. Virginia region
iotConfig.IOT_THING_NAME = config.thingName;
const stockSymbols = {
    disney: 'DIS',
    amazon: 'AMZN',
    apple: 'AAPL',
    google: 'GOOG',
    alphabet: 'GOOG',
};
const myAPI = {
    host: 'finance.google.com',
    port: 80,
    path: '/finance/info?client=ig&q=DIS',
    method: 'GET',
};
const testData = [{ id: '38249', t: 'DIS', e: 'NYSE', l: '104.32' }];
class Handler {
    constructor(event, context, callback) {
        this.welcomeOutput = 'This is a placeholder welcome message.';
        this.welcomeReprompt = 'sample re-prompt text';
        let alexa = Alexa.handler(event, context);
        alexa.dynamoDBTableName = 'MarketGuideDynamo';
        // To enable string internationalization (i18n) features, set a resources object.
        // alexa.resources = languageStrings;
        let thiz = this;
        // Alexa.Handlers
        let handlers = {
            'Unhandled': function () {
                this.emit(':ask', 'Insert your own error message here');
            },
            'LaunchRequest': function () {
                this.emit(':tell', thiz.welcomeOutput);
            },
            'AboutIntent': function () {
                thiz.speechOutput = '';
                this.emit(':tell', thiz.speechOutput);
            },
            'AMAZON.HelpIntent': function () {
                thiz.speechOutput = '';
                thiz.reprompt = '';
                this.emit(':ask', thiz.speechOutput, thiz.reprompt);
            },
            'AMAZON.CancelIntent': function () {
                thiz.speechOutput = '';
                this.emit(':tell', thiz.speechOutput);
            },
            'AMAZON.StopIntent': function () {
                let myName = '';
                if (this.attributes['name']) {
                    myName = this.attributes['name'];
                }
                this.emit(':tell', 'goodbye, ' + myName, 'try again');
            },
            'SessionEndedRequest': function () {
                thiz.speechOutput = '';
                this.emit(':tell', thiz.speechOutput);
            },
            'BuySellSharesIntent': function () {
                let request = this.event.request;
                let companySlot = request.intent.slots.company.value.toLowerCase();
                let stockSymbol = stockSymbols[companySlot];
                let amountSlot = request.intent.slots.amount.value.toLowerCase();
                let commandSlot = request.intent.slots.command.value.toLowerCase();
                let portfolio = {
                    stocks: [],
                };
                if (this.attributes['portfolio']) {
                    portfolio = this.attributes['portfolio'];
                }
                let transaction = {
                    command: commandSlot,
                    company: companySlot,
                    amount: amountSlot,
                    timestamp: new Date().getTime(),
                };
                portfolio.stocks.push(transaction);
                this.attributes['portfolio'] = portfolio;
                thiz.speechOutput = 'OK, I will ' + commandSlot + ' ' + amountSlot + ' shares of ' + stockSymbol;
                this.emit(':tell', thiz.speechOutput);
            },
            'GetPortfolioInfoIntent': function () {
                thiz.speechOutput = '';
                this.emit(':tell', thiz.speechOutput);
            },
            'GetCompanyInfoIntent': function () {
                let request = this.event.request;
                let companySlot = request.intent.slots.company.value.toLowerCase();
                let stockSymbol = stockSymbols[companySlot];
                if (stockSymbol) {
                    let iotState = { company: companySlot, stockSymbol: stockSymbol };
                    thiz.updateShadow(iotState, status => {
                        console.log(`MarketGuide: IOT State Updated: ${JSON.stringify(iotState)}`);
                    });
                    thiz.getStockQuote(stockSymbol, (symbol, exchange, price) => {
                        this.emit(':tell', 'The current stock price for ' + companySlot + ' on the ' + exchange + ' is ' + price);
                    });
                }
                else {
                    this.emit(':tell', 'I\'m sorry. I don\'t have that information for ' + companySlot);
                }
            },
            'GetLeaderBoardInfoIntent': function () {
                thiz.speechOutput = '';
                this.emit(':tell', thiz.speechOutput);
            },
            'MyNameIsIntent': function () {
                let request = this.event.request;
                let myName = request.intent.slots.firstname.value;
                this.attributes['name'] = myName;
                this.emit(':ask', 'hello, ' + myName, 'try again');
            },
        };
        //
        alexa.registerHandlers(handlers);
        alexa.execute();
    }
    getStockQuote(stockSymbol, callback) {
        let http = __webpack_require__(3);
        myAPI.path = '/finance/info?client=ig&q=' + stockSymbol;
        let req = http.get(myAPI, (res) => {
            res.setEncoding('utf8');
            let returnData = '';
            res.on('data', (chunk) => {
                returnData = returnData + chunk;
            });
            res.on('end', () => {
                returnData = returnData.substring(3);
                let channelObj = testData;
                try {
                    channelObj = JSON.parse(returnData);
                }
                catch (e) {
                    console.log(e);
                }
                let symbol = channelObj[0].t;
                let exchange = channelObj[0].e;
                let price = channelObj[0].l;
                callback(symbol, exchange, price);
            });
        });
        req.end();
    }
    updateShadow(desiredState, callback) {
        // update AWS IOT thing shadow
        var AWS = __webpack_require__(0);
        AWS.config.region = iotConfig.IOT_BROKER_REGION;
        var paramsUpdate = {
            "thingName": iotConfig.IOT_THING_NAME,
            "payload": JSON.stringify({ "state": { "desired": desiredState } })
        };
        var iotData = new AWS.IotData({ endpoint: iotConfig.IOT_BROKER_ENDPOINT });
        iotData.updateThingShadow(paramsUpdate, function (err, data) {
            if (err) {
                console.log(err);
                callback("not ok");
            }
            else {
                console.log("updated thing shadow " + iotConfig.IOT_THING_NAME + ' to state ' + paramsUpdate.payload);
                callback("ok");
            }
        });
    }
}
let handler = (event, context, callback) => {
    let instance = new Handler(event, context, callback);
};
exports.handler = handler;


/***/ })
/******/ ])));