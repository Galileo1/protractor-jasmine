/* page object imports
**/
import { BlinkHomePage } from '../page-objects/BlinkHomePage.po';
import { LocationsPage } from '../page-objects/LocationsPage.po';
import { JoinNow } from '../page-objects/JoinNow.po';

/*
protractor imports 
**/
import { browser, by, ExpectedConditions, element } from 'protractor';

/*
    constant and data imports 
**/
import  constants from '../config/constants';
import * as data from '../../../data/properties.json';

describe('Blink', () => {

    var homePage : BlinkHomePage = new BlinkHomePage();
    var locationsPage : LocationsPage = new LocationsPage();
    var subscriptionPage : JoinNow = new JoinNow();

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
    const dobFuture = (<any>data).dobFuture;
   /* 
        hooks 
    **/

    beforeAll(() => {
        homePage.goto('join/boerum-hill/green?icmp=Join_Now_Desription');
        subscriptionPage.waitForCheckoutPageToBeLoaded();
    })

    afterEach(()=> {
        subscriptionPage.resetFormFields();
    })

    afterAll(() => {
        homePage.resetBrowserSession();
    });

    /* 
        specs  
    **/
    it('user is displayed with the error when first name is not specified', () => {
        //subscriptionPage.enterFirstName(firstName);
        subscriptionPage.enterLastName(lastName);
        subscriptionPage.enterAddress1(address);
        subscriptionPage.enterAccountCity(city);
        subscriptionPage.selectAccountState(state);         
        subscriptionPage.enterAccountZipCode(String(zipCode));
        subscriptionPage.enterAccountPhone(phoneNumber);
        subscriptionPage.enterAccountEmail(email);
        subscriptionPage.confirmYourEmailId(emailConfirm);
        subscriptionPage.enterAccountDOBToDevice(dob);
        subscriptionPage.selectYourGender(gender);
        subscriptionPage.submitSubscription();
        expect<any>(subscriptionPage.getFirstNameRequiredErrorMessage()).toBe(constants.FIRST_NAME_ERROR);
    });

    it('user is displayed with the error when last name is not specified', () => {
        subscriptionPage.enterFirstName(firstName);
        //subscriptionPage.enterLastName(lastName);
        subscriptionPage.enterAddress1(address);
        subscriptionPage.enterAccountCity(city);
        subscriptionPage.selectAccountState(state);         
        subscriptionPage.enterAccountZipCode(String(zipCode));
        subscriptionPage.enterAccountPhone(phoneNumber);
        subscriptionPage.enterAccountEmail(email);
        subscriptionPage.confirmYourEmailId(emailConfirm);
        subscriptionPage.enterAccountDOBToDevice(dob);
        subscriptionPage.selectYourGender(gender);
        subscriptionPage.submitSubscription();
        expect<any>(subscriptionPage.getLastNameRequiredErrorMessage()).toBe(constants.LAST_NAME_ERROR); 
    });

    it('user is displayed with the error when address is not specified', () => {
        subscriptionPage.enterFirstName(firstName);
        subscriptionPage.enterLastName(lastName);
        //subscriptionPage.enterAddress1(address);
        subscriptionPage.enterAccountCity(city);
        subscriptionPage.selectAccountState(state);         
        subscriptionPage.enterAccountZipCode(String(zipCode));
        subscriptionPage.enterAccountPhone(phoneNumber);
        subscriptionPage.enterAccountEmail(email);
        subscriptionPage.confirmYourEmailId(emailConfirm);
        subscriptionPage.enterAccountDOBToDevice(dob);
        subscriptionPage.selectYourGender(gender);
        subscriptionPage.submitSubscription();
        expect<any>(subscriptionPage.getAddressRequiredErrorMessage()).toBe(constants.ADDRESS_ERROR);  
    });

    it('user is displayed with the error when city is not specified', () => {
        subscriptionPage.enterFirstName(firstName);
        subscriptionPage.enterLastName(lastName);
        subscriptionPage.enterAddress1(address);
        //subscriptionPage.enterAccountCity(city);
        subscriptionPage.selectAccountState(state);         
        subscriptionPage.enterAccountZipCode(String(zipCode));
        subscriptionPage.enterAccountPhone(phoneNumber);
        subscriptionPage.enterAccountEmail(email);
        subscriptionPage.confirmYourEmailId(emailConfirm);
        subscriptionPage.enterAccountDOBToDevice(dob);
        subscriptionPage.selectYourGender(gender);
        subscriptionPage.submitSubscription();
        expect<any>(subscriptionPage.getAccountCityRequiredErrorMessage()).toBe(constants.CITY_ERROR);  
    });

    it('user is displayed with the error when state is not specified', () => {
        subscriptionPage.enterFirstName(firstName);
        subscriptionPage.enterLastName(lastName);
        subscriptionPage.enterAddress1(address);
        subscriptionPage.enterAccountCity(city);
        //subscriptionPage.selectAccountState(state);         
        subscriptionPage.enterAccountZipCode(String(zipCode));
        subscriptionPage.enterAccountPhone(phoneNumber);
        subscriptionPage.enterAccountEmail(email);
        subscriptionPage.confirmYourEmailId(emailConfirm);
        subscriptionPage.enterAccountDOBToDevice(dob);
        subscriptionPage.selectYourGender(gender);
        subscriptionPage.submitSubscription();
        expect<any>(subscriptionPage.getAccountStateRequiredErrorMessage()).toBe(constants.STATE_ERROR);   
    })

    it('user is displayed with the error when zip code is not specified', () => {
        subscriptionPage.enterFirstName(firstName);
        subscriptionPage.enterLastName(lastName);
        subscriptionPage.enterAddress1(address);
        subscriptionPage.enterAccountCity(city);
        subscriptionPage.selectAccountState(state);         
        //subscriptionPage.enterAccountZipCode(String(zipCode));
        subscriptionPage.enterAccountPhone(phoneNumber);
        subscriptionPage.enterAccountEmail(email);
        subscriptionPage.confirmYourEmailId(emailConfirm);
        subscriptionPage.enterAccountDOBToDevice(dob);
        subscriptionPage.selectYourGender(gender);
        subscriptionPage.submitSubscription();
        expect<any>(subscriptionPage.getAccountZipRequiredErrorMessage()).toBe(constants.ZIP_ERROR);  
    });

    it('user is displayed with the error when phone is not specified', () => {
        subscriptionPage.enterFirstName(firstName);
        subscriptionPage.enterLastName(lastName);
        subscriptionPage.enterAddress1(address);
        subscriptionPage.enterAccountCity(city);
        subscriptionPage.selectAccountState(state);         
        subscriptionPage.enterAccountZipCode(String(zipCode));
        //subscriptionPage.enterAccountPhone(phoneNumber);
        subscriptionPage.enterAccountEmail(email);
        subscriptionPage.confirmYourEmailId(emailConfirm);
        subscriptionPage.enterAccountDOBToDevice(dob);
        subscriptionPage.selectYourGender(gender);
        subscriptionPage.submitSubscription();
        expect<any>(subscriptionPage.getAccoutPhoneRequiredErrorMessage()).toBe(constants.PHONE_ERROR);                      
    });

    it('user is displayed with the error when email is not specified', () => {
        subscriptionPage.enterFirstName(firstName);
        subscriptionPage.enterLastName(lastName);
        subscriptionPage.enterAddress1(address);
        subscriptionPage.enterAccountCity(city);
        subscriptionPage.selectAccountState(state);         
        subscriptionPage.enterAccountZipCode(String(zipCode));
        subscriptionPage.enterAccountPhone(phoneNumber);
       //subscriptionPage.enterAccountEmail(email);
        subscriptionPage.confirmYourEmailId(emailConfirm);
        subscriptionPage.enterAccountDOBToDevice(dob);
        subscriptionPage.selectYourGender(gender);
        subscriptionPage.submitSubscription();
        expect<any>(subscriptionPage.getAccountEmailRequiredErrorMessage()).toBe(constants.EMAIL_ERROR);               
    });
  
    it('user is displayed with the error when confirm email field is not same as email field', () => {
        subscriptionPage.enterFirstName(firstName);
        subscriptionPage.enterLastName(lastName);
        subscriptionPage.enterAddress1(address);
        subscriptionPage.enterAccountCity(city);
        subscriptionPage.selectAccountState(state);         
        subscriptionPage.enterAccountZipCode(String(zipCode));
        subscriptionPage.enterAccountPhone(phoneNumber);
        subscriptionPage.enterAccountEmail(email);
        //subscriptionPage.confirmYourEmailId(emailConfirm);
        subscriptionPage.enterAccountDOBToDevice(dob);
        subscriptionPage.selectYourGender(gender);
        subscriptionPage.submitSubscription();
        expect<any>(subscriptionPage.getAccountEmailConfirmRequiredErrorMessage()).toBe(constants.CONFIRM_EMAIL_ERROR);               
    });

    it('user is displayed with the error when DOB is not specified', () => {
            subscriptionPage.enterFirstName(firstName);
            subscriptionPage.enterLastName(lastName);
            subscriptionPage.enterAddress1(address);
            subscriptionPage.enterAccountCity(city);
            subscriptionPage.selectAccountState(state);         
            subscriptionPage.enterAccountZipCode(String(zipCode));
            subscriptionPage.enterAccountPhone(phoneNumber);
            subscriptionPage.enterAccountEmail(email);
            subscriptionPage.confirmYourEmailId(emailConfirm);
            //subscriptionPage.enterAccountDOBToDevice(dob);
            subscriptionPage.selectYourGender(gender);
            subscriptionPage.submitSubscription();
            expect<any>(subscriptionPage.getAccountDOBRequiredErrorMessage()).toBe(constants.DOB_ERROR);               
    });

    it('user is displayed with the error when DOB is in future', () => {
        subscriptionPage.enterFirstName(firstName);
        subscriptionPage.enterLastName(lastName);
        subscriptionPage.enterAddress1(address);
        subscriptionPage.enterAccountCity(city);
        subscriptionPage.selectAccountState(state);         
        subscriptionPage.enterAccountZipCode(String(zipCode));
        subscriptionPage.enterAccountPhone(phoneNumber);
        subscriptionPage.enterAccountEmail(email);
        subscriptionPage.confirmYourEmailId(emailConfirm);
        subscriptionPage.enterAccountDOBToDevice(dobFuture);
        subscriptionPage.selectYourGender(gender);
        subscriptionPage.submitSubscription();
        expect<any>(subscriptionPage.getAccountDOBRequiredErrorMessage()).toBe(constants.DOB_ERROR);               
});

    it('user is displayed with the error when gender is not specified', () => {
            subscriptionPage.enterFirstName(firstName);
            subscriptionPage.enterLastName(lastName);
            subscriptionPage.enterAddress1(address);
            subscriptionPage.enterAccountCity(city);
            subscriptionPage.selectAccountState(state);         
            subscriptionPage.enterAccountZipCode(String(zipCode));
            subscriptionPage.enterAccountPhone(phoneNumber);
            subscriptionPage.enterAccountEmail(email);
            subscriptionPage.confirmYourEmailId(emailConfirm);
            subscriptionPage.enterAccountDOBToDevice(dob);
            //subscriptionPage.selectYourGender("Male");
            subscriptionPage.submitSubscription();
            expect<any>(subscriptionPage.getGenderRequiredErrorMessage()).toBe(constants.GENDER_ERROR);               
    });

})
