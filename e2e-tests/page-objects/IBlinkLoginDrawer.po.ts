import { ElementFinder, element, by, ElementArrayFinder, browser, ExpectedConditions } from 'protractor';
import { timeout } from '../config/constants';
import { BlinkHomePage } from './BlinkHomePage.po';
import { waitForElementToBeVisible, waitForElementToBeInVisible, waitForElementToDisappear } from '../../helpers/WaitHelpers';
import * as BBPromise from 'Bluebird';
import { BasePage } from './BasePage.po';
import '../../helpers/ElementExtend';
import '../../helpers/ExpectedConditionExtend';
import { protractor } from 'protractor/built/ptor';

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
    private registerContainer: ElementFinder;
    private registrationFormLastName: ElementFinder;
    private registrationFormEmail: ElementFinder;
    private registrationFormConfirmEmail: ElementFinder;
    private registrationFormPassword: ElementFinder;
    private registrationFormConfirmPassword: ElementFinder;
    private registrationFormMemberBarcode: ElementFinder;
    private registrationFormSubmitButton: ElementFinder;
    private registrationFormErrorSet: ElementArrayFinder;
    private otherErrorMessages: ElementFinder;
    private registrationFormMemberBarcodeErrorSet: ElementFinder;
    private registrationFormConfirmPasswordErrorSet2: ElementFinder;
    private registrationFormConfirmPasswordErrorSet1: ElementFinder;
    private registrationFormPasswordErrorSet: ElementFinder;
    private registrationFormConfirmEmailErrorSet: ElementFinder;
    private registrationFormEmailErrorSet: ElementFinder;
    private registrationFormLastNameErrorSet: ElementFinder;

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

        this.registerContainer = element(by.css('aside.side-bar-right.open.register'));
        this.registrationFormLastName = element(by.css('form.register-form input#lastName'));
        this.registrationFormLastNameErrorSet = element(by.css('form.register-form div.lastName div.error-set p'));
        this.registrationFormEmail = element(by.css('form.register-form input#emailAddress'));
        this.registrationFormEmailErrorSet = element(by.css('form.register-form div.email:nth-child(2) div.error-set p'));
        this.registrationFormConfirmEmail = element(by.css('form.register-form input#emailAddressConfirm'));
        this.registrationFormConfirmEmailErrorSet = element(by.css('form.register-form div.email:nth-child(3) div.error-set p'));
        this.registrationFormPassword = element(by.css('form.register-form input#password'));
        this.registrationFormPasswordErrorSet = element(by.css('form.register-form div.password:nth-child(4)  div.error-set p'));
        this.registrationFormConfirmPassword = element(by.css('form.register-form input#password2'));
        this.registrationFormConfirmPasswordErrorSet1 = element(by.css('form.register-form div.password:nth-child(5)  div.error-set p:nth-child(1)'));
        this.registrationFormConfirmPasswordErrorSet2 = element(by.css('form.register-form div.password:nth-child(5)  div.error-set p:nth-child(2)'));
        this.registrationFormMemberBarcode = element(by.css('form.register-form input#barcode'));
        this.registrationFormMemberBarcodeErrorSet = element(by.css('form.register-form div.barcode-container  div.error-set p'));
        this.registrationFormSubmitButton = element(by.css('div.register-form a.round-button.register-btn.right-pannel-button'));
        this.registrationFormErrorSet = element.all(by.css('div.register-form div.error-set p'));
        this.otherErrorMessages = element(by.css('form.register-form div#messages'));
    }

    enterLoginEmail(emailId: string) {
        return this.loginFormEmailField.sendText(emailId);
    }

    enterLoginPassword(password: string) {
        return this.loginFormPasswordField.sendText(password);
    }

    submitLoginForm() {
        return this.loginFormSubmitButton.safeClick();
    }

    /**
     * login into iBlink with the expectation to see an error 
     * 
     */
    attemptTologinIntoBlink(emailId: string, password:string) {
        this.isRightDrawerOpen().then((isOpen: boolean) => {
            if(isOpen) {
                this.enterLoginEmail(emailId)
                .then(() => this.enterLoginPassword(password))
                .then(() => this.submitLoginForm())
                .then(() => this.waitUntilErrorAppears());
            }
        });
    }

    /**
     * login into iBlink with the expectation to see success
     */
    loginIntoBlink(emailId: string, password:string) {
        this.isRightDrawerOpen().then((isOpen: boolean) => {
            if(isOpen) {
                this.enterLoginEmail(emailId)
                .then(() => this.enterLoginPassword(password))
                .then(() => this.submitLoginForm())
                .then(() => this.waitUntilSuccessfulLogin());
            }
        });
    }

    /**
     * checks whether right login drawer
     * 
     * @returns {promise.Promise<void>} returns a promise the resolves to nothing but can be chained
     */
    isRightDrawerOpen() {
        return waitForElementToBeVisible(this.rightDrawerOpen, timeout.IMPLICIT);
    }

    /**
     * closes the right login drawer
     * 
     * @returns {promise.Promise<void>} returns a promise the resolves to nothing but can be chained
     */
    closeTheRightDrawer() {
        let drawerIsOpen = this.isRightDrawerOpen().then((isOpen) => isOpen);
        if (drawerIsOpen) {
            return this.closeRightDrawer.safeClick();
        }
    }

    /**
     * creates an array of all the errors visible in the right login drawer.
     * 
     * @returns {promise.Promise<[]>} returns a promise that resolves in an array of error messages.
     */
    getErrors() {
        return this.loginFormErrorSet.map((element) => element.getText());
    }

    waitUntilErrorAppears() {
        let lengthOfEmailErrorSet = ExpectedConditions.hasSomeText(this.loginFormEmailErrorSet);
        let lengthOfPasswordErrorSet = ExpectedConditions.hasSomeText(this.loginFormPasswordErrorSet);
        browser.wait(ExpectedConditions.or(lengthOfEmailErrorSet, lengthOfPasswordErrorSet), timeout.LONG);
    }

    waitUntilSuccessfulLogin() {
        let loaderImageIsInvisible = ExpectedConditions.invisibilityOf(this.loginFormEmailErrorSet);
        let iblinkHomePageUrlIsDisplayed = ExpectedConditions.urlContains('iBlink/Home');
        let iblinkAccountPage = ExpectedConditions.titleContains('Accounts Page');
        browser.wait(ExpectedConditions.and(loaderImageIsInvisible, iblinkHomePageUrlIsDisplayed, iblinkAccountPage), timeout.VERYLONG_TIMEOUT);
    }

    //Register Block

    openRegistrationForm() {
        this.registerButton.safeClick().then(() => 
            browser.wait(ExpectedConditions.visibilityOf(this.registerContainer), timeout.SHORT)             
        )
    }

    enterLastNameToRegister(lastName: string) {
        return this.registrationFormLastName.sendText(lastName);
    }

    enterEmailToRegister(email: string) {
        return this.registrationFormEmail.sendText(email);
    }

    enterConfirmEmailToRegister(confirmEmail: string) {
        return this.registrationFormConfirmEmail.sendText(confirmEmail);
    }
    
    enterPasswordToRegister(password: string) {
        return this.registrationFormPassword.sendText(password);
    }

    enterConfirmPasswordToRegister(confirmPassword: string) {
        return this.registrationFormConfirmPassword.sendText(confirmPassword);
    }

    enterMemberBarcodeToRegister(barcode: string) {
        return this.registrationFormMemberBarcode.sendText(barcode);
    }

    submitRegistrationForm() {
        return this.registrationFormSubmitButton.safeClick();
    }

    getAllRegistrationErrors() {
        return this.registrationFormErrorSet.map((element) => element.getText());
    }

    resetAllRegistrationErrorFields() {
        return this.registrationFormErrorSet.filter((eachErrorfield)=> {
            return eachErrorfield.getAttribute('class').then((classValue)=> {
                return classValue.indexOf('show') > -1
            })
        }).each((element, index) => {
            element.getAttribute('class').then((attrib)=> {
                console.log(`attrb: ${attrib}`)
                attrib = attrib.replace('show', '');
                console.log(`after replace  attribute: ${attrib}`)
                browser.executeScript('arguments[0].class="' + attrib + '"', element);
                element.getAttribute('class').then((at)=> console.log(`attrb now: ${at}`))
            })
 
        })
    }

    resetMessages() {
        let message = element(by.css('form.register-form div#messages p'));
        return browser.wait(ExpectedConditions.hasSomeText(message), timeout.SHORT)
         .then(()=> {
            message.getAttribute('class').then((attribu)=> {
                console.log(`attrbu: ${attribu}`)
                console.log(`message 112212w::::::::`)
                if (attribu == 'show') {                    
                    attribu = attribu.replace('show', '');
                    console.log(`after replace  attribute: ${attribu}`)
                    browser.executeScript('arguments[0].class="' + attribu + '"', message.getWebElement());
                    message.getAttribute('class').then((attri)=> console.log(`after attribute: ${attri}`));
                    }
                })
         },(error)=> console.log(`attribute : ${error}`));   
    }

    attemptToRegisterIntoIBlink(data: any) {
        // return this.resetAllRegistrationErrorFields()
        // .then(()=> this.resetMessages())
        return this.enterLastNameToRegister((<any>data).lastName)
        .then(()=> this.enterLastNameToRegister((<any>data).lastName))
        .then(()=> this.enterEmailToRegister((<any>data).email))
        .then(()=> this.enterConfirmEmailToRegister((<any>data).confirmEmail))
        .then(()=> this.enterPasswordToRegister((<any>data).password))
        .then(()=> this.enterConfirmPasswordToRegister((<any>data).confirmPassword))
        .then(()=> this.enterMemberBarcodeToRegister((<any>data).memberBarcode))
        .then(()=> this.submitRegistrationForm())
        .then(()=> this.waitUntilRegistrationErrorAppears((<any>data).expectedErrorField, (<any>data).expectedError));
    }

    waitUntilRegistrationErrorAppears(field: string, errorMessage: Array<string>) {
        //console.log(`field : ${(field.toString())}, message : ${(errorMessage[0].toString())}`)
        let errorField = element(by.css(field.toString()));
        let expectedErrorMessage = errorMessage[0];
        let loaderImageIsInvisible = ExpectedConditions.invisibilityOf(this.loginFormEmailErrorSet);
        let expectedErrorToAppear = ExpectedConditions.textToBePresentInElement(errorField, expectedErrorMessage);
        browser.wait(ExpectedConditions.and(loaderImageIsInvisible, expectedErrorToAppear), timeout.LONG);
    }

}

function successMessage() {
    console.log(`loader image is invisible.`);
}

function errorMessage() {
    console.log(`loader image is still there`);
}

