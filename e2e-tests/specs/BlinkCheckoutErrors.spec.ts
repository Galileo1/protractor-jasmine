/* 
    page object imports
**/
import { BlinkHomePage } from '../page-objects/BlinkHomePage.po';
import { LocationsPage } from '../page-objects/LocationsPage.po';
import { CheckoutPage } from '../page-objects/CheckoutPage.po';
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
import * as data from '../../../data/checkoutPageErrors.json';

describe('Blink checkout page errors', () => {

    let homePage : BlinkHomePage = new BlinkHomePage();
    let locationsPage : LocationsPage = new LocationsPage();
    let checkoutPage : CheckoutPage = new CheckoutPage();

    /* 
        hooks 
    **/
    beforeAll(() => {
        homePage.goto('join/boerum-hill/green?icmp=Join_Now_Desription');
        checkoutPage.waitForCheckoutPageToBeLoaded();
    });
    /*
        - specs  
        - data driven 
    **/
    using(data, (data, description) => {
        it (description, () => {
            checkoutPage.enterBasicDetailsOnCheckoutPage(data);
            // checkoutPage.enterFirstName((<any>data).firstName);
            // checkoutPage.enterLastName((<any>data).lastName);
            // checkoutPage.enterAddress1((<any>data).address);
            // checkoutPage.enterAccountCity((<any>data).city);
            // checkoutPage.selectAccountState((<any>data).state);
            // checkoutPage.enterAccountZipCode((<any>data).zipCode);
            // checkoutPage.enterAccountPhone((<any>data).phoneNumber);
            // checkoutPage.enterAccountEmail((<any>data).email);
            // checkoutPage.confirmYourEmailId((<any>data).emailConfirm);
            // checkoutPage.enterAccountDOB((<any>data).dob);
            // checkoutPage.selectYourGender((<any>data).gender);
            // checkoutPage.submitBasicDetails();
            let actualErrors = checkoutPage.getErrors().then((resultArray) => resultArray);
            expect<any>(actualErrors).toEqual((<any>data).expectedError);
        });
    });

});
