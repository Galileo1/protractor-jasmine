import { browser, by, element, ElementFinder, ExpectedConditions, ElementArrayFinder } from 'protractor';
import constants from '../e2e-tests/config/constants';
import * as _ from 'lodash';


export class WebElementWrapper {  

    
    constructor () {

    } 

    static findElement(element : ElementFinder) {
        return  browser.wait(ExpectedConditions.visibilityOf(element),  constants.DEFAULT_TIMEOUT);
    }

    static findElementByText(elements: ElementArrayFinder, text: string) {
        elements.filter((elem, index) => {
            return elem.getText().then((eletext) => {
              return eletext === text;
            });
          }).first().click();

    }
       
    static waitForElementToBeClickable(element : ElementFinder) {  
        return browser.wait(ExpectedConditions.elementToBeClickable(element), constants.DEFAULT_TIMEOUT)
            .then(() => { return element.click() })
            .catch((error) => {
                // console.log("===failed caný click element====", error); 
                 return browser.executeScript("arguments[0].click();", element.getWebElement());
            });
        //return browser.executeScript("arguments[0].click();", element.getWebElement());
        //return browser.wait(ExpectedConditions.elementToBeClickable(element), 80000).then(()=>element.click());
        //browser.actions().mouseMove(element).click();
        //console.log("m here2");
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
          
}