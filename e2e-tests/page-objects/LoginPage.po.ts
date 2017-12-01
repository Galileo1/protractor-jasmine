import { browser, by, element, ElementFinder } from 'protractor';
import { BasePage } from './BasePage.po';
// import { BasePage } from './BasePage.po';

export class LoginPage extends BasePage {

    private emailToasterContent: ElementFinder;
    private passwordToasterContent: ElementFinder;    
    private forgottenPassword: ElementFinder;
    private submitLogin: ElementFinder;
    private password: ElementFinder;
    private registerNow: ElementFinder;
    private loginModalRegisterNow : ElementFinder;
    private email: ElementFinder;
    private verticalMotors: ElementFinder;

    constructor () {        
        super();
        this.loginModalRegisterNow = element(by.css('[class="register-link"]:nth-child(1)'));
        this.registerNow = element(by.css('[class="login-modal__header"] [class="register-link"]'));
        this.email = element(by.css('[name="loginForm.form"] [name="email"]'));
        this.password = element(by.css('[name="loginForm.form"] [name="password"]'));
        this.submitLogin = element(by.buttonText("Log in"));
        this.forgottenPassword = element(by.linkText(" Forgotten password? "))
        this.emailToasterContent = element(by.css('[class="o-box-toaster__content"] > span'));
        this.passwordToasterContent = element(by.css('[class="o-box-toaster__content"] > p'));
    }

    // get (url : string) {
    //     browser.get(url);        
    // }

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

    // quitBrowser() {
    //     return browser.quit();
    // }

}