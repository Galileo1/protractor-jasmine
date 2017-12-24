import { browser, Config } from 'protractor';
import {SpecReporter} from "jasmine-spec-reporter";
import reporter = require('../../helpers/Reporter');
import * as  Jasmine2HtmlReporter from 'protractor-jasmine2-html-reporter';


export let config: Config = {
  //seleniumAddress: 'http://localhost:4444/wd/hub',
  //seleniumAddress: 'http://127.0.0.1:4723/wd/hub',
  //specs: [ '../specs/**/*.spec.js' ],
  //specs: [ '../specs/**/Blinkregistration.spec.js' ],
  //specs: [ '../specs/**/NavToRegisterationPage.spec.js' ],
  //seleniumArgs: ['-Dwebdriver.ie.driver=../../node_modules/protractor/node_modules/webdriver-manager/IEDriverServer3.7.0.exe'],
  //geckoDriver: '../../node_modules/protractor/node_modules/webdriver-manager/geckodriver-v0.19.1.exe',
  framework: 'jasmine',
  allScriptsTimeout: 50000,
  getPageTimeout: 50000,  
  baseUrl: "https://devpreview:Equinox1!@qa-leela.blinkfitness.com/",
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
    {
      browserName: 'chrome' ,      
      //specs: [ '../specs/**/NavToRegisterationPage.spec.js', '../specs/**/BlinkRegisterationErrors.spec.js' ],
      specs: [ '../specs/**/NavToRegisterationPage.spec.js' ],
      // chromeOptions : { 
      //   prefs:  { 
      //     'profile.managed_default_content_settings.images': 2
      //   }
      // }



      //  shardTestFiles: true,
      //  count : 2
    },
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
    //     specs: [ '../specs/**/NavToRegistrationPageUsingDevices.spec.js' ,'../specs/**/BlinkRegisterationErrors.spec.js' ],
    // }
  ],
  //maxInstances: 2,
  
  onPrepare: () => {
    browser.manage().window().maximize();
    browser.manage().timeouts().implicitlyWait(5000); 
    //browser.ignoreSynchronization = true;   
    browser.waitForAngularEnabled(false);

    //custom reporter
    jasmine.getEnv().addReporter(
      new Jasmine2HtmlReporter({
        savePath: './reports',
        takeScreenshots: true,
        takeScreenshotsOnlyOnFailures: true,
        fileNameDateSuffix: true
      })
    
    );
     
  },

  jasmineNodeOpts: {
    showColors: true,    
    includeStackTrace : true,
    isVerbose : true,
    defaultTimeoutInterval: 2500000
  }
  
};


