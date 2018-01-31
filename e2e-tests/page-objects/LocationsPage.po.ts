import { browser, by, element, ElementFinder, ElementArrayFinder } from 'protractor';
import { BasePage } from './BasePage.po';
import { WebElementWrapper } from '../../helpers/WebElementWrapper';
import { WebElement } from 'selenium-webdriver';

export class LocationsPage extends BasePage {
    private locationUrl: ElementFinder;
    private mobilePlanDetails: ElementFinder;
    private pageUrl : string = 'https://www.blinkfitness.com/locations?icmp=hdr_module_locations';
    private locationPageModal : ElementFinder;
    private closeModal : ElementFinder;
    private clubsLocation : ElementArrayFinder;
    private someElement: ElementFinder;
    private preferedJoiningLocation = 'Blink Boerum Hill';
    private greenPlanSubscription : ElementFinder;

    constructor() {
        super();
        this.locationPageModal = element(by.css('#blinkModal'));
        this.closeModal = element(by.xpath('//button[contains(@class,"close")]'));
        this.clubsLocation = element.all(by.xpath('//div[@class="area-block-clubs"]/ul/li//h5'));
        //this.greenPlanSubscription = element(by.xpath("//div[(@class='square-plan green-plan closed')]//a[(@class='btn round')]/span[2]"));
        this.mobilePlanDetails = element(by.xpath('//div[(@class="square-plan green-plan closed")]//span[(@class="arrow")]'));
        this.locationUrl = element(by.xpath('//div[@class="area-block-clubs"]/ul/li//h5/following-sibling::div//descendant::a[(@class="btn go-to-location")]'));
    }
    
    closePopUpModal() {
        return this.popUpModalIsOpen().then((isOpen) => this.closeModal.safeClick());
    }

    selectYourPreferedClubLocation(preferLocation : string ) {
        WebElementWrapper.findElementByText(this.clubsLocation, preferLocation);
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
    
}