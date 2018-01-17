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

describe('Blink login errors', () => {

    let homePage : BlinkHomePage = new BlinkHomePage();
    let locationsPage : LocationsPage = new LocationsPage();
    let checkoutPage : CheckoutPage = new CheckoutPage();
    let iblinkLoginDrawer : IBlinkLoginDrawer = new IBlinkLoginDrawer();
    
    //const expect = chai.expect;   


   /* 
        hooks 
    **/
    beforeAll(() => {
        homePage.get();
        WebElementWrapper.waitForAnyPageToLoad();
        homePage.openMemberLoginDrawer();
    });

    beforeEach(() => {
        expect<any>(iblinkLoginDrawer.isRightDrawerOpen()).toBeTruthy();
    })

    afterAll(() => {
        homePage.resetBrowserSession();
    });

    /*
        - specs  
        - data driven 
    **/
    using(data, (data, description) => {
        it (description, () => {           
            
            iblinkLoginDrawer.loginIntoBlink((<any>data).emailId, (<any>data).password);   
            let actualErrors = iblinkLoginDrawer.getErrors().then((resultArray) => {
                 console.log(` ars : ${resultArray.filter((e)=> e)}`);
                // console.log(` ers : ${(<any>data).expectedError}`);
                return resultArray.filter((e) => e);
            });
           
            //console.log(` ars1 : ${actualErrors.then((e)=> e)}`);                 
            expect<any>(actualErrors).toEqual((<any>data).expectedError);
        });
    });

});
