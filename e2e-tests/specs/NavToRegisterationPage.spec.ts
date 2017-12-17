
import { BlinkHomePage } from '../page-objects/BlinkHomePage.po';
import { LocationsPage } from '../page-objects/LocationsPage.po';
import { JoinNow } from '../page-objects/JoinNow.po';
import { browser, by, ExpectedConditions, element } from 'protractor';
import { join } from 'path';
import  constants  from '../config/constants';
import { protractor } from 'protractor/built/ptor';
import * as data from '../../../data/properties.json';
import { WebElementWrapper } from '../../helpers/WebElementWrapper';

describe('Blink Navigation on Web', () => {
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

    // afterEach(() => {
    //     homePage.resetBrowserSession();
    // });

    
    afterAll(() => { 
        //homePage.resetBrowserSession();
        console.log('done');
    });

    /* 
        specs  
    **/
    
    it('user should be able to navigate to checkout page for BLUE PLAN-PRE SALE CLUB via desktop ', () => {
        homePage.gotoLocations();
        locationsPage.closePopUpModalIfOpen();
        locationsPage.selectYourPreferedClubLocation(constants.PRE_SALE_CLUB_LOCATION);
        expect<any>(subscriptionPage.getCurrentUrl()).toContain('lindenhurst');  
        locationsPage.pageRefresh();
        locationsPage.subscribeToMembershipPlan(constants.BLUE_MEMBERSHIP);
        subscriptionPage.waitForCheckoutPageToBeLoaded();
        expect<any>(subscriptionPage.getCurrentUrl()).toContain(constants.BLUE_MEMBERSHIP);            
    });

    it('user should be able to navigate to checkout for GRAY PLAN-NO TAX CLUB via desktop ', () => {
        homePage.gotoLocations();
        locationsPage.closePopUpModalIfOpen();
        locationsPage.selectYourPreferedClubLocation('constants.NO_TAX_CLUB_LOCATION');
        expect<any>(subscriptionPage.getCurrentUrl()).toContain('valley-stream');  
        locationsPage.pageRefresh();       
        locationsPage.subscribeToMembershipPlan(constants.GRAY_MEMBERSHIP);
        subscriptionPage.waitForCheckoutPageToBeLoaded();
        expect<any>(subscriptionPage.getCurrentUrl()).toContain(constants.GRAY_MEMBERSHIP);            
    });

    it('user should be able to navigate to checkout for GREEN PLAN-WITH TAX CLUB via desktop ', () => {
        homePage.gotoLocations();
        locationsPage.closePopUpModalIfOpen();
        locationsPage.selectYourPreferedClubLocation(constants.TAXABLE_CLUB_LOCATION);   
        expect<any>(subscriptionPage.getCurrentUrl()).toContain('125th-street');  
        locationsPage.pageRefresh();       
        locationsPage.subscribeToMembershipPlan(constants.GREEN_MEMBERSHIP);
        subscriptionPage.waitForCheckoutPageToBeLoaded();
        expect<any>(subscriptionPage.getCurrentUrl()).toContain(constants.GREEN_MEMBERSHIP);            
    });

})
