import { browser, by, element, ElementFinder } from 'protractor';
// import { BasePage } from './BasePage.po';

export default class TmHomePage {

    private verticalMarketPlace: ElementFinder;
    private verticalJobs: ElementFinder;
    private verticalProperty: ElementFinder;
    private verticalMotors: ElementFinder;

    constructor () {        
        this.verticalMarketPlace = element(by.buttonText("MarketPlace"));
        this.verticalJobs = element(by.buttonText("Jobs"));
        this.verticalMotors = element(by.buttonText("Motors"));
        this.verticalProperty = element(by.buttonText("property"));
    }

    // get () {
    //     browser.get("https://preview.trademe.co.nz/");        
    // }

    
    clickMarketPlaceVertical() {
        return this.verticalMarketPlace.click();    
    }

    clickJobsVertical() {  return this.verticalJobs.click();   }

    clickMotorsVertical() {  return this.verticalMotors.click();    }

    clickPropertyVertical() { return this.verticalProperty.click() }


}