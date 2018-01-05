import { BasePage } from "../e2e-tests/page-objects/BasePage.po";
import { browser, element, ElementFinder, ElementArrayFinder } from "protractor";
import { timeout } from "../e2e-tests/config/constants";
import { By } from "selenium-webdriver";


export class Helper {
    
    constructor () {}

    static not(promise) {
        return promise.then((result: boolean) => {
            return !result;
        });
    };

    /**
     * wait with 3sec polling 
     * @param {WebElement} element
     * @returns {ElementFinder}
     */
    static waitForElement(element: ElementFinder, timeOut: number) {
        //set implicit wait to zero so that it doesn't interfere with the polling interval
        browser.manage().timeouts().implicitlyWait(0);
        browser.wait(()=> {
            browser.sleep(timeout.POLLING);
            return element.isDisplayed()
            .then((isDisplayed) => { 
                return isDisplayed;             
            })
            .catch((error)=> { 
                console.info(`Waiting for ${element.getRawId()} to be displayed...`)
                return false; 
            });
        }, timeOut);

        return element;
    }

    /**
     * wait with 3sec polling 
     * @param {WebElement} element
     * @returns {Boolean}
     */
    static waitForElementToDisappear(by: By, timeOut: number) {
        //set implicit wait to zero so that it doesn't interfere with the polling interval
        browser.manage().timeouts().implicitlyWait(0);
        browser.wait(()=> {
            browser.sleep(timeout.POLLING);
            return element(by).isDisplayed()
            .then((isDisplayed) => { 
                console.info(`Waiting for ${by.toString()} to be disappear...`)
                return false; 
            })
            .catch((error)=> { 
                console.info(`Element ${by.toString()} has disappeared...`)                
                return true; 
            });
        }, timeOut);
    }

    /**
     * wait with 3sec polling 
     * @param {ElementArrayFinder} elementArray
     * @returns {Array}
     */
    static getElementArrayText = async (elementArray: ElementArrayFinder) => {
       let textArray = await elementArray.getText();
       return textArray;          
    }
}