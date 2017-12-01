


import { browser, by, element, ElementFinder, ElementArrayFinder, Key , ExpectedConditions} from 'protractor';
import { BasePage } from './BasePage.po';
import { SelectWrapper } from '../../helpers/SelectWrapper';
import { WebElementWrapper } from '../../helpers/WebElementWrapper';
import { WebElement } from 'selenium-webdriver';
import constants from '../config/constants';
// import { BasePage } from './BasePage.po';

export class JoinNow extends BasePage {

    public SUBSCRIPTION_PAGE_URL: string = "https://www.blinkfitness.com/join/boerum-hill/green?icmp=Join_Now_Desription";
    private submitForm: ElementFinder;
    private firstName : ElementFinder
    private firstNameErrorSet : ElementFinder;
    private lastName : ElementFinder
    private lastNameErrorSet : ElementFinder;
    private address: ElementFinder;    
    private addressErrorSet: ElementFinder;  
    private address2: ElementFinder;
    private accountCity: ElementFinder;
    private accountCityErrorSet: ElementFinder;
    private accountState: ElementFinder;
    private accountStateErrorSet: ElementFinder;
    private accountZip: ElementFinder;
    private accountZipErrorSet: ElementFinder;
    private accountPhone : ElementFinder;
    private accountPhoneErrorSet : ElementFinder;
    
    private accountEmail: ElementFinder;
    private accountEmailErrorSet : ElementFinder;
    private confirmEmail: ElementFinder;
    private confirmEmailErrorSet : ElementFinder;
    private accountDOB: ElementFinder;
    private accountDOBErrorSet : ElementFinder;
    private datePickerDOB: ElementFinder;    
    private selectGender: ElementFinder;
    private selectGenderErrorSet : ElementFinder;
    private billingAddressIsSameCheckbox: ElementFinder;
    private billingAddress1: ElementFinder;
    private billingAddress1ErrorSet: ElementFinder;
    private billingAddress2: ElementFinder;
    private billingAddress2ErrorSet: ElementFinder;
    private billingCity: ElementFinder;
    private billingCityErrorSet: ElementFinder;
    private selectBillingState: ElementFinder;
    private selectBillingStateErrorSet: ElementFinder;
    private billingZip: ElementFinder;
    private billingZipErrorSet: ElementFinder;

