import { browser, Config } from 'protractor';
import {timeout} from './constants';
import {SpecReporter} from 'jasmine-spec-reporter';
import reporter = require('../../helpers/Reporter');
import * as  Jasmine2HtmlReporter from 'protractor-jasmine2-html-reporter';


export let config: Config = {
  sauceUser: 'Galileo1',
  sauceKey: '245274fb-1924-4364-858c-49e09b012b69',
  allScriptsTimeout: 50000,
  getPageTimeout: 50000,
  baseUrl: 'https://devpreview:Equinox1!@qa-maintenance.blinkfitness.com/', 
  suites: {
    login: ['./specs/**/BlinkLogin.spec.js'],
    checkout: ['../specs/**/BlinkCheckoutErrors.spec.js'],
    registration: ['../specs/**/BlinkRegistrationErrors.spec.js']
  },
  multiCapabilities: [{
    browserName: 'firefox',
    version: 'latest',
    platform: 'OS X 10.10',
    name: "firefox-ios-tests",
    shardTestFiles: true,
    maxInstances: 2
}, {
    browserName: 'chrome',
    version: 'latest',
    platform: 'Windows 10',
    name: "chrome-tests",
    shardTestFiles: true,
    maxInstances: 2
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