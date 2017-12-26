import { browser, by, element, ElementFinder, ElementArrayFinder } from 'protractor';
import { WebElement } from 'selenium-webdriver';
import { WebElementWrapper } from '../../helpers/WebElementWrapper';

export abstract class BasePage {     

    public sideBarNavMenu : ElementArrayFinder;
    public headerPromoMenu : ElementArrayFinder
    // private mobLocation : ElementFinder
    // private passwordToasterContent: ElementFinder;    

    goto (url : string) {
        browser.get(url);
    }
    
    quitBrowser () {
        if (browser != null) {
            browser.quit();
        }
    }

    getPageTitle () {
        return browser.getTitle();
    }

    getCurrentUrl() {
        return browser.getCurrentUrl();
    }

    refresh() {
        browser.refresh();
    }
    
    selectFromMenu(menuItem: string ) {
        this.sideBarNavMenu = element.all(by.xpath('//aside//div[(@class="nav-list showNav")]/a/div/span'));
        this.headerPromoMenu = element.all(by.xpath('//div[@class="header-promo-banner"]/following-sibling::div//div[@id="closeNav"]/following-sibling::a/div/span'));
        WebElementWrapper.findElementUsingText(this.headerPromoMenu, menuItem);
    }

}