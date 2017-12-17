import { browser, by, element, ElementFinder, ExpectedConditions, ElementArrayFinder } from 'protractor';
import constants from '../e2e-tests/config/constants';
import * as _ from 'lodash';


export class WebElementWrapper {  

    constructor () { } 

    static findElement(element : ElementFinder) {
        return  browser.wait(ExpectedConditions.visibilityOf(element),  constants.DEFAULT_TIMEOUT);
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
        })

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
        return browser.wait(ExpectedConditions.elementToBeClickable(element), constants.DEFAULT_TIMEOUT)
            .then(() => { 
                return element.click(); 
            })
            .catch((error) => {                
                 return browser.executeScript("arguments[0].click();", element.getWebElement());
            });    
    }

    static waitForElementToBeVisible(element : ElementFinder) {
        return browser.wait(ExpectedConditions.elementToBeClickable(element), constants.DEFAULT_TIMEOUT).then(() => element.click());
    }    

    static enterText(element : ElementFinder, text : string) {        
        return browser.executeScript('arguments[0].value="' + text + '"', element.getWebElement());
    }

    static selectCheckBox(element: ElementFinder) {
        if (!element.isSelected()) {
            return element.click();
        } else {
            console.info("Element is already selected.")
        }
    }

    static waitForAnyPageToLoad() {
        browser.wait(() => {
            return browser.executeScript('return document.readyState').then((readyState) => {
              return readyState === 'complete';
            });
          });
    }

    static waitForVisibleByLocator(locator, delay) {        
        browser.wait(() => element(locator).isPresent(), delay)
        .then(() => browser.wait(() => element(locator).isDisplayed(), delay))
        .then(() => element(locator));
    }


    /**
     * [selectWindow Focus the browser to the index window. Implementation by http://stackoverflow.com/questions/21700162/protractor-e2e-testing-error-object-object-object-has-no-method-getwindowha]
     * @param  {[Object]} index [Is the index of the window. E.g., 0=browser, 1=FBpopup]
     * @return {[!webdriver.promise.Promise.<void>]}       [Promise resolved when the index window is focused.]
     */
    static selectWindowByIndex(index) {
        
        // wait for handels[index] to exists
        browser.driver.wait(function() {
        return browser.driver.getAllWindowHandles().then(function (handles) {
            /**
             * Assume that handles.length >= 1 and index >=0.
             * So when i call selectWindow(index) i return
             * true if handles contains that window.
             */
            if(handles.length > index) {
                return true;
            }
            });
        });
        // here i know that the requested window exists

        // switch to the window
        return browser.driver.getAllWindowHandles().then(function (handles) {
        return browser.driver.switchTo().window(handles[index]);
        });
    };

    static waitUtilDisplayed(locator: ElementFinder) {
        browser.manage().timeouts().implicitlyWait(0);
        browser.wait(function () {
            browser.sleep(2000);
            return locator.isDisplayed()
            .then(
                function (isDisplayed) { 
                    return isDisplayed; 
                }, 
                function (error) { 
                    return false 
                });
        }, 20 * 1000);
    }

    static generateEmail(membership: string, club: string) {
        let domain = '@robot.com';
        return (membership + club + '_'+_.times(6, () => _.random(35).toString(36) ).join('')  + '_' + new Date().toJSON().slice(0,10).replace(/-/g,'')  + domain);
    }

          
}