import { Header } from '../page-objects/Header.po';
import { BlinkHomePage } from '../page-objects/BlinkHomePage.po';
import { WebElementWrapper } from '../../helpers/WebElementWrapper';
import { element, by } from 'protractor';
import { IBlinkLoginDrawer } from '../page-objects/IBlinkLoginDrawer.po';


describe('Blink Navigation on Web', () => {
    let header : Header = new Header();
    let homePage : BlinkHomePage = new BlinkHomePage();
    let iblinkLoginDrawer : IBlinkLoginDrawer = new IBlinkLoginDrawer();
    
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
        //    header.selectFromNavMenuHeader('LOCATIONS');
        //    WebElementWrapper.itemExits(element.all(by.css('div.header-promo-banner + div.nav-list >a')), 'LOCATIONS')
        //    .then(bool => console.log(`bool: ${bool}`));

        homePage.openMemberLoginDrawer();
        expect<any>(iblinkLoginDrawer.isRightDrawerOpen()).toBeTruthy();
    });

});
