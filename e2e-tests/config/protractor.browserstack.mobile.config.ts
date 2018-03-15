import { browser, Config } from 'protractor';
import {timeout} from './constants';
import {SpecReporter} from 'jasmine-spec-reporter';
import reporter = require('../../helpers/Reporter');
import * as  Jasmine2HtmlReporter from 'protractor-jasmine2-html-reporter';


export let config: Config = {
  seleniumAddress: 'http://hub-cloud.browserstack.com/wd/hub',

//   commonCapabilities: {
//     'browserstack.user': 'gaurvar1',
//     'browserstack.key': 'PsusBqV4g5N8uVbh8Fsp'
//   },

  allScriptsTimeout: 50000,
  getPageTimeout: 50000,
  baseUrl: 'https://blinkfitness.com/', 
  suites: {
    // login: ['./specs/**/BlinkLogin.spec.js'],
    checkout: ['../specs/**/BlinkCheckoutErrors.spec.js'],
    registration: ['../specs/**/BlinkRegistrationErrors.spec.js']
  },
  multiCapabilities: [{
    'device': 'iPhone X',
    'realMobile': 'true',
    'os_version': '11.0',
    'browserName' : 'Chrome',
    'browser_version' : '64.0',
    'browserstack.user' : 'varungaur1',
    'browserstack.key' : 'wshmP1GVhsxMUtepR62P',
    name: "ios-chrome-tests"
}], 
  onPrepare: () => {
    //browser.manage().window().maximize();
    browser.manage().timeouts().implicitlyWait(timeout.IMPLICIT);
    browser.ignoreSynchronization = true;
    browser.waitForAngularEnabled(false);
  },

  

  jasmineNodeOpts: {
    showColors: true,
    includeStackTrace : true,
    isVerbose : true,
    defaultTimeoutInterval: 2500000
  }
  
};