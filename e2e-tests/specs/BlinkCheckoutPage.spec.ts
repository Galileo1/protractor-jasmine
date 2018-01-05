/* 
    page object imports
**/
import { BlinkHomePage } from '../page-objects/BlinkHomePage.po';
import { LocationsPage } from '../page-objects/LocationsPage.po';
import { CheckoutPage } from '../page-objects/CheckoutPage.po';
import { BridgePage } from '../page-objects/BridgePage.po';
import { IBlinkPage } from '../page-objects/IBlinkPage.po';
var using = require('jasmine-data-provider');

/*
    protractor imports 
**/
import { browser, by, ExpectedConditions, element } from 'protractor';

/*
    constant and data imports 
**/
import  constants from '../config/constants';
import * as data from '../../../data/checkoutPageSuccess.json';
import { WebElementWrapper } from '../../helpers/WebElementWrapper';



describe('Blink checkout page', () => {    

    var homePage : BlinkHomePage = new BlinkHomePage();
    var locationsPage : LocationsPage = new LocationsPage();
    var checkoutPage : CheckoutPage = new CheckoutPage();
    var bridgePage : BridgePage = new BridgePage();
    var iBlinkPage : IBlinkPage = new IBlinkPage();
    var emailId;

   /* 
        hooks 
    **/
    // beforeAll(() => {
    //     homePage.goto('locations');
    //     //checkoutPage.waitForCheckoutPageToBeLoaded();
    // })

    // afterEach(()=> {
    //     checkoutPage.resetFormFields();
    // })

    // afterAll(() => {
    //     homePage.resetBrowserSession();
    // });

    /*
        - specs  
        - data driven 
    **/
    using(data, function(data, description) {
        it (description, () => {

            /**
             * local variables 
             */
            let membership = (<any>data).lastName;
            let clubId = (<any>data).clubId;
            emailId = WebElementWrapper.generateEmail(membership, clubId);
            console.log(`created membership with last name : ${membership} for club ${clubId} with email: ${emailId}`);

            /**
             * steps
            */
            homePage.goto((<any>data).url)
            checkoutPage.waitForCheckoutPageToBeLoaded();
  
            checkoutPage.enterFirstName((<any>data).firstName);
            checkoutPage.enterLastName((<any>data).lastName);
            checkoutPage.enterAddress1((<any>data).address);
            checkoutPage.enterAccountCity((<any>data).city);
            checkoutPage.selectAccountState((<any>data).state);         
            checkoutPage.enterAccountZipCode((<any>data).zipCode);
            checkoutPage.enterAccountPhone((<any>data).phoneNumber);
            checkoutPage.enterAccountEmail(emailId);
            checkoutPage.confirmYourEmailId(emailId);
            checkoutPage.enterAccountDOB((<any>data).dob);
            checkoutPage.selectYourGender((<any>data).gender);
            checkoutPage.submitSubscription();
            checkoutPage.enterPaymentInformation();
            checkoutPage.completeThePurchase();
            expect<any>(bridgePage.emailFieldIsDisplayed()).toEqual(true);
            expect<any>(bridgePage.getPageUrl()).toContain('Bridge');
            //expect<any>(bridgePage.getEmailfromBridgePage()).toEqual(emailId);
            expect<any>(bridgePage.waitForBridgePageToBeLoaded()).toBeTruthy();
            browser.pause();
            bridgePage.setNewPassword();
            bridgePage.setConfirmPassword();
            bridgePage.processCreateAccount(); 
            expect<any>(iBlinkPage.iBlinkPageIsDisplayed()).toEqual(true);
        });
    });

    function enterBasicInformation() {
        checkoutPage.enterFirstName((<any>data).firstName);
        checkoutPage.enterLastName((<any>data).lastName);
        checkoutPage.enterAddress1((<any>data).address);
        checkoutPage.enterAccountCity((<any>data).city);
        checkoutPage.selectAccountState((<any>data).state);
        checkoutPage.enterAccountZipCode((<any>data).zipCode);
        checkoutPage.enterAccountPhone((<any>data).phoneNumber);
        checkoutPage.enterAccountEmail(emailId);
        checkoutPage.confirmYourEmailId(emailId);
        checkoutPage.enterAccountDOB((<any>data).dob);
        checkoutPage.selectYourGender((<any>data).gender);
    }

})