    constructor () {        
        super();
        this.submitForm = element(by.xpath('//a[(@class="btn round round orange next")]'));
        this.firstName = element(by.xpath('//label[contains(.,"first name*")]/following-sibling::input'));
        this.firstNameErrorSet = element(by.css('div.first-name:nth-child(1) > div:nth-child(2) > p:nth-child(1)'));
        this.lastName = element(by.xpath('//label[contains(.,"last name*")]/following-sibling::input'));
        this.lastNameErrorSet = element(by.css('div.last-name:nth-child(2) > div:nth-child(2) > p:nth-child(1)'));
        this.address = element(by.xpath('//label[contains(.,"address*")]/following-sibling::input'));
        this.addressErrorSet = element(by.css('div.address:nth-child(3) > div:nth-child(2) > p:nth-child(1)'));
        this.address2 = element(by.xpath('//label[contains(.,"apt/suite/unit (optional)")]//following-sibling::input'));
        this.accountCity = element(by.xpath('//label[contains(text(),"city*")]/following-sibling::input'));
        this.accountCityErrorSet = element(by.css('.address-region > div:nth-child(1) > div:nth-child(2) > p:nth-child(1)'));
        this.accountState = element(by.xpath('//select[@id="Account_State"]'));
        this.accountStateErrorSet = element(by.css('.address-region > div:nth-child(2) > div:nth-child(2) > p:nth-child(1)'));
        this.accountZip = element(by.xpath('//input[@data-val-required="Enter a Zip"]'));
        this.accountZipErrorSet = element(by.css('.address-region > div:nth-child(3) > div:nth-child(2) > p:nth-child(1)'));
        this.accountPhone = element(by.xpath('//input[@data-val-required="Please enter a Telephone"]'));
        this.accountPhoneErrorSet = element(by.css('.phone-field-container > div:nth-child(2) > p:nth-child(1)'));
        this.accountEmail = element(by.xpath('//input[@data-val-required="Please enter a Email Address"]'));
        this.accountEmailErrorSet = element(by.css('div.email:nth-child(7) > div:nth-child(2) > p:nth-child(1)'));
        this.confirmEmail = element(by.xpath('//input[@data-val-required="Please confirm Email"]'));
        this.confirmEmailErrorSet = element(by.css('div.email:nth-child(8) > div:nth-child(2) > p:nth-child(1)'));
        this.accountDOB = element(by.xpath('//label[contains(text(),"date of birth mm/dd/yyyy*")]/following-sibling::input'));
        this.accountDOBErrorSet = element(by.css('.dob > div:nth-child(2) > p:nth-child(1)'));
        this.datePickerDOB = element(by.xpath('//div[@class="datepicker datepicker-dropdown dropdown-menu datepicker-orient-left datepicker-orient-top"]'));
        this.selectGender = element(by.css('select#sex'));
        this.selectGenderErrorSet = element(by.css('#gender > div:nth-child(2) > p:nth-child(1)'));
        this.billingAddressIsSameCheckbox = element(by.xpath('//label[contains(@for,"Account_UseMailingAddressForBilling")]/following-sibling::input'));
        this.billingAddress1 = element(by.xpath('//label[contains(@for,"billing1")]/following-sibling::input'));
        this.billingAddress1ErrorSet = element(by.css('div.billing-address:nth-child(13) > div:nth-child(2) > p:nth-child(1)'));
        this.billingAddress2 = element(by.xpath('//label[contains(@for,"billing2")]/following-sibling::input'));
        this.billingCity = element(by.xpath('//label[contains(@for,"billingCity")]/following-sibling::input'));
        this.billingCityErrorSet = element(by.css('.billing-address-region > div:nth-child(1) > div:nth-child(2) > p:nth-child(1)'));
        this.selectBillingState = element(by.xpath('//select[@data-val-requiredifnotchecked="Enter a Billing State"]'));
        this.selectBillingStateErrorSet = element(by.css('.billing-address-region > div:nth-child(2) > div:nth-child(2) > p:nth-child(1)'));
        this.billingZip = element(by.xpath('//label[contains(@for,"billingZip")]/following-sibling::input'));
        this.billingZipErrorSet = element(by.css('.billing-address-region > div:nth-child(3) > div:nth-child(2) > p:nth-child(1)'));
        
    }

    // get (url : string) {
    //     browser.get(url);        
    // }

    enterFirstName(firstName: string) {
        return this.firstName.sendKeys(firstName);
    }

    enterLastName(lastName: string) {
        return this.lastName.sendKeys(lastName);        
    }

    enterAddress1(address: string) {
        return this.address.sendKeys(address);
    }

    enterAddress2(address2: string) {
        return this.address2.sendKeys(address2);
    }

    enterAccountCity(city: string) {
        return this.accountCity.sendKeys(city);
    }

    selectAccountState(state: string) {
        let selectDropDown : SelectWrapper = new SelectWrapper(this.accountState);
        return selectDropDown.selectByText(state);
    }

    enterAccountZipCode(zipCode: string) {        
        return this.accountZip.sendKeys(zipCode);
    }

    enterAccountPhone(phoneNumber: string) {
        return this.accountPhone.sendKeys(phoneNumber);
    }

    enterAccountEmail(emailId: string) {
        return this.accountEmail.sendKeys(emailId);
    }

    confirmYourEmailId(confirmEmailId: string) {
        return this.confirmEmail.sendKeys(confirmEmailId);
    }

