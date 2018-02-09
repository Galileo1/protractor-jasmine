/* 
    page object imports
**/
import { BlinkHomePage } from '../page-objects/BlinkHomePage.po';
import { LocationsPage } from '../page-objects/LocationsPage.po';
import { CheckoutPage } from '../page-objects/CheckoutPage.po';
import { BridgePage } from '../page-objects/BridgePage.po';
/*
    protractor imports 
**/
import { browser, by, ExpectedConditions, element } from 'protractor';
/*
    utility
**/
const using = require('jasmine-data-provider');
/*
    constant and data imports 
**/
import  constants from '../config/constants';
import * as data from '../../../data/membershipPurchase.json';
import { WebElementWrapper } from '../../helpers/WebElementWrapper';
import { IBlinkAccountPage } from '../page-objects/IBlinkAccountPage.po';

describe('Blink checkout page', () => {    

    var homePage : BlinkHomePage = new BlinkHomePage();
    var locationsPage : LocationsPage = new LocationsPage();
    var checkoutPage : CheckoutPage = new CheckoutPage();
    var bridgePage : BridgePage = new BridgePage();
    var iblinkAccountPage : IBlinkAccountPage = new IBlinkAccountPage();
  

    // var iBlinkPage : IBlinkPage = new IBlinkPage();
    var emailId;


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
            (<any>data).email = emailId;
            (<any>data).emailConfirm = emailId;
            console.log(`creating membership with last name : ${membership} for club ${clubId} with email: ${emailId}`);

            /**
             * steps
            */
            homePage.goto((<any>data).url)
           
            checkoutPage.enterBasicDetailsOnCheckoutPage(data)
            .then(()=> checkoutPage.enterPaymentInformation())
            .then(()=> checkoutPage.completeThePurchase());
            if ((<any>data).clubs != 'PresaleClub') {
                bridgePage.waitForBridgePageToBeLoaded()
                .then(()=> bridgePage.completeRegistrationOnBridgePage());

                expect<any>(iblinkAccountPage.weAreOnIBlinkAccountPage()).toBeTruthy();
            } else {
                expect<any>(bridgePage.getPageUrl()).toContain((<any>data).clubs);
            }
            
            //expect<any>(bridgePage.emailFieldIsDisplayed()).toEqual(true);
            //expect<any>(bridgePage.getPageUrl()).toContain((<any>data).clubs);
            //expect<any>(bridgePage.waitForBridgePageToBeLoaded()).toBeTruthy();
            
            // bridgePage.setNewPassword();
            // bridgePage.setConfirmPassword();
            // bridgePage.processCreateAccount(); 
            // expect<any>(iBlinkPage.iBlinkPageIsDisplayed()).toEqual(true);
        });
    });


})
