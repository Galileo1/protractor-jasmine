import { browser, by, element, ElementFinder, ElementArrayFinder } from 'protractor';
import { BasePage } from './BasePage.po';
import { WebElementWrapper } from '../../helpers/WebElementWrapper';

export class LocationsPage extends BasePage {
    private mobilePlanDetails: ElementFinder;
    private pageUrl : string = "https://www.blinkfitness.com/locations?icmp=hdr_module_locations";
    private locationPageModal : ElementFinder;
    private closeModal : ElementFinder;
    private clubsLocation : ElementArrayFinder;
    private someElement: ElementFinder;
    private preferedJoiningLocation = "Blink Boerum Hill";
    private greenPlanSubscription : ElementFinder;

    constructor() {
        super();
        this.locationPageModal = element(by.css('#blinkModal'));        
        this.closeModal = element(by.xpath('//button[contains(@class,"close")]'));
        this.clubsLocation = element.all(by.xpath('//div[@class="area-block-clubs"]/ul/li//h5'));
        this.greenPlanSubscription = element(by.xpath("//div[(@class='square-plan green-plan closed')]//a[(@class='btn round')]/span[2]"));
        this.mobilePlanDetails = element(by.xpath('//div[(@class="square-plan green-plan closed")]//span[(@class="arrow")]'))

    }

    
    closePopUpModalIfOpen() {        
        this.locationPageModal.isDisplayed().then((isDisplayed)=>{
            if (isDisplayed) {
                this.closeModal.click();
            } else {
                console.log("Pop Up Modal is not there.");
            }
        })

    }

    selectYourPreferedClubLocation() {        
        WebElementWrapper.findElementByText(this.clubsLocation, this.preferedJoiningLocation)
    }

    subscribeForGreenPlan() {        
        WebElementWrapper.waitForElementToBeClickable(this.greenPlanSubscription); 
    }
}