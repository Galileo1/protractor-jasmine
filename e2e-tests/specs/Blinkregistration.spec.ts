import { LoginPage } from '../page-objects/LoginPage.po';
import { BlinkHomePage } from '../page-objects/BlinkHomePage.po';
import { LocationsPage } from '../page-objects/LocationsPage.po';
import { JoinNow } from '../page-objects/JoinNow.po';
import { browser, by, ExpectedConditions, element } from 'protractor';
import { join } from 'path';
import  constants  from '../config/constants';
import { protractor } from 'protractor/built/ptor';



describe('login test', () => {
    var Bhp : BlinkHomePage = new BlinkHomePage();
    var lp : LocationsPage = new LocationsPage();
    var joinNow : JoinNow = new JoinNow();
    // const expectedLoginPageTitle = 'Log in | Trade Me';
    // const expectedErrorMessage = 'Your email address or password was incorrect.';
   

    // beforeEach(() => {      
        
    //     // //let pageTitle = login.getPageTitle();
    //     // //login.get("/login");        
    //     // login.goto("/login");
    //     // expect<any>(login.getPageTitle()).toBe(expectedLoginPageTitle);
    //     //Bhp.get();
    //     //Bhp.goto('locations/boerum-hill');
    //     Bhp.goto('join/boerum-hill/green?icmp=Join_Now_Desription');
        
    // });

    beforeAll(() => {
        Bhp.goto('join/boerum-hill/green?icmp=Join_Now_Desription');
        joinNow.waitForCheckoutPageToBeLoaded();
        var origFn = browser.driver.controlFlow().execute;
        
        browser.driver.controlFlow().execute = function() {
          var args = arguments;
        
          // queue 100ms wait
          origFn.call(browser.driver.controlFlow(), function() {
            return protractor.promise.delayed(100);
          });
        
          return origFn.apply(browser.driver.controlFlow(), args);
        };
    })

    afterEach(()=> {
        joinNow.resetFormFields();
    })

    xit('user is displayed with the error when first name is not specified', () => {
        //joinNow.enterFirstName("varun");
        joinNow.enterLastName("gaur");
        joinNow.enterAddress1("123 Ghuznee st");
        joinNow.enterAccountCity("Brooklyn");
        joinNow.selectAccountState("NY");         
        joinNow.enterAccountZipCode(String(11201));
        joinNow.enterAccountPhone("2082011111");
        joinNow.enterAccountEmail("abd@gmail.com");
        joinNow.confirmYourEmailId("abd@gmail.com");
        joinNow.enterAccountDOB("02/12/1985");
        joinNow.selectYourGender("Male");
        joinNow.submitSubscription();
        expect<any>(joinNow.getFirstNameRequiredErrorMessage()).toBe(constants.FIRST_NAME_ERROR);
        
        //console.log("======in an dout");
        
    })

    xit('user is displayed with the error when last name is not specified', () => {
        joinNow.enterFirstName("varun");
        //joinNow.enterLastName("gaur");
        joinNow.enterAddress1("123 Ghuznee st");
        joinNow.enterAccountCity("Brooklyn");
        joinNow.selectAccountState("NY");         
        joinNow.enterAccountZipCode(String(11201));
        joinNow.enterAccountPhone("2082011111");
        joinNow.enterAccountEmail("abd@gmail.com");
        joinNow.confirmYourEmailId("abd@gmail.com");
        joinNow.enterAccountDOB("02/12/1985");
        joinNow.selectYourGender("Male");
        joinNow.submitSubscription();
        expect<any>(joinNow.getLastNameRequiredErrorMessage()).toBe(constants.LAST_NAME_ERROR);        
        //console.log("======in an dout");        
    })

    xit('user is displayed with the error when address is not specified', () => {
        joinNow.enterFirstName("varun");
        joinNow.enterLastName("gaur");
        //joinNow.enterAddress1("123 Ghuznee st");
        joinNow.enterAccountCity("Brooklyn");
        joinNow.selectAccountState("NY");         
        joinNow.enterAccountZipCode(String(11201));
        joinNow.enterAccountPhone("2082011111");
        joinNow.enterAccountEmail("abd@gmail.com");
        joinNow.confirmYourEmailId("abd@gmail.com");
        joinNow.enterAccountDOB("02/12/1985");
        joinNow.selectYourGender("Male");
        joinNow.submitSubscription();
        expect<any>(joinNow.getAddressRequiredErrorMessage()).toBe(constants.ADDRESS_ERROR);        
        //console.log("======in an dout");        
    })

    it('user is displayed with the error when city is not specified', () => {
        joinNow.enterFirstName("varun");
        joinNow.enterLastName("gaur");
        joinNow.enterAddress1("123 Ghuznee st");
        //joinNow.enterAccountCity("Brooklyn");
        joinNow.selectAccountState("NY");         
        joinNow.enterAccountZipCode(String(11201));
        joinNow.enterAccountPhone("2082011111");
        joinNow.enterAccountEmail("abd@gmail.com");
        joinNow.confirmYourEmailId("abd@gmail.com");
        joinNow.enterAccountDOB("02/12/1985");
        joinNow.selectYourGender("Male");
        joinNow.submitSubscription();
        expect<any>(joinNow.getAccountCityRequiredErrorMessage()).toBe(constants.CITY_ERROR);  
    })

    xit('user is displayed with the error when state is not specified', () => {
        joinNow.enterFirstName("varun");
        joinNow.enterLastName("gaur");
        joinNow.enterAddress1("123 Ghuznee st");
        joinNow.enterAccountCity("Brooklyn");
        //joinNow.selectAccountState("NY");         
        joinNow.enterAccountZipCode(String(11201));
        joinNow.enterAccountPhone("2082011111");
        joinNow.enterAccountEmail("abd@gmail.com");
        joinNow.confirmYourEmailId("abd@gmail.com");
        joinNow.enterAccountDOB("02/12/1985");
        joinNow.selectYourGender("Male");
        joinNow.submitSubscription();
        expect<any>(joinNow.getAccountStateRequiredErrorMessage()).toBe(constants.STATE_ERROR);   
    })

    xit('user is displayed with the error when zip code is not specified', () => {
        joinNow.enterFirstName("varun");
        joinNow.enterLastName("gaur");
        joinNow.enterAddress1("123 Ghuznee st");
        joinNow.enterAccountCity("Brooklyn");
        joinNow.selectAccountState("NY");         
        //joinNow.enterAccountZipCode(String(11201));
        joinNow.enterAccountPhone("2082011111");
        joinNow.enterAccountEmail("abd@gmail.com");
        joinNow.confirmYourEmailId("abd@gmail.com");
        joinNow.enterAccountDOB("02/12/1985");
        joinNow.selectYourGender("Male");
        joinNow.submitSubscription();
        expect<any>(joinNow.getAccountZipRequiredErrorMessage()).toBe(constants.ZIP_ERROR);  
    })

    xit('user is displayed with the error when phone is not specified', () => {
        joinNow.enterFirstName("varun");
        joinNow.enterLastName("gaur");
        joinNow.enterAddress1("123 Ghuznee st");
        joinNow.enterAccountCity("Brooklyn");
        joinNow.selectAccountState("NY");         
        joinNow.enterAccountZipCode(String(11201));
        //joinNow.enterAccountPhone("2082011111");
        joinNow.enterAccountEmail("abd@gmail.com");
        joinNow.confirmYourEmailId("abd@gmail.com");
        joinNow.enterAccountDOB("02/12/1985");
        joinNow.selectYourGender("Male");
        joinNow.submitSubscription();
        expect<any>(joinNow.getAccoutPhoneRequiredErrorMessage()).toBe(constants.PHONE_ERROR);                      
    })

    xit('user is displayed with the error when email is not specified', () => {
        joinNow.enterFirstName("varun");
        joinNow.enterLastName("gaur");
        joinNow.enterAddress1("123 Ghuznee st");
        joinNow.enterAccountCity("Brooklyn");
        joinNow.selectAccountState("NY");         
        joinNow.enterAccountZipCode(String(11201));
        joinNow.enterAccountPhone("2082011111");
        //joinNow.enterAccountEmail("abd@gmail.com");
        joinNow.confirmYourEmailId("abd@gmail.com");
        joinNow.enterAccountDOB("02/12/1985");
        joinNow.selectYourGender("Male");
        joinNow.submitSubscription();
        expect<any>(joinNow.getAccountEmailRequiredErrorMessage()).toBe(constants.EMAIL_ERROR);               
    })
  
    xit('user is displayed with the error when confirm email field is not same as email field', () => {
        joinNow.enterFirstName("varun");
        joinNow.enterLastName("gaur");
        joinNow.enterAddress1("123 Ghuznee st");
        joinNow.enterAccountCity("Brooklyn");
        joinNow.selectAccountState("NY");         
        joinNow.enterAccountZipCode(String(11201));
        joinNow.enterAccountPhone("2082011111");
        joinNow.enterAccountEmail("abd@gmail.com");
        //joinNow.confirmYourEmailId("abd@gmail.com");
        joinNow.enterAccountDOB("02/12/1985");
        joinNow.selectYourGender("Male");
        joinNow.submitSubscription();
        expect<any>(joinNow.getAccountEmailConfirmRequiredErrorMessage()).toBe(constants.CONFIRM_EMAIL_ERROR);               
    })
  
    xit('user is displayed with the error when DOB is not specified', () => {
        joinNow.enterFirstName("varun");
        joinNow.enterLastName("gaur");
        joinNow.enterAddress1("123 Ghuznee st");
        joinNow.enterAccountCity("Brooklyn");
        joinNow.selectAccountState("NY");         
        joinNow.enterAccountZipCode(String(11201));
        joinNow.enterAccountPhone("2082011111");
        joinNow.enterAccountEmail("abd@gmail.com");
        joinNow.confirmYourEmailId("abd@gmail.com");
        //joinNow.enterAccountDOB("02/12/1985");
        joinNow.selectYourGender("Male");
        joinNow.submitSubscription();
        expect<any>(joinNow.getAccountDOBRequiredErrorMessage()).toBe(constants.DOB_ERROR);               
    })

    it('user is displayed with the error when gender is not specified', () => {
        joinNow.enterFirstName("varun");
        joinNow.enterLastName("gaur");
        joinNow.enterAddress1("123 Ghuznee st");
        joinNow.enterAccountCity("Brooklyn");
        joinNow.selectAccountState("NY");         
        joinNow.enterAccountZipCode(String(11201));
        joinNow.enterAccountPhone("2082011111");
        joinNow.enterAccountEmail("abd@gmail.com");
        joinNow.confirmYourEmailId("abd@gmail.com");
        joinNow.enterAccountDOB("02/12/1985");
        //joinNow.selectYourGender("Male");
        joinNow.submitSubscription();
        expect<any>(joinNow.getGenderRequiredErrorMessage()).toBe(constants.GENDER_ERROR);               
    })
  

    // it('incorrect password error message verification', () => {
    //     // console.log("closed");
    //     // Bhp.gotoLocations();
    //     // lp.closePopUpModalIfOpen();
    //     // console.log("closed");
    //     // lp.selectTheClubLocation();
    //     // console.log("club location");
    //     //lp.subscribeForGreenPlan();
    //     jn.waitForCheckoutPageToBeLoaded() 
            
       
        
        
    //     jn.enterFirstName("varun");
    //     jn.enterLastName("gaur");
    //     jn.enterAddress1("123 Ghuznee st");
    //     jn.enterAccountCity("Brooklyn");
    //     jn.selectAccountState("NY"); 
    //     //browser.sleep(60000);
    //     //element(by.css('#zip')).sendKeys(String(12234));
    //     jn.enterAccountZipCode(String(11201));
    //     jn.enterAccountPhone("2082011111");
    //     jn.enterAccountEmail("abd@gmail.com");
    //     jn.confirmYourEmailId("abd@gmail.com");
    //     jn.enterAccountDOB("02/12/1985");
    //     jn.selectYourGender("Male");
    //     jn.submitSubscription();
    //     console.log("======in an dout");

        
    //     // login.enterEmail("acb@trade");
    //     // login.enterPassword("abd");        
    //     // login.submitLoginForm();

    //     // //let passwordToasterContent = login.getToasterContent();
    //     // expect<any>(login.getToasterContent()).toBe(expectedErrorMessage);        

    // });

    afterAll(() => {


    });




    // afterEach(() => {
    //     login.quitBrowser();
    // });
  
})
