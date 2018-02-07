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

describe('iBlink Registration', () => {

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

    /*
        - specs  
        - data driven 
    **/

    /**
     * Iblink registration errors
     * 
     */
    using(data, (data, description) => {
        it (description, () => {
            iblinkLoginDrawer.attemptToRegisterIntoIBlink(data);
            let actualErrors = iblinkLoginDrawer.getAllRegistrationErrors().then((resultArray) => resultArray.filter((error) => error));
 
            expect<any>(actualErrors).toEqual((<any>data).expectedError);         
        });
    });


    
});
