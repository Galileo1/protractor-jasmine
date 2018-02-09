import { ElementFinder, element, by, ElementArrayFinder, browser, ExpectedConditions } from 'protractor';
import { timeout } from '../config/constants';
import { BlinkHomePage } from './BlinkHomePage.po';
import { waitForElementToBeVisible, waitForElementToBeInVisible, waitForElementToDisappear } from '../../helpers/WaitHelpers';
import * as BBPromise from 'Bluebird';
import { BasePage } from './BasePage.po';
import '../../helpers/ElementExtend';
import '../../helpers/ExpectedConditionExtend';

export class IBlinkAccountPage extends BasePage {
    private accountButton: ElementFinder;
    private accountDropdown: ElementFinder;
    private accountOptions: ElementArrayFinder;
    private welcomeModal: ElementFinder;

    constructor() {
        super();
        this.accountButton = element(by.css('div.account-button.logged-in'));
        this.accountDropdown = element(by.css('div.dropdown.open'));
        this.accountOptions = element.all(by.css('div.dropdown.open ul li a'));
        this.welcomeModal = element(by.css('div.welcome-modal-content'));
    }

    openAccountMenu() {
        return this.accountButton.safeClick();
    }

    isAccountMenuOpen() {
        return this.accountDropdown.isVisibleIn(timeout.DEFAULT);
    }

    selectFromAccountMenu(menuItem: string) {
        return this.accountOptions.getByText(menuItem).click();
    }

    logoutFromIblink() {
        return this.openAccountMenu()
        .then(()=> this.isAccountMenuOpen())
        .then((isOpen) => this.selectFromAccountMenu('LOGOUT'),
              (error) => console.error(`Account menu is not open on the iBlink accounts page. Error: ${error}`));
    }

    weAreOnIBlinkAccountPage() {
        let welcomeModalIsVisible = ExpectedConditions.visibilityOf(this.welcomeModal);       
        let iblinkHomePageUrlIsDisplayed = ExpectedConditions.urlContains('iBlink/Home');
        let iblinkAccountPage = ExpectedConditions.titleContains('Accounts Page');
        return browser.wait(ExpectedConditions.and(iblinkHomePageUrlIsDisplayed, iblinkAccountPage, welcomeModalIsVisible), timeout.VERYLONG_TIMEOUT)
        .then(() => true, () => false);
    }

}
