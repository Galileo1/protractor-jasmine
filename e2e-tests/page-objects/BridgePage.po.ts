import { browser, by, element, ElementFinder, ElementArrayFinder, Key , ExpectedConditions} from 'protractor';
import { BasePage } from './BasePage.po';
import { SelectWrapper } from '../../helpers/SelectWrapper';
import { WebElementWrapper } from '../../helpers/WebElementWrapper';
import { WebElement } from 'selenium-webdriver';
import constants from '../config/constants';
// import { BasePage } from './BasePage.po';

export class BridgePage extends BasePage {     
   
    private emailAddress: ElementFinder;
    private newPassword : ElementFinder
    private confirmPassword : ElementFinder;
    private createAccount : ElementFinder;
    private emailAddField: string;
  
    constructor () {        
        super();
        this.emailAddress = element(by.css('input#emailAddr'));        
        this.newPassword = element(by.css('input#regnewpassword'));
        this.confirmPassword = element(by.css('input#regconfirmpassword'));
        this.createAccount = element(by.css('a.btn.block.thin.submit.orange.register.syncComplete.registerBridge'));
        this.emailAddField =  'input#emailAddr';
        
    }

    getEmailAddress() {
        this.emailAddress.getText().then((text) => {
            return text;
        })
    }

    setNewPassword() {
        this.newPassword.sendKeys(constants.PASSWORD);
    }

    setConfirmPassword() {
        this.confirmPassword.sendKeys();
    }

    processCreateAccount() {
        this.createAccount.click();
    }

    isPresent() { 
        WebElementWrapper.findByCss(this.emailAddField);
    }


}