import { browser, by, element, ElementFinder, ElementArrayFinder } from 'protractor';
import { BasePage } from './BasePage.po';
import { WebElementWrapper } from '../../helpers/WebElementWrapper';
// import { BasePage } from './BasePage.po';

export class BlinkHomePage extends BasePage {
    
    private locations: ElementArrayFinder;
    private navLocation : ElementFinder
    private mobLocation : ElementFinder
    private passwordToasterContent: ElementFinder;    
    private forgottenPassword: ElementFinder;
    private submitLogin: ElementFinder;
    private password: ElementFinder;
    private registerNow: ElementFinder;
    private loginModalRegisterNow : ElementFinder;
    private email: ElementFinder;
    private verticalMotors: ElementFinder;

    //mobile
    private mobileHamburger: ElementFinder;
    private mobileLocations: ElementFinder;

    constructor () {        
        super();
        this.locations = element.all(by.xpath('//span[@data-hover="Locations"]'));
        this.navLocation = element(by.css('div.nav-list:nth-child(2) > a:nth-child(2) > div:nth-child(1) > span:nth-child(1)'));
        
        this.mobileHamburger = element(by.css('.mobile-menu-open > span:nth-child(1)'));
        this.mobileLocations = element(by.css('a.locations:nth-child(1) > div:nth-child(1) > span:nth-child(1)'));

    }

    enterEmail(emailId: string) {
        return this.email.sendKeys(emailId); 
    }

    enterPassword(passwordId: string) {  
        return this.password.sendKeys(passwordId);   
    }

    submitLoginForm() {
        return this.submitLogin.click();
    }

    registerNowWithTradeMe() {
        return this.registerNow.click();
    }

    getToasterContent() {
        return this.passwordToasterContent.getText();
    }

    gotoLocations() {
        return this.navLocation.click().then (() => {
            return WebElementWrapper.waitForAnyPageToLoad();
        });
    }

    gotoLocationsUsingADevice() {
        return this.selectTheHamburgerMenu().then(() => {
            return this.navigateToLocationsOnDevices();
        });            
        
    }

    selectTheHamburgerMenu() {
        return WebElementWrapper.waitForElementToBeClickable(this.mobileHamburger);
    }

    navigateToLocationsOnDevices() {
        return WebElementWrapper.waitForElementToBeClickable(this.mobileLocations).then (() => {
            return WebElementWrapper.waitForAnyPageToLoad();
        });
    }

    get() {
        browser.get('/');
    }

    resetBrowserSession() {
        return this.quitBrowser();

    }

   

    // quitBrowser() {
    //     return browser.quit();   
    // }

}