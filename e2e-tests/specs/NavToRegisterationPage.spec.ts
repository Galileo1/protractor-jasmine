
import { BlinkHomePage } from '../page-objects/BlinkHomePage.po';
import { LocationsPage } from '../page-objects/LocationsPage.po';
import { CheckoutPage } from '../page-objects/CheckoutPage.po';
import { browser, by, ExpectedConditions, element } from 'protractor';
import { join } from 'path';
import  constants  from '../config/constants';
import { protractor } from 'protractor/built/ptor';
import * as data from '../../../data/properties.json';
import { WebElementWrapper } from '../../helpers/WebElementWrapper';

describe('Blink Navigation on Web', () => {
    var homePage : BlinkHomePage = new BlinkHomePage();
    var locationsPage : LocationsPage = new LocationsPage();
    var checkoutPage : CheckoutPage = new CheckoutPage();
    
   /* 
        hooks 
    **/

    beforeAll(() => {
        homePage.get();
        WebElementWrapper.waitForAnyPageToLoad();
    })
    
    afterAll(() => { 
        //homePage.resetBrowserSession();
    });

    /* 
        specs  
    **/
    
    it('user should be able to navigate to registration page using web ', () => {
           homePage.gotoLocations();
           locationsPage.closePopUpModalIfOpen();
           locationsPage.selectYourPreferedClubLocation("Blink Boerum Hill");           
           locationsPage.subscribeToMembershipPlan(constants.BLUE_MEMBERSHIP);
           checkoutPage.waitForCheckoutPageToBeLoaded();
           expect<any>(checkoutPage.getCurrentUrl()).toContain(constants.BLUE_MEMBERSHIP);            
    })

})
