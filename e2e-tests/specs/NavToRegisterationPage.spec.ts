
import { BlinkHomePage } from '../page-objects/BlinkHomePage.po';
import { LocationsPage } from '../page-objects/LocationsPage.po';
import { CheckoutPage } from '../page-objects/CheckoutPage.po';
import { browser, by, ExpectedConditions, element } from 'protractor';
import { join } from 'path';
import { protractor } from 'protractor/built/ptor';
import * as data from '../../../data/properties.json';
import { WebElementWrapper } from '../../helpers/WebElementWrapper';
import { membership }  from '../config/constants';

describe('Blink Navigation on Web', () => {
    let homePage : BlinkHomePage = new BlinkHomePage();
    let locationsPage : LocationsPage = new LocationsPage();
    let checkoutPage : CheckoutPage = new CheckoutPage();
    
   /* 
        hooks 
    **/

    beforeAll(() => {
        homePage.get();
        WebElementWrapper.waitForAnyPageToLoad();
    });
    
    afterAll(() => {
        //homePage.resetBrowserSession();
    });

    /* 
        specs  
    **/
    
    it('user should be able to navigate to registration page using web ', () => {
           homePage.gotoLocations();
           locationsPage.closePopUpModal();
           locationsPage.selectYourPreferedClubLocation('Blink Boerum Hill');
           locationsPage.subscribeToMembershipPlan(membership.BLUE);
           checkoutPage.waitForCheckoutPageToBeLoaded();
           expect<any>(checkoutPage.getCurrentUrl()).toContain(membership.BLUE);
    });

});
