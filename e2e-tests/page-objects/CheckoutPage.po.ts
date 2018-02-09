import { browser, by, element, ElementFinder, ElementArrayFinder, Key , ExpectedConditions} from 'protractor';
import { BasePage } from './BasePage.po';
import { SelectWrapper } from '../../helpers/SelectWrapper';
import { WebElementWrapper } from '../../helpers/WebElementWrapper';
import { timeout, creditCard } from '../config/constants';
import '../../helpers/ElementExtend';


/* tslint:disable:arrow-return-shorthand */
export class CheckoutPage extends BasePage {
    
    //Basic Info
    private submitForm: ElementFinder;
    private firstName : ElementFinder;
    private lastName : ElementFinder;
    private address: ElementFinder;
    private address2: ElementFinder;
    private accountCity: ElementFinder;
    private accountState: ElementFinder;
    private accountZip: ElementFinder;
    private accountPhone : ElementFinder;
    private accountEmail: ElementFinder;
    private confirmEmail: ElementFinder;
    private accountDOB: ElementFinder;
    private datePickerDOB: ElementFinder;
    private selectGender: ElementFinder;

    //Billing Info
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
    private errorField : ElementArrayFinder;

    //Purchase details
    private ccName: ElementFinder;
    private ccNumber: ElementFinder;
    private ccMonth: ElementFinder;
    private ccYear: ElementFinder; 
    private ccCVV: ElementFinder;  
    private TNClink: ElementFinder;
    private checkBoxTNC: ElementFinder;
    private purchaseButton: ElementFinder;

    constructor () {
        super();
        this.submitForm = element(by.xpath('//a[(@class="btn round round orange next")]'));
        this.firstName = element(by.xpath('//label[contains(.,"first name*")]/following-sibling::input'));
        this.lastName = element(by.xpath('//label[contains(.,"last name*")]/following-sibling::input'));
        this.address = element(by.xpath('//label[contains(.,"address*")]/following-sibling::input'));
        this.address2 = element(by.xpath('//label[contains(.,"apt/suite/unit (optional)")]//following-sibling::input'));
        this.accountCity = element(by.xpath('//label[contains(text(),"city*")]/following-sibling::input'));
        this.accountState = element(by.xpath('//select[@id="Account_State"]'));
        this.accountZip = element(by.xpath('//input[@data-val-required="Enter a Zip"]'));
        this.accountPhone = element(by.xpath('//input[@data-val-required="Please enter a Telephone"]'));
        this.accountEmail = element(by.xpath('//input[@data-val-required="Please enter a Email Address"]'));
        this.confirmEmail = element(by.xpath('//input[@data-val-required="Please confirm Email"]'));
        this.accountDOB = element(by.xpath('//label[contains(text(),"date of birth mm/dd/yyyy*")]/following-sibling::input'));
        this.datePickerDOB = element(by.xpath('//div[@class="datepicker datepicker-dropdown dropdown-menu datepicker-orient-left datepicker-orient-top"]'));
        this.selectGender = element(by.css('select#sex'));
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
        this.errorField = element.all(by.css('p.invalid.show'));
        this.ccName = element(by.css('input#creditCardName'));
        this.ccNumber = element(by.css('input#creditCardNumber'));
        this.ccMonth = element(by.css('select#expiration-month-select'));
        this.ccYear = element(by.css('select#expiration-year-select'));
        this.ccCVV = element(by.css('input#cVV'));
        this.checkBoxTNC = element(by.css('input[name="Account.IAgree"]'));
        this.TNClink = element(by.xpath('//a[(@data-modal="termsAndConditionsModal")]'));
        this.purchaseButton  = element(by.css('input.btn.block.submit.orange'));
        //this.bridgePageEmailAddress = element(by.css('input#emailAddr'));        
    }

    // get (url : string) {
    //     browser.get(url);        
    // }

    enterFirstName(firstName: string) {
        return this.firstName.sendText(firstName);
    }

    enterLastName(lastName: string) {
        return this.lastName.sendText(lastName);
    }

    enterAddress1(address: string) {
        return this.address.sendText(address);
    }

    enterAddress2(address2: string) {
        return this.address2.sendText(address2);
    }

    enterAccountCity(city: string) {
        return this.accountCity.sendText(city);
    }

    selectAccountState(state: string) {
        let selectDropDown : SelectWrapper = new SelectWrapper(this.accountState);
        return selectDropDown.selectByText('state').then(()=> selectDropDown.selectByText(state));
    }

    enterAccountZipCode(zipCode: string) {
        return this.accountZip.sendText(zipCode);
    }

    enterAccountPhone(phoneNumber: string) {
        return this.accountPhone.sendText(phoneNumber);
    }

    enterAccountEmail(emailId: string) {
        return this.accountEmail.sendText(emailId.toString());
    }

    confirmYourEmailId(confirmEmailId: string) {
        return this.confirmEmail.sendText(confirmEmailId.toString());
    }

    enterAccountDOB(dob: string) {
        return this.clearAccountDOB().then(() => {
            return  browser.executeScript('document.getElementById("birthDate").setAttribute("value", "' + dob +'")');
        });
    }

