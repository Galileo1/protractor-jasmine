import { browser, by, element, ElementFinder, ExpectedConditions, ElementArrayFinder, protractor } from 'protractor';
import { timeout } from '../e2e-tests/config/constants';
import * as _ from 'lodash';
import { By } from 'selenium-webdriver';
import * as PromiseBB from 'bluebird';


export class WebElementWrapper {

    constructor () { }

    static findElement(element : ElementFinder) {
        return browser.wait(ExpectedConditions.visibilityOf(element),  timeout.DEFAULT);
    }

    static sendText(element: ElementFinder, text: string) {
        element.clear();
        element.sendKeys(text);
    }

    static findElementByText(elements: ElementArrayFinder, text: string) {
        
        const newLocal = WebElementWrapper.selectClubLocation(text);

        elements.each((element, index) => {
                element.getText().then((eleText) => {
                    if (eleText === text) {
                        return element.click();
                    }
                }).catch ((error) => {
                    console.log("failed to find element ::" + error);
                    return newLocal;
                });
        });

    }

    /**select club locations based on the location passed */
    static selectClubLocation(loc: string) {
        return browser.executeScript('var inputs = document.getElementsByClassName("location-name");' +
                                    'for(var i = 0; i < inputs.length; i++) { ' +
                                        ' if (inputs[i].innerText === "' + loc + '") { ' +
                                            ' inputs[i].click(); } ' +
                                        '}');
    }
       
    static waitForElementToBeClickable(element : ElementFinder) {
        return browser.wait(ExpectedConditions.elementToBeClickable(element), timeout.DEFAULT)
            .then(() => element.click())
            .catch((error) => browser.executeScript("arguments[0].click();", element.getWebElement()));
    }

    static waitForElementToBeVisible(element : ElementFinder) {
        return browser.wait(ExpectedConditions.elementToBeClickable(element), timeout.DEFAULT).then(() => element.click());
    }

    static enterText(element : ElementFinder, text : string) {
        return browser.executeScript('arguments[0].value="' + text + '"', element.getWebElement());
    }

    static selectCheckBox(element: ElementFinder) {
        if (!element.isSelected()) {
            return element.click();
        } else {
            console.info("Element is already selected.");
        }
    }

    static waitForAnyPageToLoad() {
        browser.wait(() => browser.executeScript('return document.readyState').then((readyState) => readyState === 'complete'));
    }

    static waitForVisibleByLocator(locator, delay) {
        browser.wait(() => element(locator).isPresent(), delay)
        .then(() => browser.wait(() => element(locator).isDisplayed(), delay))
        .then(() => element(locator));
    }

    static findElementUsingText (elements: ElementArrayFinder, findText: string) {
        let exist = browser.wait(presenceOfAll(elements), timeout.DEFAULT);
        if (exist) {
            elements.filter((eachElement, index) => eachElement.getText().then((text: string ): boolean => text === findText))
            .then((filteredElement) => {
                console.log(` match found : ${filteredElement.length}`);
                if (filteredElement.length > 0) {
                    filteredElement[0].click();
                } else {
                    getElementArrayText(elements);
                    throw new Error(`couldn't find : ${findText}`);
                }
            });
            
        }

        // elements.filter((element, index) => {
        //     return element.getText().then((text) => {
        //         return text === findText;
        //     });
        // }).first().click();

       
    }

    /**
     * Scroll to an element
     * @param {WebElement} element
     * @returns {Promise}
     */
    static scrollTo (element: ElementFinder) {
        return browser.executeScript('arguments[0].scrollIntoView()', element.getWebElement());
    }

    /**
     * wait with 3sec polling and 30sec timeout
     * @param {WebElement} element
     * @returns {Boolean}
     */
    static waitFor(by: By) {
        //set implicit wait to zero so that it doesn't interfere with the polling interval
        browser.manage().timeouts().implicitlyWait(0);
        browser.wait(() => {
            browser.sleep(timeout.POLLING);
            return element(by).isDisplayed()
            .then((isDisplayed) => isDisplayed)
            .catch((error) => false);
        }, timeout.DEFAULT);
    }

    static async itemExits(elementAll: ElementArrayFinder, name: string) {
        const fn = await elementAll.map((elm: ElementFinder) => elm.getText());
        const itemList = await PromiseBB.all(fn);
        const filterdList = itemList.filter(item => item === name);
        return filterdList.length == 1;
    }
}
          
function presenceOfAll(elementArray: ElementArrayFinder) {
    return () => elementArray.count().then((count: number ): boolean => count > 1);
}


function getElementArrayText(elementArray: ElementArrayFinder) {
    // let textArray = [];
    // console.log(`array :::${elementArray.count()} :: ${elementArray.first()}`)
    // elementArray.getText()
    // .then(text => {
    //     console.log(` lenght: ${text.length}`)
    //     console.log(`text: ${text}`)
    //     // text.forEach((ele, index) => { 
    //     //     console.log(`text: ${ele}: index : ${index}`);
    //     // })
    // })
       // return textArray;
       let func = (element) => {
           element.getText().then((text: string ) => {
               text !== 'abc ';
               return text;
           });
        };
       console.log(elementArray.every(func));
}
    
