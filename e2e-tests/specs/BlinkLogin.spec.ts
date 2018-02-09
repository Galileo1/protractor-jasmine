/* 
    page object imports
**/
import { BlinkHomePage } from '../page-objects/BlinkHomePage.po';
import { LocationsPage } from '../page-objects/LocationsPage.po';
import { CheckoutPage } from '../page-objects/CheckoutPage.po';
import { IBlinkLoginDrawer } from '../page-objects/IBlinkLoginDrawer.po';
import { IBlinkAccountPage } from '../page-objects/IBlinkAccountPage.po';
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
import * as data from '../../../data/loginErrors.json';
import { WebElementWrapper } from '../../helpers/WebElementWrapper';


describe('IBlink Login', () => {

    let locationsPage : LocationsPage = new LocationsPage();
    let checkoutPage : CheckoutPage = new CheckoutPage();
    let iblinkLoginDrawer : IBlinkLoginDrawer = new IBlinkLoginDrawer();
    let iblinkAccountPage : IBlinkAccountPage = new IBlinkAccountPage();
    let blinkHomePage: BlinkHomePage = new BlinkHomePage();
   /* 
        hooks 
    **/
    beforeAll(() => {
        blinkHomePage.get();
        WebElementWrapper.waitForAnyPageToLoad();
        blinkHomePage.openMemberLoginDrawer();
    });

    /*
        - specs  
        - data driven 
    **/
    using(data, (data, description) => {
        it (description, () => {
            iblinkLoginDrawer.attemptTologinIntoBlink((<any>data).emailId, (<any>data).password);
            let actualErrors = iblinkLoginDrawer.getErrors().then((resultArray) => resultArray.filter((error) => error));
            
            expect<any>(actualErrors).toEqual((<any>data).expectedError);
        });
    });

    /**
     * this test cases has been commented after discussion with Nick. Since QA region is not stable. this can't be run against it.
     * We have resolved BLKW-6504 and created a new ticket to track the coverage for this.
     * 
     */
    // it('User should be able to login and logout into IBlink with correct email/password', () => {
    //     let emailId = '------';      //please enter the email id 
    //     let password = '------';     //please enter the password.

    //     //login
    //     iblinkLoginDrawer.loginIntoBlink(emailId, password);
    //     expect<any>(browser.getTitle()).toContain('Accounts Page');

    //     //logout
    //     iblinkAccountPage.logoutFromIblink();
    //     expect<any>(blinkHomePage.weAreOnBlinkHomePage()).toBeTruthy();
    // });

});
