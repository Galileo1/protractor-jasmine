import { browser, by, element, ElementFinder, ElementArrayFinder, Key , ExpectedConditions} from 'protractor';
import { BasePage } from './BasePage.po';
import { SelectWrapper } from '../../helpers/SelectWrapper';
import { WebElementWrapper } from '../../helpers/WebElementWrapper';
import { WebElement } from 'selenium-webdriver';
import {freeTrial, timeout} from '../config/constants';
import { openPopUpModal } from '../../helpers/AsyncHelpers';


export class PopUpModal {

    public popUpModal : ElementFinder;
    public firstName :  ElementFinder;
    public lastName : ElementFinder;
    public email : ElementFinder;
    public confirmEmail: ElementFinder;
    public phone : ElementFinder;
    public location: ElementFinder
    public submitFreeTrail: ElementFinder;
    public errorSet: ElementArrayFinder;
    public closeModal: ElementFinder;

    constructor () {
        this.popUpModal = element(by.css('div#blinkModal'));
        this.firstName = element(by.css('div.modal-body div#modal-free-trial input#firstName'));
        this.lastName =  element(by.css('div.modal-body div#modal-free-trial input#lastName'));
        this.email=  element(by.css('div.modal-body div#modal-free-trial input#emailAddress'));
        this.confirmEmail = element(by.css('div.modal-body div#modal-free-trial input#emailAddressConfirm'));
        this.phone = element(by.css('div.modal-body div#modal-free-trial input#phone'));
        this.location = element(by.css('div.modal-body div#modal-free-trial ul'));
        this.submitFreeTrail = element(by.css('div.modal-body div#modal-free-trial div.btns > a'));
        this.errorSet = element.all(by.css('div.modal-body div#modal-free-trial div.error-set'));
        this.closeModal = element(by.css('div.modal-body div#modal-free-trial div.btns > a'));
    }

    popUpModalIsPresent () {
        return browser.wait(()=> {
            return this.popUpModal.getAttribute('style').then((display) => {
                return display === 'display: block';
            })
        }, timeout.SHORT);              
    }

    enterFirstName(fName: string) {
        this.firstName.sendKeys(fName);
    }

    enterLastName(lName: string) {
        this.lastName.sendKeys(lName);
    }

    enterEmailAddress(emailAddress: string) {
        this.email.sendKeys(emailAddress);
    }

    enterEmailAddressConfirm(confirmEmail: string) {
        this.confirmEmail.sendKeys(confirmEmail);        
    }

    enterPhone(phoneNumber: string) {
        this.phone.sendKeys(phoneNumber);
    }

    enterLocation(locationName: string) {      
        let selectDropDown : SelectWrapper = new SelectWrapper(this.location);
        return selectDropDown.selectFromListByText(locationName);
    }

    submitFreeTrailForm() {
        this.submitFreeTrail.click();
    }

    enterDetailsInPopoUpModal() {                
        let email = WebElementWrapper.generateEmail(freeTrial.FIRSTNAME, freeTrial.LOCATION_CODE);
        this.enterFirstName(freeTrial.FIRSTNAME);
        this.enterLastName(freeTrial.LASTNAME);
        this.enterEmailAddress(email);
        this.enterEmailAddressConfirm(email); 
        this.enterPhone(freeTrial.PHONE_NUMBER); 
        return this.enterLocation(freeTrial.LOCATION);        
    }

    openModal(parentEle: ElementFinder) {
        openPopUpModal(parentEle, this.popUpModal);        
    }
}