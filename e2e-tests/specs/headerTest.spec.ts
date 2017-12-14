import { Header } from '../page-objects/Header.po';
import { BlinkHomePage } from '../page-objects/BlinkHomePage.po';
import { WebElementWrapper } from '../../helpers/WebElementWrapper';


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
           header.selectFromHeader('LOCATIONS');           
    })

})
