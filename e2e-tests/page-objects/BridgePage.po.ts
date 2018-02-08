import { browser, by, element, ElementFinder, ElementArrayFinder, Key , ExpectedConditions} from 'protractor';
import { BasePage } from './BasePage.po';
import { SelectWrapper } from '../../helpers/SelectWrapper';
import { WebElementWrapper } from '../../helpers/WebElementWrapper';
import constants, { timeout } from '../config/constants';

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
        return this.emailAddress.getText().then((text) => {
            return text;
        })
    }

    setNewPasswordOnBridgePage() {
        return this.newPassword.sendText(constants.PASSWORD);
    }

    setConfirmPasswordOnBridgePage() {
        return this.confirmPassword.sendText(constants.PASSWORD);
    }

    processCreateAccount() {
        return this.createAccount.safeClick().then(()=> {
            return WebElementWrapper.waitUntilDisplayed(by.css('div.welcome-modal-content'), timeout.VERYLONG_TIMEOUT)
        });        
    }

    completeRegistrationOnBridgePage() {
        return this.waitForBridgePageToBeLoaded()
        .then(()=> this.setNewPasswordOnBridgePage())
        .then(()=> this.setConfirmPasswordOnBridgePage())
        .then(()=> this.processCreateAccount());
    }

    getEmailfromBridgePage() {
        return this.emailAddress.getAttribute('value');
    }

    waitForEmailFieldToBeVisible() {
        return WebElementWrapper.waitUntilDisplayed(this.emailAddress, timeout.VERYLONG_TIMEOUT)
    }

    waitForBridgePageToBeLoaded() {
        let invisibilityOfLoaderImage = ExpectedConditions.invisibilityOf(this.loaderImage);
        let emailFieldIsVisible = ExpectedConditions.visibilityOf(this.emailAddress);
        return browser.wait(ExpectedConditions.and(invisibilityOfLoaderImage, emailFieldIsVisible), timeout.VERYLONG_TIMEOUT);
    }

    emailFieldIsDisplayed() {
        return this.emailAddress.isDisplayed().then((isDisplayed)=> isDisplayed)
    }

    getPageUrl() {
        return this.getCurrentUrl();
    }

}