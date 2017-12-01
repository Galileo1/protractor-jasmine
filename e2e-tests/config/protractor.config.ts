import { browser, Config } from 'protractor';
import {SpecReporter} from "jasmine-spec-reporter";
import reporter = require('../../helpers/Reporter');
// import { chai } from 'chai';
// import { chaiAsPromised } from 'chai-as-promised';

export let config: Config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  //seleniumAddress: 'http://127.0.0.1:4723/wd/hub',
  //specs: [ '../specs/**/*.spec.js' ],
  //specs: [ '../specs/**/Blinkregistration.spec.js' ],
  //specs: [ '../specs/**/NavToRegisterationPage.spec.js' ],
  //seleniumArgs: ['-Dwebdriver.ie.driver=../../node_modules/protractor/node_modules/webdriver-manager/IEDriverServer3.7.0.exe'],
  //geckoDriver: '../../node_modules/protractor/node_modules/webdriver-manager/geckodriver-v0.19.1.exe',
  allScriptsTimeout: 50000,
  getPageTimeout: 50000,  
  baseUrl: "https://www.blinkfitness.com/",
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
  multiCapabilities: [
    
    // {    
    //   browserName : 'firefox',
    //   'acceptSslCerts': true,
    //   'acceptInsecureCerts': true,
    //    specs: [ '../specs/**/NavToRegisterationPage.spec.js', '../specs/**/BlinkRegisterationErrors.spec.js'],
    // }, 
    // {
    //   browserName: 'chrome' ,
    //   specs: [ '../specs/**/NavToRegisterationPage.spec.js', '../specs/**/BlinkRegisterationErrors.spec.js' ],
    //   //  shardTestFiles: true,
    //   //  count : 2
    // },
  //  chromeOptions: {
  //   args: [ "--headless", "--disable-gpu"]
  // }

    { 
        browserName: 'chrome',
        'chromeOptions': {
            'mobileEmulation': {
                'deviceName': 'Nexus 6P'
            }
        },
        specs: [ '../specs/**/BlinkregistrationErrorDevices.spec.js' ],
    },

    // {
    //    browserName: 'chrome',      
    //   'platformName': 'Android',
    //   'platformVersion': '5.1',
    //   'deviceName': 'XT1033',
    //   specs: [ '../specs/**/NavToRegistrationPageUsingDevices.spec.js' ],
    // }    
  
  
  ],
  //maxInstances: 2,
  onPrepare: () => {
    browser.manage().window().maximize();
    browser.manage().timeouts().implicitlyWait(5000); 
    //browser.ignoreSynchronization = true;   
    browser.waitForAngularEnabled(false);

    //custom reporter
    jasmine.getEnv().addReporter(reporter);
     
  },

  jasmineNodeOpts: {
    showColors: true,    
    includeStackTrace : true,
    isVerbose : true,
    defaultTimeoutInterval: 2500000
  }
  
};


