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
import * as data from '../../../data/loginData.json';
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
    
    //const expect = chai.expect;   


   /* 
        hooks 
    **/
    beforeAll(() => {
        homePage.get();
        WebElementWrapper.waitForAnyPageToLoad();
        homePage.openMemberLoginDrawer();
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
            iblinkLoginDrawer.attemptTologinIntoBlink((<any>data).emailId, (<any>data).password);
            let actualErrors = iblinkLoginDrawer.getErrors().then((resultArray) => resultArray.filter((error) => error));
            
            expect<any>(actualErrors).toEqual((<any>data).expectedError);
        });
    });

    it('User should be able to login and logout with correct email/password', () => {
        let emailId = 'scott.zillitto@blinkfitness.com';
        let password = '123456';
        iblinkLoginDrawer.loginIntoBlink(emailId, password);
        expect<any>(browser.getTitle()).toContain('Accounts Page');

        //logout now
        iblinkAccountPage.logoutFromIblink();
        expect<any>(blinkHomePage.weAreOnBlinkHomePage()).toBeTruthy();
    });

});
