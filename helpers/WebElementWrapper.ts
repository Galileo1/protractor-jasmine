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
        // elements.filter((elem, index) => {
        //     return elem.getText().then((eletext) => {
        //       return eletext === text;
        //     })
        //   }).first().click();
        
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

    static selectClubLocation(loc: string) {
        console.log('var inputs = document.getElementsByClassName("location-name");' +
        'for(var i = 0; i < inputs.length; i++) { ' +
            ' if (inputs[i].innerText === "' + loc + '") { ' + 
                ' inputs[i].click(); } ' +	
            '}');
        return browser.executeScript('var inputs = document.getElementsByClassName("location-name");' +
                                    'for(var i = 0; i < inputs.length; i++) { ' +
                                        ' if (inputs[i].innerText === "' + loc + '") { ' + 
                                            ' inputs[i].click(); } ' +	
                                        '}');
            
       

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