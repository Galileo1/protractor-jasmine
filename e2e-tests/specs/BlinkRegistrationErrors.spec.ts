/* 
    page object imports
**/
import { BlinkHomePage } from '../page-objects/BlinkHomePage.po';
import { LocationsPage } from '../page-objects/LocationsPage.po';
import { CheckoutPage } from '../page-objects/CheckoutPage.po';
const using = require('jasmine-data-provider');

/*
    protractor imports 
**/
import { browser, by, ExpectedConditions, element } from 'protractor';

/*
    constant and data imports 
**/
import  constants from '../config/constants';
import * as data from '../../../data/registrationErrors.json';
import { WebElementWrapper } from '../../helpers/WebElementWrapper';
import { IBlinkLoginDrawer } from '../page-objects/IBlinkLoginDrawer.po';
import { IBlinkAccountPage } from '../page-objects/IBlinkAccountPage.po';

describe('Blink login errors', () => {

    let homePage : BlinkHomePage = new BlinkHomePage();
    let locationsPage : LocationsPage = new LocationsPage();
    let checkoutPage : CheckoutPage = new CheckoutPage();
    let iblinkLoginDrawer : IBlinkLoginDrawer = new IBlinkLoginDrawer();
    let iblinkAccountPage : IBlinkAccountPage = new IBlinkAccountPage();
    let blinkHomePage: BlinkHomePage = new BlinkHomePage();
    
   /* 
        hooks 
    **/
    beforeAll(() => {
        homePage.get();
        WebElementWrapper.waitForAnyPageToLoad();
        homePage.openMemberLoginDrawer();
        iblinkLoginDrawer.openRegistrationForm();
    });

    // beforeEach(() => {
    //     //homePage.openMemberLoginDrawer();
    //     expect<any>(iblinkLoginDrawer.isRightDrawerOpen()).toBeTruthy();
    // })

    // afterAll(() => {
    //     homePage.resetBrowserSession();
    // });

    /*
        - specs  
        - data driven 
    **/
    using(data, (data, description) => {
        it (description, () => {
            iblinkLoginDrawer.attemptToRegisterIntoIBlink(data);
            // // iblinkLoginDrawer.enterLastNameToRegister((<any>data).lastName);
            // // iblinkLoginDrawer.enterEmailToRegister((<any>data).email);
            // // iblinkLoginDrawer.enterConfirmEmailToRegister((<any>data).confirmEmail);
            // // iblinkLoginDrawer.enterPasswordToRegister((<any>data).password);
            // // iblinkLoginDrawer.enterConfirmPasswordToRegister((<any>data).confirmpassword);
            // // iblinkLoginDrawer.enterMemberBarcodeToRegister((<any>data).memberBarcode);
            
            let actualErrors = iblinkLoginDrawer.getAllRegistrationErrors().then((resultArray) => resultArray.filter((error) => error));
            console.log(`errors: ${actualErrors.then((e)=> console.log(e))}`)
            expect<any>(actualErrors).toEqual((<any>data).expectedError);

            // console.log(`array: ${iblinkLoginDrawer.getAllRegistrationErrors().
            //     then((array)=> array.filter((error) => console.log(error)))}`)
        });
    });

    // it('User should be able to login and logout with correct email/password', () => {
    //     let emailId = 'scott.zillitto@blinkfitness.com';
    //     let password = '123456';
    //     iblinkLoginDrawer.loginIntoBlink(emailId, password);
    //     expect<any>(browser.getTitle()).toContain('Accounts Page');

    //     //logout now
    //     iblinkAccountPage.logoutFromIblink();
    //     expect<any>(blinkHomePage.weAreOnBlinkHomePage()).toBeTruthy();
    // });

});
