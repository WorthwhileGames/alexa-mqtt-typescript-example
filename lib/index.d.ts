declare const AWS: any;
declare const Alexa: any;
declare const config: any;
declare const iotConfig: any;
declare const stockSymbols: {
    disney: string;
    amazon: string;
    apple: string;
    google: string;
    alphabet: string;
};
declare const myAPI: {
    host: string;
    port: number;
    path: string;
    method: string;
};
declare const testData: {
    id: string;
    t: string;
    e: string;
    l: string;
}[];
declare class Handler {
    speechOutput: string;
    reprompt: string;
    welcomeOutput: string;
    welcomeReprompt: string;
    constructor(event: any, context: any, callback: any);
    getStockQuote(stockSymbol: string, callback: any): void;
    updateShadow(desiredState: any, callback: any): void;
}
declare let handler: (event: any, context: any, callback: any) => void;
