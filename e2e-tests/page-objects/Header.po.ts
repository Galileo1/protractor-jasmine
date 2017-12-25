import { browser, by, element, ElementFinder, ElementArrayFinder, Key , ExpectedConditions} from 'protractor';
import { BasePage } from './BasePage.po';
import { SelectWrapper } from '../../helpers/SelectWrapper';
import { WebElementWrapper } from '../../helpers/WebElementWrapper';
import { WebElement } from 'selenium-webdriver';
import constants from '../config/constants';

export class Header {

    private header: ElementArrayFinder;

    constructor () { 
        this.header = element.all(by.css('div.header-promo-banner + div.nav-list >a'));
    }

   selectFromNavMenuHeader(headerText: string) {
        return WebElementWrapper.findElementUsingText(this.header, headerText);       
   }


}
