import { Header } from '../page-objects/Header.po';
import { BlinkHomePage } from '../page-objects/BlinkHomePage.po';
import { WebElementWrapper } from '../../helpers/WebElementWrapper';
import { element, by } from 'protractor';
import {itemExists, openPopUpModal} from '../../helpers/AsyncHelpers';


describe('Blink Navigation on Web', () => {
    var header : Header = new Header();
    var homePage : BlinkHomePage = new BlinkHomePage();   
    
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
        
           //header.selectFromNavMenuHeader('Why Blink');
        //    homePage.enterJoinNowDetails();
        //    expect(homePage.popUpModalIsDisplayed()).toBeFalsy();    

        //    let var1 =  element.all(by.css('div.header-promo-banner + div.nav-list >a'));
        //    itemExists(var1, 'LOCATIONS').then(bool => console.log(`bool: ${bool}`));     
    })

})
