import { LoginPage } from '../page-objects/LoginPage.po';

describe('login test', () => {
    var login : LoginPage = new LoginPage();
    const expectedLoginPageTitle = 'Log in | Trade Me';
    const expectedErrorMessage = 'Your email address or password was incorrect.';

    beforeEach(() => {
        
        //let pageTitle = login.getPageTitle();
        //login.get("/login");        
        login.goto("/login");
        expect<any>(login.getPageTitle()).toBe(expectedLoginPageTitle);

    });
  
    it('incorrect password error message verification', () => {
        
        login.enterEmail("acb@trade");
        login.enterPassword("abd");        
        login.submitLoginForm();

        //let passwordToasterContent = login.getToasterContent();
        expect<any>(login.getToasterContent()).toBe(expectedErrorMessage);        

    });

    // afterEach(() => {
    //     login.quitBrowser();
    // });
  
})



