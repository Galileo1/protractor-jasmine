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
  baseUrl: 'https://devpreview:Equinox1!@qa-maintenance.blinkfitness.com/', 
  suites: {
    login: ['./specs/**/BlinkLogin.spec.js'],
    checkout: ['../specs/**/BlinkCheckoutErrors.spec.js'],
    registration: ['../specs/**/BlinkRegistrationErrors.spec.js']
  },
  multiCapabilities: [{
    'os' : 'OS X',
    'os_version' : 'High Sierra',
    'browserName' : 'Chrome',
    'browser_version' : '64.0',
    'browserstack.user' : 'gaurvar1',
    'browserstack.key' : 'PsusBqV4g5N8uVbh8Fsp',
    name: "ios-chrome-tests"
}, {
    'browserstack.user': 'gaurvar1',
    'browserstack.key': 'PsusBqV4g5N8uVbh8Fsp',
    'os' : 'Windows',
    'os_version' : '10',
    'browserName' : 'Firefox',
    'browser_version' : '58.0',
    'acceptSslCerts': true,
    'acceptInsecureCerts': true,
    name: "win-firefox-tests"
}], 
  onPrepare: () => {
    browser.manage().window().maximize();
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