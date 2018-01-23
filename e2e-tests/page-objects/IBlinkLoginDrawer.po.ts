import { ElementFinder, element, by, ElementArrayFinder, browser, ExpectedConditions } from 'protractor';
import { timeout } from '../config/constants';
import { BlinkHomePage } from './BlinkHomePage.po';
import { waitForElementToBeVisible, waitForElementToBeInVisible, waitForElementToDisappear } from '../../helpers/WaitHelpers';
import * as BBPromise from 'Bluebird';
import { BasePage } from './BasePage.po';
import '../../helpers/ElementExtend'
import '../../helpers/ExpectedConditionExtend'

export class IBlinkLoginDrawer extends BasePage {
    

    //Login form
    private loginFormEmailField : ElementFinder;
    private loginFormSubmitButton: ElementFinder;
    private loginFormPasswordField: ElementFinder;
    private loginFormErrorSet: ElementArrayFinder;
    private loginFormPasswordErrorSet: ElementFinder;
    private loginFormEmailErrorSet: ElementFinder;

    private forgotEmail: ElementFinder;
    private forgotPassword: ElementFinder;
    private registerButton: ElementFinder;

    //Forgot Email form
    private forgotEmailBarcodeField: ElementFinder;
    private forgotEmailErrorSet: ElementFinder;
    private forgotEmailSubmitButton: ElementFinder;

    //Forgot Password form
    private forgotPasswordEmailField: ElementFinder;
    private forgotPasswordErrorSet: ElementFinder;
    private forgotPasswordSubmitButton: ElementFinder;
    private forgotPasswordForgotEmail: ElementFinder;

    //close right drawer
    private closeRightDrawer: ElementFinder;
    private rightDrawerOpen: ElementFinder;
    private rightDrawerClosed: ElementFinder;

    //Registeration form
    private registrationFormLastName: ElementFinder;
    private registrationFormEmail: ElementFinder;
    private registrationFormConfirmEmail: ElementFinder;
    private registrationFormPassword: ElementFinder;
    private registrationFormConfirmPassword: ElementFinder;
    private registrationFormMemberBarcode: ElementFinder;
    private registrationFormSubmitButton: ElementFinder;
    private registrationFormErrorSet: ElementArrayFinder;

    private blinkHomePage: BlinkHomePage;

    constructor() {
        super();
        this.blinkHomePage = new BlinkHomePage();
        this.loginFormEmailField = element(by.css('form.login-form input#email'));
        this.loginFormPasswordField = element(by.css('form.login-form input#password'));
        this.loginFormSubmitButton = element(by.css('a.round-button.login-btn.right-pannel-button'));
        this.loginFormErrorSet = element.all(by.css('div.login-form div.error-set'));
        this.loginFormPasswordErrorSet = element(by.css('form.login-form div.password div.error-set > p'));
        this.loginFormEmailErrorSet = element(by.css('form.login-form div.email div.error-set > p'));
        
        this.forgotPassword = element(by.css('div.login-form a.btn.forgot-pw-btn'));
        this.registerButton = element(by.css('div.login-form a.register-btn'));

        this.forgotEmailBarcodeField = element(by.css('div.forgot-email-form input#barcode'));
        this.forgotEmailErrorSet = element(by.css('div.forgot-email-form div.error-set'));
        this.forgotEmailSubmitButton = element(by.css('div.forgot-email-form a.round-button'));

        this.forgotPasswordEmailField = element(by.css('div.forgot-password-form input#email'));
        this.forgotPasswordErrorSet = element(by.css('div.forgot-password-form div.error-set'));
        this.forgotPasswordSubmitButton = element(by.css('div.forgot-password-form a.round-button'));
        this.forgotPasswordForgotEmail = element(by.css('div.forgot-password-form a.btn.forgot-email-btn'));

        this.closeRightDrawer = element(by.css('aside.side-bar-right span'));
        this.rightDrawerClosed = element(by.css('aside.side-bar-right.closed'));
        this.rightDrawerOpen = element(by.css('aside.side-bar-right.open'));

        this.registrationFormLastName = element(by.css('form.register-form input#lastName'));
        this.registrationFormEmail = element(by.css('form.register-form input#emailAddress'));
        this.registrationFormConfirmEmail = element(by.css('form.register-form input#emailAddressConfirm'));
        this.registrationFormPassword = element(by.css('form.register-form input#password'));
        this.registrationFormConfirmPassword = element(by.css('form.register-form input#password2'));
        this.registrationFormMemberBarcode = element(by.css('form.register-form input#barcode'));
        this.registrationFormSubmitButton = element(by.css('div.register-form a.round-button.register-btn.right-pannel-button'));
        this.registrationFormErrorSet = element.all(by.css('div.register-form div.error-set'));


    }

    enterLoginEmail(emailId: string) {
        return this.loginFormEmailField.sendText(emailId);
    }

    enterLoginPassword(password: string) {
        return this.loginFormPasswordField.sendText(password);
    }

    submitLoginForm() {
        return this.loginFormSubmitButton.click();
    }

    loginIntoBlink(emailId: string, password:string) {
        this.isRightDrawerOpen().then((isOpen: boolean) => {
            if(isOpen) {
                this.enterLoginEmail(emailId)
                .then(() => this.enterLoginPassword(password))
                .then(() => this.submitLoginForm())
                .then(() => this.waitUntilErrorAppears());
            }
        });
    }

    isRightDrawerOpen() {       
        return waitForElementToBeVisible(this.rightDrawerOpen, timeout.IMPLICIT);   
    }

    // isRightDrawerClosed() {
    //     return Helper.not(this.rightDrawerOpen.isPresent());
    // }

    getErrors() {
        return this.loginFormErrorSet.map((element) => element.getText());
    }

    waitUntilErrorAppears() { 
        //browser.wait(ExpectedConditions.invisibilityOf(this.loaderImage), timeout.LONG);
        let lengthOfEmailErrorSet = ExpectedConditions.hasSomeText(this.loginFormEmailErrorSet);
        let lengthOfPasswordErrorSet = ExpectedConditions.hasSomeText(this.loginFormPasswordErrorSet);
        browser.wait(ExpectedConditions.or(lengthOfEmailErrorSet, lengthOfPasswordErrorSet), timeout.LONG);        
    }    
}

function enterloginDetails(emailId: string, password: string) {
     return this.enterLoginEmail(emailId)
    .then(() => this.enterLoginPassword(password))
    .then(() => this.submitLoginForm());     
}

function successMessage() {
    console.log(`loader image is invisible.`)
}

function errorMessage() {
    console.log(`loader image is still there`)
}