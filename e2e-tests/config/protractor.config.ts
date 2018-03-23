import { browser, Config } from 'protractor';
import {timeout} from './constants';
import {SpecReporter} from 'jasmine-spec-reporter';
import reporter = require('../../helpers/Reporter');
import * as  Jasmine2HtmlReporter from 'protractor-jasmine2-html-reporter';


export let config: Config = {
 
  //seleniumAddress: 'http://localhost:4444/wd/hub',
  seleniumAddress: 'http://selen-publi-bwo9chb30o4l-1679094142.us-east-1.elb.amazonaws.com:4444/wd/hub',
  //specs: [ '../specs/**/*.spec.js' ],
  //specs: [ '../specs/**/Blinkregistration.spec.js' ],
  //specs: [ '../specs/**/NavToRegisterationPage.spec.js' ],
  //seleniumArgs: ['-Dwebdriver.ie.driver=../../node_modules/protractor/node_modules/webdriver-manager/IEDriverServer3.7.0.exe'],
  //geckoDriver: '../../node_modules/protractor/node_modules/webdriver-manager/geckodriver-v0.19.1.exe',
  allScriptsTimeout: 50000,
  getPageTimeout: 50000,
  //baseUrl: 'https://qa-maintenance.blinkfitness.com/',
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
// suites: {
//   login: ['../specs/**/BlinkLogin.spec.js'],
//   checkout: ['../specs/**/BlinkCheckoutErrors.spec.js'],
//   registration: ['../specs/**/BlinkRegistrationErrors.spec.js']
// },
  
  multiCapabilities: [
    {
      browserName: 'chrome',
      specs: ['../specs/**/BlinkRegistrationErrors.spec.js'],
      //specs: [ '../specs/**/BlinkCheckoutErrors.spec.js','../specs/**/BlinkLogin.spec.js', '../specs/**/BlinkRegistrationErrors.spec.js'],
      chromeOptions : {
        //args : ['--no-proxy-server', "--headless", "--disable-gpu"]
        args :['--start-maximized', '--no-proxy-server', "--headless", "--disable-gpu"]
      }
    }
    // }
    // }, {
    //   browserName: 'chrome',
    //     'chromeOptions': {
    //         'mobileEmulation': {
    //             'deviceName': 'Nexus 6P'
    //     }
    //   },
    //   //specs: [ '../specs/**/NavToRegisterationPage.spec.js', '../specs/**/BlinkRegisterationErrors.spec.js' ,'../specs/**/BlinkLogin.spec.js'],
    //   specs: [ '../specs/**/BlinkLogin.spec.js', '../specs/**/BlinkRegisterationErrors.spec.js'],
    // }
    
    // {    
    //   browserName : 'firefox',
    //   'acceptSslCerts': true,
    //   'acceptInsecureCerts': true,
    //    specs: [ '../specs/**/BlinkRegistrationErrors.spec.js'],
       
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
    //browser.manage().window().maximize();
    browser.manage().timeouts().implicitlyWait(timeout.IMPLICIT);
    browser.ignoreSynchronization = true;
    browser.waitForAngularEnabled(false);

    //custom reporter
    jasmine.getEnv().addReporter(
      new Jasmine2HtmlReporter({
        savePath: './reports',
        cleanDestination: true,
        takeScreenshots: true,
        takeScreenshotsOnlyOnFailures: false,
        fileNameDateSuffix: true,
        consolidateAll: true
      }));
     
  },

  jasmineNodeOpts: {
    showColors: true,
    includeStackTrace : true,
    isVerbose : true,
    defaultTimeoutInterval: 2500000
  }
  
};