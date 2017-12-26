
import { BlinkHomePage } from '../page-objects/BlinkHomePage.po';
import { LocationsPage } from '../page-objects/LocationsPage.po';
import { CheckoutPage } from '../page-objects/CheckoutPage.po';
import { WebElementWrapper } from '../../helpers/WebElementWrapper';
import { membership }  from '../config/constants';

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
    
    it('user should be able to navigate to registration page using web ', () => {
           homePage.gotoLocations();
           locationsPage.closePopUpModalIfOpen();
           locationsPage.selectYourPreferedClubLocation("Blink Boerum Hill");
           locationsPage.subscribeToMembershipPlan(membership.BLUE);
           checkoutPage.waitForCheckoutPageToBeLoaded();
           expect<any>(checkoutPage.getCurrentUrl()).toContain(membership.BLUE);
    })

})
