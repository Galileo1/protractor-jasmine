import { browser, by, element, ElementFinder, ElementArrayFinder, ExpectedConditions } from 'protractor';
import { BasePage } from './BasePage.po';
import { WebElementWrapper } from '../../helpers/WebElementWrapper';
import { timeout } from '../config/constants';
import { IBlinkLoginDrawer } from './IBlinkLoginDrawer.po';
import { waitForElement } from '../../helpers/WaitHelpers';

export class BlinkHomePage extends BasePage {
    
    private homePageContainer: ElementFinder;
    private locations: ElementArrayFinder;
    private navLocation : ElementFinder;
    private mobLocation : ElementFinder;
    private iblinkMemberLogin : ElementFinder;
    

    //mobile
    private deviceViewHeader: ElementFinder;
    private deviceViewMemberLogin: ElementFinder;
    private deviceViewHamburgerMenu: ElementFinder;
    private mobileLocations: ElementFinder;


    constructor () {
        super();
        this.homePageContainer = element(by.css('div#page-container'));
        this.locations = element.all(by.xpath('//span[@data-hover="Locations"]'));
        this.navLocation = element(by.css('div.nav-list:nth-child(2) > a:nth-child(2) > div:nth-child(1) > span:nth-child(1)'));
        this.iblinkMemberLogin = element(by.css('p.account-nav'));
        this.mobileLocations = element(by.css('a.locations:nth-child(1) > div:nth-child(1) > span:nth-child(1)'));
        
        this.deviceViewHeader = element(by.css('header.header.cf.slide-trans'));
        this.deviceViewMemberLogin = element(by.css('div.account-button'));
        this.deviceViewHamburgerMenu = this.deviceViewHeader.element(by.css('.mobile-menu-open > span:nth-child(1)'));
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
        return WebElementWrapper.waitForElementToBeClickable(this.deviceViewHamburgerMenu);
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
        if (this.homePageContainer.hasClass('mobile-view-activated')) {
            return this.deviceViewMemberLogin.safeClick();
        } else {
            return this.iblinkMemberLogin.safeClick();
        }
    }

   weAreOnBlinkHomePage() {
       let titleHas = ExpectedConditions.titleContains('Blink Fitness. Join For As Low As $15. Make Your Move! | Personal Training | Find A Gym Near Me');
       let memberLoginIsPresent = ExpectedConditions.visibilityOf(this.iblinkMemberLogin);
       let deviceMemberLoginIsPresent = ExpectedConditions.visibilityOf(this.deviceViewMemberLogin);
       let eitherOfLoginIsVisible = ExpectedConditions.or(memberLoginIsPresent, deviceMemberLoginIsPresent);
       return browser.wait(ExpectedConditions.and(titleHas, eitherOfLoginIsVisible),timeout.VERYLONG_TIMEOUT)
       .then(() => true, () => false);
   }
}