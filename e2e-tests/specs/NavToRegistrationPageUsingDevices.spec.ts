import { LoginPage } from '../page-objects/LoginPage.po';
import { BlinkHomePage } from '../page-objects/BlinkHomePage.po';
import { LocationsPage } from '../page-objects/LocationsPage.po';
import { JoinNow } from '../page-objects/JoinNow.po';
import { browser, by, ExpectedConditions, element } from 'protractor';
import { join } from 'path';
import  constants  from '../config/constants';
import { protractor } from 'protractor/built/ptor';
import * as data from '../../../data/properties.json';
import { WebElementWrapper } from '../../helpers/WebElementWrapper';

describe('Blink Device Navigation', () => {

    var homePage : BlinkHomePage = new BlinkHomePage();
    var locationsPage : LocationsPage = new LocationsPage();
    var subscriptionPage : JoinNow = new JoinNow();
    
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
    
    it('user should be able to navigate to registration page using device', () => {
           homePage.gotoLocationsUsingADevice();           
           locationsPage.closePopUpModalIfOpen();
           locationsPage.selectYourPreferedClubLocation("Blink Murray Hill");
           locationsPage.selectMembershipPlan();
           subscriptionPage.waitForCheckoutPageToBeLoaded();
           expect<any>(subscriptionPage.getCurrentUrl()).toBe(constants.DEVICE_SUBS_URL); 
        //    locationsPage.subscribeForGreenPlan();
        //    subscriptionPage.waitForCheckoutPageToBeLoaded();
        //    expect<any>(subscriptionPage.getCurrentUrl()).toBe(subscriptionPage.SUBSCRIPTION_PAGE_URL);               
    })

})