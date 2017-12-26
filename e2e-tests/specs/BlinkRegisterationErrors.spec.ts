/* 
    page object imports
**/
import { BlinkHomePage } from '../page-objects/BlinkHomePage.po';
import { LocationsPage } from '../page-objects/LocationsPage.po';
import { CheckoutPage } from '../page-objects/CheckoutPage.po';
var using = require('jasmine-data-provider');

/*
    protractor imports 
**/
import { browser, by, ExpectedConditions, element } from 'protractor';

/*
    constant and data imports 
**/
import  constants from '../config/constants';
import * as data from '../../../data/properties.json';

describe('Blink checkout page errors', () => {

    var homePage : BlinkHomePage = new BlinkHomePage();
    var locationsPage : LocationsPage = new LocationsPage();
    var checkoutPage : CheckoutPage = new CheckoutPage();
    
    //const expect = chai.expect;   


   /* 
        hooks 
    **/
    beforeAll(() => {
        homePage.goto('join/boerum-hill/green?icmp=Join_Now_Desription');
        checkoutPage.waitForCheckoutPageToBeLoaded();
    })

    afterEach(()=> {
        checkoutPage.resetFormFields();
    })

    afterAll(() => {
        homePage.resetBrowserSession();
    });

    /*
        - specs  
        - data driven 
    **/
    using(data, function(data, description) {
        it (description, () => {
            checkoutPage.enterFirstName((<any>data).firstName);
            checkoutPage.enterLastName((<any>data).lastName);
            checkoutPage.enterAddress1((<any>data).address);
            checkoutPage.enterAccountCity((<any>data).city);
            checkoutPage.selectAccountState((<any>data).state);         
            checkoutPage.enterAccountZipCode((<any>data).zipCode);
            checkoutPage.enterAccountPhone((<any>data).phoneNumber);
            checkoutPage.enterAccountEmail((<any>data).email);
            checkoutPage.confirmYourEmailId((<any>data).emailConfirm);
            checkoutPage.enterAccountDOB((<any>data).dob);
            checkoutPage.selectYourGender((<any>data).gender);
            checkoutPage.submitSubscription();
            let actualErrors = checkoutPage.getErrors().then((resultArray) => {
                return resultArray;
            });
            expect<any>(actualErrors).toEqual((<any>data).expectedError);
        });
    });

})
