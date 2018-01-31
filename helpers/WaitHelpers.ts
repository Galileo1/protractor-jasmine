import { BasePage } from '../e2e-tests/page-objects/BasePage.po';
import { browser, element, ElementFinder, ElementArrayFinder, ExpectedConditions } from 'protractor';
import { timeout } from '../e2e-tests/config/constants';
import { By } from 'selenium-webdriver';
import { isDisabled } from './AsyncHelpers';


/**
 * wait with 3sec polling 
 * @param {Promise<any>}
 * @returns {ElementFinder}
 */
// export const not = (promise) => {
//     return promise.then((result: boolean) => !result);
// }
function not(promise) {
    return promise.then((result: boolean) => !result);
}

/**
 * wait with 3sec polling 
 * @param {WebElement} element
 * @returns {ElementFinder}
 */
export const waitForElement = (element: ElementFinder, timeOut: number) => {
    //set implicit wait to zero so that it doesn't interfere with the polling interval
    browser.manage().timeouts().implicitlyWait(0);
    browser.wait(()=> {
        browser.sleep(timeout.POLLING);
        return element.isDisplayed()
        .then((isDisplayed: boolean) => isDisplayed)
        .catch((error: string ) => {
            console.info(`Waiting for ${element.getRawId()} to be displayed...`);
            return false;
        });
    }, timeOut);

    return element;
};

/**
 * wait with 3sec polling 
 * @param {WebElement} element
 * @returns {Boolean}
 */
export const waitForElementToDisappear = (element: ElementFinder, timeOut: number) => {
    //set implicit wait to zero so that it doesn't interfere with the polling interval
    browser.manage().timeouts().implicitlyWait(0);
    browser.wait(()=> {
        browser.sleep(timeout.POLLING);
        return not(element.isDisplayed())
        .then((isDisplayed) => isDisplayed)
        .catch((error: string ) => {
            console.info(`Waiting for ${element.getId()} to disappear...`);
            return false;
        });
        
    }, timeOut);
};

/* tslint:disable */
export const waitForElementToBeVisible = (element: ElementFinder, timeOut: number) => {
    return browser.wait(ExpectedConditions.visibilityOf(element), timeOut).then(() => element.isDisplayed());    
};

export const waitForElementToBeInVisible = (element: ElementFinder, timeOut: number) => {
    return browser.wait(ExpectedConditions.invisibilityOf(element), timeOut).then(() => element.isPresent());
};