import { browser, Config } from 'protractor';
import {timeout} from './constants';
import {SpecReporter} from 'jasmine-spec-reporter';
import reporter = require('../../helpers/Reporter');
import * as  Jasmine2HtmlReporter from 'protractor-jasmine2-html-reporter';
const JasmineConsoleReporter = require('jasmine-console-reporter');


export let config: Config = {
  //seleniumAddress: 'http://localhost:4444/wd/hub',
  //seleniumAddress: 'http://127.0.0.1:4723/wd/hub',
  //specs: [ '../specs/**/*.spec.js' ],
  //specs: [ '../specs/**/Blinkregistration.spec.js' ],
  //specs: [ '../specs/**/NavToRegisterationPage.spec.js' ],
  //seleniumArgs: ['-Dwebdriver.ie.driver=../../node_modules/protractor/node_modules/webdriver-manager/IEDriverServer3.7.0.exe'],
  //geckoDriver: '../../node_modules/protractor/node_modules/webdriver-manager/geckodriver-v0.19.1.exe',
  allScriptsTimeout: 50000,
  getPageTimeout: 50000,
  
  framework: 'jasmine2',
  plugins: [{
    package: 'protractor-screenshoter-plugin',
    screenshotPath: './REPORTS/e2e',
    screenshotOnExpect: 'failure+success',
    screenshotOnSpec: 'none',
    withLogs: false,
    writeReportFreq: 'asap',
    imageToAscii: 'none',
    clearFoldersBeforeTest: true
  }],
  baseUrl: 'https://blinkfitness.com/',

  // localSeleniumStandaloneOpts: {
  //   jvmArgs: [
  //     '-Dwebdriver.ie.driver=../../node_modules/protractor/node_modules/webdriver-manager/IEDriverServer3.7.0.exe'
  //   ]
  // },
//   capabilities: {
//     'browserName': 'chrome'
//     // 'chromeOptions': {
//     //   'args': ['--load-extension=' + '../ads-blocker']
//     // }
// },
  multiCapabilities: [{
      browserName: 'chrome',
      //specs: [ '../specs/**/NavToRegisterationPage.spec.js', '../specs/**/BlinkRegisterationErrors.spec.js','../specs/**/BlinkLogin.spec.js'],
      specs: [ '../specs/**/BlinkLogin.spec.js'],
      chromeOptions : {
        args : ['--no-proxy-server']
      }
    
    }, {
      browserName: 'chrome',
        'chromeOptions': {
            'mobileEmulation': {
                'deviceName': 'Nexus 6P'
        }
      },
      specs: [ '../specs/**/BlinkLogin.spec.js'],
    }
  
    //   //specs: [ '../specs/**/NavToRegisterationPage.spec.js', '../specs/**/BlinkRegisterationErrors.spec.js' ,'../specs/**/BlinkLogin.spec.js'],
    //   specs: [ '../specs/**/BlinkLogin.spec.js', '../specs/**/BlinkRegisterationErrors.spec.js'],
    // }
    
    // {    
    //   browserName : 'firefox',
    //   'acceptSslCerts': true,
    //   'acceptInsecureCerts': true,
    //    specs: [ '../specs/**/NavToRegisterationPage.spec.js', '../specs/**/BlinkRegisterationErrors.spec.js'],
    // }, 
    // {
    //   browserName: 'chrome' ,
    //   //specs: [ '../specs/**/NavToRegisterationPage.spec.js', '../specs/**/BlinkRegisterationErrors.spec.js' ],
    //   specs: [ '../specs/**/BlinkLogin.spec.js',],
    //   chromeOptions : {
    //     args : ['--no-proxy-server']
    // },
    //   //  shardTestFiles: true,
    //   //  count : 2
    // },
  //  chromeOptions: {
  //   args: [ "--headless", "--disable-gpu"]
  // }

    // { 
    //     browserName: 'chrome',
    //     'chromeOptions': {
    //         'mobileEmulation': {
    //             'deviceName': 'Nexus 6P'
    //         }
    //     },
    //     specs: [ '../specs/**/BlinkLogin.spec.js',],
    // }
  ],
  //maxInstances: 2,
  
  onPrepare: () => {
    browser.manage().window().maximize();
    browser.manage().timeouts().implicitlyWait(timeout.IMPLICIT);
    browser.ignoreSynchronization = true;
    browser.waitForAngularEnabled(false);

    //custom reporter
    // jasmine.getEnv().addReporter(
    //   new Jasmine2HtmlReporter({
    //     savePath: './reports',
    //     cleanDestination: true,
    //     takeScreenshots: true,
    //     takeScreenshotsOnlyOnFailures: false,
    //     fileNameDateSuffix: true,
    //     consolidateAll: true
    //   }));

    jasmine.getEnv().addReporter(
      new JasmineConsoleReporter({
        colors: 1,           // (0|false)|(1|true)|2
        cleanStack: 1,       // (0|false)|(1|true)|2|3
        verbosity: 4,        // (0|false)|1|2|(3|true)|4
        listStyle: 'indent', // "flat"|"indent"
        activity: false
    }));
     
  },

  jasmineNodeOpts: {
    showColors: true,
    includeStackTrace : true,
    isVerbose : true,
    defaultTimeoutInterval: 2500000
  }
  
};