    enterAccountDOB(dob: string) {  
        // this.accountDOB.isEnabled().then(()=> console.log("true"));
        // this.accountDOB.getAttribute("readonly").then((val) => { console.log("==========", val); })
        //return this.accountDOB.sendKeys(dob, Key.TAB);
        browser.executeScript("document.getElementById('birthDate').setAttribute('value', '02/12/1985')").then(() => {
            return this.accountDOB.sendKeys(Key.TAB);
        });
       
       //return this.accountDOB.sendKeys(dob, Key.TAB);
        // if (this.accountDOB.isDisplayed()) {
        //     this.accountDOB.sendKeys(dob, Key.TAB);
        //     return browser.wait(ExpectedConditions.invisibilityOf(this.datePickerDOB), constants.DEFAULT_TIMEOUT);
        // }
        

        // browser.executeScript("document.getElementById('birthDate').removeAttribute('readonly',0);")
        // .then(() => { 
        //     return browser.driver.actions().mouseDown(this.accountDOB). click().sendKeys(dob, Key.TAB).perform();
        //     //return this.accountDOB.sendKeys(dob, Key.TAB);
        // });
    }

    selectYourGender(gender: string){
        let selectDropDown : SelectWrapper = new SelectWrapper(this.selectGender);
        return selectDropDown.selectByText(gender);
    }

    billingAddressIsSame() {
       return WebElementWrapper.selectCheckBox(this.billingAddressIsSameCheckbox);        
    }

    enterBillingAddress1(address: string) {
        return this.billingAddress1.sendKeys(address);
    }

    enterBillingAddress2(address2: string) {
        return this.billingAddress2.sendKeys(address2);
    }

    enterBillingCity(city: string) {
        return this.billingCity.sendKeys(city);
    }

    selectYourBillingState(state: string) {
        var selectDropDown : SelectWrapper = new SelectWrapper(this.selectBillingState);
        return selectDropDown.selectByValue("Alaska");
        
    }

    enterBillingZipCode(zipCode: string) {
        return this.billingZip.sendKeys(zipCode);
    }

    submitSubscription () {
        //browser.wait(ExpectedConditions.elementToBeClickable(this.submitForm), 80000).then(() => )
        return this.submitForm.click();
    }

    waitForCheckoutPageToBeLoaded() {
        browser.wait(ExpectedConditions.elementToBeClickable(this.submitForm), constants.DEFAULT_TIMEOUT)
    }

    getFirstNameRequiredErrorMessage() {
        return this.firstNameErrorSet.getText();
    }

    getLastNameRequiredErrorMessage() {
        return this.lastNameErrorSet.getText();
    }

    getAddressRequiredErrorMessage() {
        return this.addressErrorSet.getText();
    }

    getAccountCityRequiredErrorMessage() {
        return this.accountCityErrorSet .getText();
    }

    getAccountDOBRequiredErrorMessage() {
        return this.accountDOBErrorSet.getText();
    }

    getAccountStateRequiredErrorMessage() {
        return this.accountStateErrorSet.getText();
    }

    getAccountZipRequiredErrorMessage() {
        return this.accountZipErrorSet.getText();
    }

    getAccountEmailRequiredErrorMessage() {
        return this.accountEmailErrorSet.getText();
    }

    getAccountEmailConfirmRequiredErrorMessage() {
        return this.confirmEmailErrorSet.getText();
    }

    getGenderRequiredErrorMessage() {
        return this.selectGenderErrorSet.getText();
    }

    getAccoutPhoneRequiredErrorMessage() {
        return this.accountPhoneErrorSet.getText();
    }

    resetFormFields() {
        this.firstName.clear();
        this.lastName.clear();
        this.address.clear();
        this.accountCity.clear();
        this.accountDOB.clear();
        this.accountPhone.clear();
        this.accountZip.clear();
        this.accountEmail.clear();
        this.confirmEmail.clear();
        let selectDropDownGender : SelectWrapper = new SelectWrapper(this.selectGender);
        selectDropDownGender.selectByIndex(0);
        let selectDropDown : SelectWrapper = new SelectWrapper(this.accountState);
        selectDropDown.selectByText("state");
    }
}
