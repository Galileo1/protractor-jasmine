import { browser, by, element, ElementFinder, ElementArrayFinder } from 'protractor';
import { BasePage } from './BasePage.po';
import { WebElementWrapper } from '../../helpers/WebElementWrapper';
import { timeout } from '../config/constants';
import { IBlinkLoginDrawer } from './IBlinkLoginDrawer.po';
import { waitForElement } from '../../helpers/WaitHelpers';
// import { BasePage } from './BasePage.po';

export class BlinkHomePage extends BasePage {
    
    private locations: ElementArrayFinder;
    private navLocation : ElementFinder;
    private mobLocation : ElementFinder;
    private iblinkMemberLogin : ElementFinder;
    

    //mobile
    private mobileHamburger: ElementFinder;
    private mobileLocations: ElementFinder;

    constructor () {
        super();
        this.locations = element.all(by.xpath('//span[@data-hover="Locations"]'));
        this.navLocation = element(by.css('div.nav-list:nth-child(2) > a:nth-child(2) > div:nth-child(1) > span:nth-child(1)'));
        this.iblinkMemberLogin = element(by.css('p.account-nav'));
        this.mobileHamburger = element(by.css('.mobile-menu-open > span:nth-child(1)'));
        this.mobileLocations = element(by.css('a.locations:nth-child(1) > div:nth-child(1) > span:nth-child(1)'));
    }

    gotoLocations() {
        return this.navLocation.click().then (() =>
             WebElementWrapper.waitForAnyPageToLoad()
        );
    }

    gotoLocationsUsingADevice() {
        return this.selectTheHamburgerMenu().then(() =>
            this.navigateToLocationsOnDevices()
        );
        
    }

    selectTheHamburgerMenu() {
        return WebElementWrapper.waitForElementToBeClickable(this.mobileHamburger);
    }

    navigateToLocationsOnDevices() {
        return WebElementWrapper.waitForElementToBeClickable(this.mobileLocations).then (() =>
            WebElementWrapper.waitForAnyPageToLoad()
        );
    }

    get() {
        browser.get('/');
    }

    resetBrowserSession() {
        return this.quitBrowser();
    }

    openMemberLoginDrawer() {
        return waitForElement(this.iblinkMemberLogin, timeout.SHORT).click();
    }

    // rightDrawerIsOpen() {
    //     return this.iblinkLoginDrawer.isRightDrawerOpen();
    // }


}