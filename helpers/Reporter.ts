import { browser } from 'protractor';
import fs = require('fs');
import {TestResults} from './TestResults';
import { ObjectMapper } from 'json-object-mapper';
import "reflect-metadata";
import {get, post} from 'request'


/* tslint:disable */ 
var jsoObj : {};
var testResult : TestResults = new TestResults();
var specStartTime: any;
var suiteName:string;
var myReporter = {
    specDone: function (result) {
        console.log(JSON.stringify(result));
        testResult.testName = result.description;
        testResult.testStatus = result.status;
        testResult.testTimetaken = formatDuration((new Date()).getTime() - specStartTime);
        testResult.id = result.id;
        testResult.executionStarttime = specStartTime;
        testResult.testSuiteName = suiteName;
        

        console.log(`Timetaken: ${formatDuration((new Date()).getTime() - specStartTime)}`);
        console.log(`resultStatus : ${result.status}`)
        if (result.failedExpectations.length > 0) { 
            browser.getProcessedConfig().then(function (config) {
                browser.takeScreenshot().then(function (png) {
                    var dirPath = './reports/screenshots/';
                    if (!fs.existsSync('./reports')) {
                        fs.mkdirSync('./reports');
                        if (!fs.existsSync(dirPath))
                            fs.mkdirSync(dirPath);
                    }
                    var fileName = (config.capabilities.browserName + '-' + result.fullName).replace(/[\/\\]/g, ' ').substring(0, 230);
                    var stream = fs.createWriteStream(dirPath + fileName + '.png');
                    stream.write(new Buffer(png, 'base64'));
                    stream.end();
                }, function (error) {
                    console.log("failed to take screenshot");
                });
            }).then(()=>  {
                for(var i = 0; i < result.failedExpectations.length; i++) {
                    console.log(`Failure: ${result.failedExpectations[i].message}`)
                    console.log(`Stacktrace: ${result.failedExpectations[i].stack}`);
                    testResult.testErrorMessage = result.failedExpectations[i].message;
                    testResult.testStacktrace = result.failedExpectations[i].stack;
                    //console.log(`failedExpectations--------------: ${JSON.stringify(result.failedExpectations[i])}`);    
                }            
            });
        }

        console.log(`----------sending to es------------------`);
        let stringrified: String = ObjectMapper.serialize(testResult);
        console.log(`json object: ${stringrified}`);
        sendToES(stringrified);
        console.log(`--------------xxxxx--------------`);
    },
    jasmineStarted: function(suiteInfo) {
        console.log(`Running suite with : ${suiteInfo.totalSpecsDefined}`);
    },
    suiteStarted: function(result) {
        suiteName = result.description;
        console.log(`Suite started : ${result.description} whose full description is ${result.fullName}`);
    },
    specStarted: function(result) {
        console.log(`Spec started : ${result.description} whose full description is ${result.fullName}`);
        specStartTime = (new Date()).getTime();
    },
    

    // suite: {
    //     displayNumber: true,    // display each suite number (hierarchical)
    //   },
    //   spec: {
    //     displayPending: true,   // display each pending spec
    //     displayDuration: true,  // display each spec duration
    //   },
    //   summary: {
    //     displaySuccessful: true, // display summary of all successes after execution
    //     displayFailed: true,    // display summary of all failures after execution
    //     displayPending: false,   // display summary of all pending specs after execution
    //   }
};

function formatDuration(durationInMs: number): string {
    let duration = "";
    let durationInSecs = durationInMs / 1000;
    let durationInMins: number;
    let durationInHrs: number;
    if (durationInSecs < 1) {
        return `${durationInSecs} sec${pluralize(durationInSecs)}`;
    }
    durationInSecs = Math.round(durationInSecs);
    if (durationInSecs < 60) {
        return `${durationInSecs} sec${pluralize(durationInSecs)}`;
    }
    durationInMins = Math.floor(durationInSecs / 60);
    durationInSecs = durationInSecs % 60;
    if (durationInSecs) {
        duration = ` ${durationInSecs} sec${pluralize(durationInSecs)}`;
    }
    if (durationInMins < 60) {
        return `${durationInMins} min${pluralize(durationInMins)}${duration}`;
    }
    durationInHrs = Math.floor(durationInMins / 60);
    durationInMins = durationInMins % 60;
    if (durationInMins) {
        duration = ` ${durationInMins} min${pluralize(durationInMins)}${duration}`;
    }
    return `${durationInHrs} hour${pluralize(durationInHrs)}${duration}`;
}

function pluralize(count: number): string {
    return count > 1 ? "s" : "";
}

function sendToES(testResults: any) {
    post({
        headers: {'content-type' : 'application/json', },
        url: 'http://localhost:9200/bfapp/suite',
        body: testResults
      }, function(error, response, body){
        console.log(body);
    });
}
module.exports = myReporter;