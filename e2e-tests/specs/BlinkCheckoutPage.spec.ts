/* 
    page object imports
**/
import { BlinkHomePage } from '../page-objects/BlinkHomePage.po';
import { LocationsPage } from '../page-objects/LocationsPage.po';
import { JoinNow } from '../page-objects/JoinNow.po';
import { BridgePage } from '../page-objects/BridgePage.po';
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
    var checkoutPage : JoinNow = new JoinNow();
    var bridgePage : BridgePage = new BridgePage();

   /* 
        hooks 
    **/
    // beforeAll(() => {
    //     homePage.goto('join/boerum-hill/green?icmp=Join_Now_Desription');
    //     checkoutPage.waitForCheckoutPageToBeLoaded();
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
            let emailId = WebElementWrapper.generateEmail(membership, clubId);
            console.log("membership: " + membership + " club: " + clubId + " email: " + emailId);

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
            //expect<any>(actualErrors).toEqual((<any>data).expectedError);
            expect<any>(bridgePage.isPresent()).toBeTruthy();
        });
    });

})
