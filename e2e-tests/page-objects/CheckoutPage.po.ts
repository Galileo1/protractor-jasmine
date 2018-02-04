import { browser, by, element, ElementFinder, ElementArrayFinder, Key , ExpectedConditions} from 'protractor';
import { BasePage } from './BasePage.po';
import { SelectWrapper } from '../../helpers/SelectWrapper';
import { WebElementWrapper } from '../../helpers/WebElementWrapper';
import { timeout } from '../config/constants';
import '../../helpers/ElementExtend';


/* tslint:disable:arrow-return-shorthand */
export class CheckoutPage extends BasePage {

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

    constructor () {
        super();
        this.submitForm = element(by.css('div.join-content a.btn.round.round.orange.next'));
        this.firstName = element(by.css('div.join-content div.first-name input'));
        this.lastName = element(by.css('div.join-content div.last-name input'));
        this.address = element(by.css('div.join-content div.address:nth-child(3) input'));
        this.address2 = element(by.css('div.join-content div.address:nth-child(4) input'));
        this.accountCity = element(by.css('div.join-content div.address-region label[for="Account_City"] + input'));
        this.accountState = element(by.xpath('//select[@id="Account_State"]'));
        this.accountZip = element(by.css('div.join-content div.address-region label[for="Account_Zip"] + input'));
        this.accountPhone = element(by.css('div.join-content div.phone input'));
        this.accountEmail = element(by.css('div.join-content div.email:nth-child(7) label[for="Account_EmailAddress"]+ input'));
        this.confirmEmail = element(by.css('div.join-content div.email:nth-child(8) label[for="Account_EmailAddress"]+ input'));
        this.accountDOB = element(by.css('div.join-content div.dob input'));
        this.datePickerDOB = element(by.xpath('//div[@class="datepicker datepicker-dropdown dropdown-menu datepicker-orient-left datepicker-orient-top"]'));
        this.selectGender = element(by.css('select#sex'));
        this.billingAddressIsSameCheckbox = element(by.css('div.join-content div.checkbox input#Account_UseMailingAddressForBilling'));
        this.billingAddress1 = element(by.css('div.billing-address label[for="billing1"] + input'));
        this.billingAddress1ErrorSet = element(by.css('div.billing-address:nth-child(13) > div:nth-child(2) > p:nth-child(1)'));
        this.billingAddress2 = element(by.css('div.billing-address label[for="billing2"] + input'));
        this.billingCity = element(by.css('div.billing-address-region label[for="billingCity"] + input'));
        this.billingCityErrorSet = element(by.css('.billing-address-region > div:nth-child(1) > div:nth-child(2) > p:nth-child(1)'));
        this.selectBillingState = element(by.xpath('//select[@data-val-requiredifnotchecked="Enter a Billing State"]'));
        this.selectBillingStateErrorSet = element(by.css('.billing-address-region > div:nth-child(2) > div:nth-child(2) > p:nth-child(1)'));
        this.billingZip = element(by.css('div.billing-address-region label[for="billingZip"] + input'));
        this.billingZipErrorSet = element(by.css('.billing-address-region > div:nth-child(3) > div:nth-child(2) > p:nth-child(1)'));
        this.errorField = element.all(by.css('p.invalid.show'));
        
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
        return this.accountEmail.sendText(emailId);
    }

    confirmYourEmailId(confirmEmailId: string) {
        return this.confirmEmail.sendText(confirmEmailId);
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

    submitSubscription () {
        //browser.wait(ExpectedConditions.elementToBeClickable(this.submitForm), 80000).then(() => )
        return this.submitForm.safeClick();
    }

    waitForCheckoutPageToBeLoaded() {
        browser.wait(ExpectedConditions.elementToBeClickable(this.submitForm), timeout.DEFAULT);
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
}
