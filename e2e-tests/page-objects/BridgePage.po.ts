import { browser, by, element, ElementFinder, ElementArrayFinder, Key , ExpectedConditions} from 'protractor';
import { BasePage } from './BasePage.po';
import { SelectWrapper } from '../../helpers/SelectWrapper';
import { WebElementWrapper } from '../../helpers/WebElementWrapper';
import { Helper } from '../../helpers/Helper';
import { WebElement } from 'selenium-webdriver';
import constants, { timeout } from '../config/constants';
// import { BasePage } from './BasePage.po';

export class BridgePage extends BasePage {     
       
    private emailAddress: ElementFinder;
    private newPassword : ElementFinder
    private confirmPassword : ElementFinder;
    private createAccount : ElementFinder;
    private emailAddField: string;
    //private loaderImage: ElementFinder;   
  
    constructor () {        
        super();
        this.emailAddress = element(by.css('input#emailAddr'));        
        this.newPassword = element(by.css('input#regnewpassword'));
        this.confirmPassword = element(by.css('input#regconfirmpassword'));
        this.createAccount = element(by.css('a.btn.block.thin.submit.orange.register.syncComplete.registerBridge'));
        this.emailAddField =  'input#emailAddr';
        //this.loaderImage = element(by.css('div.loader'));        
    }

    getEmailAddress() {
        this.emailAddress.getText().then((text) => {
            return text;
        })
    }

    setNewPassword() {
        Helper.waitForElement(this.newPassword, timeout.SHORT).sendKeys(constants.PASSWORD);
    }

    setConfirmPassword() {
        Helper.waitForElement(this.confirmPassword, timeout.SHORT).sendKeys(constants.PASSWORD);
    }

    processCreateAccount() {
        this.createAccount.click().then(()=> {
            return WebElementWrapper.waitUntilDisplayed(by.css('div.welcome-modal-content'), timeout.PURCHASE_TIMEOUT)
        })
        
    }

    isPresent() { 
        WebElementWrapper.findByCss(this.emailAddField);
    }

    getEmailfromBridgePage() {
        return this.emailAddress.getAttribute('value');
    }

    waitForBridgePageToBeLoaded() {
        return browser.wait(ExpectedConditions.invisibilityOf(this.loaderImage), timeout.PURCHASE_TIMEOUT);    
        
    }

    emailFieldIsDisplayed() {
        return WebElementWrapper.elementIsDisplayed(this.emailAddress);
    }

    getPageUrl() {
        return this.getCurrentUrl();
    }

}