    enterAccountDOBToDevice(dob: string) {
        return this.clearAccountDOB().then(() => {
            return  browser.executeScript('document.getElementById("birthDate").setAttribute("value", "' + dob +'")');
        });
    }

    selectYourGender(gender: string) {
        let selectDropDown : SelectWrapper = new SelectWrapper(this.selectGender);
        return selectDropDown.selectByIndex(0).then(() => {
            return selectDropDown.selectByText(gender);
        });
       
    }

    billingAddressIsSame() {
       return WebElementWrapper.selectCheckBox(this.billingAddressIsSameCheckbox);
    }

    enterBillingAddress1(address: string) {
        return this.billingAddress1.sendText(address);
    }

    enterBillingAddress2(address2: string) {
        return this.billingAddress2.sendText(address2);
    }

    enterBillingCity(city: string) {
        return this.billingCity.sendText(city);
    }

    selectYourBillingState(state: string) {
        let selectDropDown : SelectWrapper = new SelectWrapper(this.selectBillingState);
        return selectDropDown.selectByValue('Alaska');
        
    }

    enterBillingZipCode(zipCode: string) {
        return this.billingZip.sendText(zipCode);
    }

    submitBasicDetails () {       
        return this.submitForm.safeClick();
    }

    waitForCheckoutPageToBeLoaded() {
        return browser.wait(ExpectedConditions.elementToBeClickable(this.submitForm), timeout.LONG);
    }

    clearAccountDOB() {
        return browser.executeScript('document.getElementById("birthDate").setAttribute("value", "")');
    }

    resetFormFields() {
        this.firstName.clear();
        this.lastName.clear();
        this.address.clear();
        this.accountCity.clear();
        this.clearAccountDOB();
        this.accountPhone.clear();
        this.accountZip.clear();
        this.accountEmail.clear();
        this.confirmEmail.clear();
        let selectDropDownGender : SelectWrapper = new SelectWrapper(this.selectGender);
        selectDropDownGender.selectByIndex(0);
        let selectDropDown : SelectWrapper = new SelectWrapper(this.accountState);
        selectDropDown.selectByText('state');
    }

    getErrors() {
        return this.errorField.map((element) => element.getText());
    }

    enterCCName() {        
        return this.ccName.sendText(creditCard.NAME);
    }

    enterCCNumber() {
        return this.ccNumber.sendText(creditCard.NUMBER_VISA);
    }

    enterCCMonth() {
        let selectDropDown : SelectWrapper = new SelectWrapper(this.ccMonth);
        return selectDropDown.selectByText(creditCard.MONTH);
    }

    enterCCYear() {
        let selectDropDown : SelectWrapper = new SelectWrapper(this.ccYear);
        return selectDropDown.selectByText(creditCard.YEAR);
    }

    enterSecurityCode() {       
       return this.ccCVV.sendText(creditCard.CVV);
    }

    selectTNC() {
        //return this.checkBoxTNC.safeClick();
        return browser.executeScript("arguments[0].click();", this.checkBoxTNC.getWebElement());
    }

    completeThePurchase() {
        let invisibilityOfLoaderImage = ExpectedConditions.invisibilityOf(this.loaderImage);       
        return this.purchaseButton.safeClick().then(()=> {
            browser.wait(invisibilityOfLoaderImage, timeout.VERYLONG_TIMEOUT);
        })
    }    

    enterBasicDetailsOnCheckoutPage(data: any) {
        return this.waitForCheckoutPageToBeLoaded()
        .then(()=> this.enterFirstName((<any>data).firstName))
        .then(()=> this.enterLastName((<any>data).lastName))
        .then(()=> this.enterAddress1((<any>data).address))
        .then(()=> this.enterAccountCity((<any>data).city))
        .then(()=> this.selectAccountState((<any>data).state))
        .then(()=> this.enterAccountZipCode((<any>data).zipCode))
        .then(()=> this.enterAccountPhone((<any>data).phoneNumber))
        .then(()=> this.enterAccountEmail((<any>data).email))
        .then(()=> this.confirmYourEmailId((<any>data).emailConfirm))
        .then(()=> this.enterAccountDOB((<any>data).dob))
        .then(()=> this.selectYourGender((<any>data).gender))
        .then(()=> this.submitBasicDetails());
    }

    enterPaymentInformation() {
        return this.enterCCName()
        .then(()=> this.enterCCNumber())
        .then(()=> this.enterCCMonth())
        .then(()=> this.enterCCYear())
        .then(()=> this.enterSecurityCode())
        .then(()=> this.selectTNC())
        .then(()=> this.completeThePurchase())
    }

    enterBillingDetails(data: any) {
        return this.enterBillingAddress1((<any>data).billingAddress1)
        .then(()=> this.enterBillingAddress2((<any>data).billingAddress2))
        .then(()=> this.enterBillingCity((<any>data).billingCity))
        .then(()=> this.selectYourBillingState((<any>data).billingState))
        .then(()=> this.enterBillingZipCode((<any>data).billingZipcode));
    }

}
