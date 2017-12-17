import { browser, by, element, ElementFinder, ElementArrayFinder } from 'protractor';
import { BasePage } from './BasePage.po';
import { WebElementWrapper } from '../../helpers/WebElementWrapper';
import { WebElement } from 'selenium-webdriver';

export class LocationsPage extends BasePage {
    tempJoinNow: ElementFinder;
    private locationUrl: ElementFinder;
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
        this.tempJoinNow = element(by.xpath('//*[@id="nav"]/div[2]/a[7]/div/span'));
        this.locationPageModal = element(by.css('#blinkModal .modal-dialog'));        
        this.closeModal = element(by.css('#blinkModal .close'));        
        this.clubsLocation = element.all(by.xpath('//div[@class="area-block-clubs"]/ul/li//h5'));
        //this.greenPlanSubscription = element(by.xpath("//div[(@class='square-plan green-plan closed')]//a[(@class='btn round')]/span[2]"));
        this.mobilePlanDetails = element(by.xpath('//div[(@class="square-plan green-plan closed")]//span[(@class="arrow")]'))
        this.locationUrl = element(by.xpath('//div[@class="area-block-clubs"]/ul/li//h5/following-sibling::div//descendant::a[(@class="btn go-to-location")]'));
    }
    
    closePopUpModalIfOpen() {        
        // this.locationPageModal.isDisplayed().then((isDisplayed) => {
        //     if (isDisplayed) {
        //         this.closeModal.click();
        //     } else {
        //         console.log("Pop Up Modal is not there.");
        //     }
        // })

       let isDisplayed = WebElementWrapper.waitUtilDisplayed(this.locationPageModal);
       if (isDisplayed) {
           this.closeModal.click();
       } else {
           console.log("Pop Up Modal is not there.");
       }
    }

    selectYourPreferedClubLocation(preferLocation : string ) {        
        WebElementWrapper.findElementByText(this.clubsLocation, preferLocation)
       //WebElementWrapper.selectClubLocation(this.preferedJoiningLocation);
    }

    subscribeForGreenPlan() {        
        WebElementWrapper.waitForElementToBeClickable(this.greenPlanSubscription); 
    }

    selectMembershipPlan() {
        WebElementWrapper.waitForElementToBeClickable(this.mobilePlanDetails);
        this.subscribeForGreenPlan();        
    }


    getUrlOfLocationPage() {
        return this.getCurrentUrl();
    }

    subscribeToMembershipPlan(color : string) {
        /**
         * color: [green,blue,gray]
         */
        let planLocator = '//div[(@class="square-plan '+ color +'-plan closed")]//a[(@class="btn round")]/span[2]';
        let planSubscription = element(by.xpath(planLocator));
        WebElementWrapper.waitForElementToBeClickable(planSubscription);
    }

    clickJoinNow() {
        this.tempJoinNow.click();
    }

    pageRefresh() {
        this.refresh();
    }
    
}