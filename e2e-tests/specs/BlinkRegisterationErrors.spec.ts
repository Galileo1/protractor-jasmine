import { LoginPage } from '../page-objects/LoginPage.po';
import { BlinkHomePage } from '../page-objects/BlinkHomePage.po';
import { LocationsPage } from '../page-objects/LocationsPage.po';
import { JoinNow } from '../page-objects/JoinNow.po';
import { browser, by, ExpectedConditions, element } from 'protractor';
import { join } from 'path';
import  constants  from '../config/constants';
import { protractor } from 'protractor/built/ptor';
import * as data from '../../../data/properties.json';

describe('Blink', () => {

    var Bhp : BlinkHomePage = new BlinkHomePage();
    var lp : LocationsPage = new LocationsPage();
    var joinNow : JoinNow = new JoinNow();

    /* 
        data members 
    **/

    const firstName = (<any>data).firstName;
    const lastName = (<any>data).lastName;
    const address = (<any>data).address;
    const city = (<any>data).city;
    const state = (<any>data).state;
    const zipCode = (<any>data).zipCode;
    const phoneNumber = (<any>data).phoneNumber;
    const email = (<any>data).email;
    const emailConfirm = (<any>data).emailConfirm;
    const dob = (<any>data).dob;
    const gender = (<any>data).gender;
    
   /* 
        hooks 
    **/

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
    })

    afterEach(()=> {
        joinNow.resetFormFields();
    })

    afterAll(() => {
    });

    /* 
        specs  
    **/
    
    it('user is displayed with the error when DOB is not specified', () => {
            joinNow.enterFirstName(firstName);
            joinNow.enterLastName(lastName);
            joinNow.enterAddress1(address);
            joinNow.enterAccountCity(city);
            joinNow.selectAccountState(state);         
            joinNow.enterAccountZipCode(String(zipCode));
            joinNow.enterAccountPhone(phoneNumber);
            joinNow.enterAccountEmail(email);
            joinNow.confirmYourEmailId(emailConfirm);
            //joinNow.enterAccountDOB(dob);
            joinNow.selectYourGender(gender);
            joinNow.submitSubscription();
            expect<any>(joinNow.getAccountDOBRequiredErrorMessage()).toBe(constants.DOB_ERROR);               
    })

    it('user is displayed with the error when gender is not specified', () => {
            joinNow.enterFirstName(firstName);
            joinNow.enterLastName(lastName);
            joinNow.enterAddress1(address);
            joinNow.enterAccountCity(city);
            joinNow.selectAccountState(state);         
            joinNow.enterAccountZipCode(String(zipCode));
            joinNow.enterAccountPhone(phoneNumber);
            joinNow.enterAccountEmail(email);
            joinNow.confirmYourEmailId(emailConfirm);
            joinNow.enterAccountDOB(dob);
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

    
  
})
