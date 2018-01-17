import { browser, Config } from 'protractor';
import { timeout } from './constants';
// import { chai } from 'chai';
// import { chaiAsPromised } from 'chai-as-promised';

export let config: Config = {
  //seleniumAddress: 'http://192.168.99.1:53178/wd/hub',
  seleniumAddress: 'http://127.0.0.1:4723/wd/hub',
  specs: [ '../specs/**/*.spec.js' ],
  allScriptsTimeout: 50000,
  getPageTimeout: 50000,
  baseUrl: 'https://preview.trademe.co.nz',
  multiCapabilities: [
    
    // {
    //     browserName: 'chrome'
    // },
    // {
    //     browserName: 'chrome',
    //     'chromeOptions': {
    //         'mobileEmulation': {
    //             'deviceName': 'Nexus 5'
    //         }
    //     }
    // },
    // {
    //     browserName: 'chrome',
    //     'chromeOptions': {
    //         'mobileEmulation': {
    //             'deviceName': 'iPhone 6'                
    //         }
    //     }
    // },
    {
      browserName: 'chrome',
      'platformName': 'Android',
      'platformVersion': '5.1',
      'deviceName': 'XT1033'
      
      // 'autoWebview' : true,
      // 'autoWebviewTimeout': 10000      
 
    }
  ],
  maxInstances: 2,
  onPrepare: () => {
    //browser.manage().window().maximize(); 
    browser.manage().timeouts().implicitlyWait(timeout.IMPLICIT);
    //browser.getProcessedConfig()
    // .then(function(config) {
    //   console.log(config.multiCapabilities);
    //   for (var i= 0; i < config.multiCapabilities.length; i++) {
    //       if (config.multiCapabilities[i].platformName == 'Android') {
    //         console.log(config.seleniumAddress);
    //         config.seleniumAddress = 'http://127.0.0.1:4723/wd/hub';
    //         console.log(config.seleniumAddress);
    //       } 
    //   }   
    // });
  },
  jasmineNodeOpts: {
    showColors: true,
    includeStackTrace : true,
    isVerbose : true,
    defaultTimeoutInterval: 2500000
  },
};