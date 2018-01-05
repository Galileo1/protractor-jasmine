import { browser, by, element, ElementFinder, ElementArrayFinder, Key , ExpectedConditions} from 'protractor';
import { BasePage } from './BasePage.po';
import { SelectWrapper } from '../../helpers/SelectWrapper';
import { WebElementWrapper } from '../../helpers/WebElementWrapper';
import { WebElement } from 'selenium-webdriver';
import constants from '../config/constants';

export class IBlinkPage extends BasePage{

    private welcomeToBlinkModal: ElementFinder;

    constructor () { 
        super();
        this.welcomeToBlinkModal = element(by.css('div.welcome-modal-content'));
    }

    iBlinkPageIsDisplayed() {
       return WebElementWrapper.elementIsDisplayed(this.welcomeToBlinkModal);
    }

    // selectFromHeroModule(page : string) {

        
    // }

}