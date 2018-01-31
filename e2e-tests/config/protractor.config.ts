import { browser, Config } from 'protractor';
import {timeout} from './constants';
import {SpecReporter} from 'jasmine-spec-reporter';
import reporter = require('../../helpers/Reporter');
import * as  Jasmine2HtmlReporter from 'protractor-jasmine2-html-reporter';
const JasmineConsoleReporter = require('jasmine-console-reporter');


export let config: Config = {
  allScriptsTimeout: 50000,
  getPageTimeout: 50000,
  baseUrl: 'https://devpreview:Equinox1!@qa-maintenance.blinkfitness.com/',
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
  //baseUrl: 'https://blinkfitness.com/',
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
  }],  
  onPrepare: () => {
    browser.manage().window().maximize();
    browser.manage().timeouts().implicitlyWait(timeout.IMPLICIT);
    browser.ignoreSynchronization = true;
    browser.waitForAngularEnabled(false);
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