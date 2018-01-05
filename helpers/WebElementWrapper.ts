import { browser, by, element, ElementFinder, ExpectedConditions, ElementArrayFinder, protractor } from 'protractor';
import constants from '../e2e-tests/config/constants';
import { timeout } from '../e2e-tests/config/constants';
import * as _ from 'lodash';
import { By } from 'selenium-webdriver';
//import * as Promise from 'bluebird';


export class WebElementWrapper {  

    constructor () { } 

    static findElement(element : ElementFinder) {
        return browser.wait(ExpectedConditions.visibilityOf(element),  timeout.DEFAULT);
    }

    static sendText(element: ElementFinder, text: string) {
        return element.clear().then(() => {
            return element.sendKeys(text);
        });
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
        return browser.wait(ExpectedConditions.elementToBeClickable(element), timeout.DEFAULT)
            .then(() => { 
                return element.click(); 
            })
            .catch((error) => {                
                 return browser.executeScript("arguments[0].click();", element.getWebElement());
            });    
    }

    static waitForElementToBeVisible(element : ElementFinder) {
        return browser.wait(ExpectedConditions.elementToBeClickable(element), timeout.DEFAULT).then(() => element.click());
    }    

    static enterText(element : ElementFinder, text : string) {        
        return browser.executeScript('arguments[0].value="' + text + '"', element.getWebElement());
    }

    static selectCheckBox(element: ElementFinder) {
        element.isSelected().then((selected) => {
            if (selected !== true) {
                element.click();
            }
        });        
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
        }, 40 * 1000);
    }

    static generateEmail(membership: string, club: string) {
        let domain = '@robot.com';
        let _dateTime = new Date();
        let _datePart = _dateTime.toJSON().slice(0,10).replace(/-/g,'');
        let _timePart = _dateTime.getHours()+""+_dateTime.getMinutes()+""+_dateTime.getMilliseconds();
        let timeStamp = _datePart+"_"+_timePart;
        let randomString = _.times(6, () => _.random(35).toString(36) ).join('');
        return (membership +"test"+ club + '_'+ timeStamp + domain);
    }     

    // The polling function
    // static poll (fn, timeout, interval) {
    
    //     let endTime = Number(new Date()) + (timeout || 2000);
    //     interval = interval || 100;

    //     let  checkCondition = function(resolve, reject) { 
    //         let ajax = fn();
    //         // dive into the ajax promise
    //         ajax.then( function(response){
    //             // If the condition is met, we're done!
    //             if(response == true) {
    //                 resolve(true);
    //             }
    //             // If the condition isn't met but the timeout hasn't elapsed, go again
    //             else if (Number(new Date()) < endTime) {
    //                 setTimeout(checkCondition, interval, resolve, reject);
    //             }
    //             // Didn't match and too much time, reject!
    //             else {
    //                 reject(new Error('timed out for ' + fn + ': ' + arguments));
    //             }
    //         });
    //     };

    //     return new Promise(checkCondition);
    // }

    // static expectElementToBePresent (locator: ElementFinder) {
    //     this.poll(browser.wait(ExpectedConditions.presenceOf(locator), 1000),2000, 40000).then((resp) => {
    //         console.log(resp);
    //     });
    // }


    static waitElementUntilVisibleOrEnable_ (element, options) {           
        if(_.isUndefined(options)){
            options={};
        }

        options.mustBeTrue = _.isUndefined(options.mustBeTrue) ? true : options.mustBeTrue;
        options.expecation = _.isUndefined(options.expecation) ? true : options.expecation;
        options.testEnable = _.isUndefined(options.testEnable) ? false : options.testEnable;
        options.waitTime = _.isUndefined(options.waitTime) ? 50000 : options.waitTime;
    
        let self=this;
    
        const waitFun = () => {  
            if(options.expecation){
                return element.isPresent().then((present) => {
                    return present && this.isElementDisplayedOrEnabled_(element, options);
                });
            }else{
                return element.isPresent().then((present) => {
                    return !present || !this.isElementDisplayedOrEnabled_(element, options);
                });
            }
        }


        return browser.wait(() => {
            return waitFun();
        }, options.waitTime, "wait for element to be visible:").then(() => {
            console.log("waitElementUntilVisibleOrEnable_("+JSON.stringify(options)+") on :"+options.expecation);
            return options.expecation;
        }, (error) => {
            console.log("Oops!waitElementUntilVisibleOrEnable_("+JSON.stringify(options)+") on met an error:"+error);
            if(options.mustBeTrue){
                throw new Error("Oops!waitElementUntilVisibleOrEnable_("+JSON.stringify(options)+") on met an error:"+error);
            }else{
                return !options.expecation;
            }
        });
    }

    static isElementDisplayedOrEnabled_ = function (element, testEnable) {
        var uponError = true;
        var ret = false;
        var self=this;
        return (function* () {
            let i = 0;
            while (uponError && i < 3) {
                let p;
                if (testEnable) {
                    p = element.isEnabled();
                } else {
                    p = element.isDisplayed();
                }
    
                yield p.then((testResult) => {
                    uponError = false;
                    ret = testResult;
                    return ret;
    
                },  (error) => {
                    uponError = true;
                    console.log("Oops!isElementDisplayedOrEnabled_ when waiting for to be visible/enable, met an error:" + error);
                    ret=false;
                    i++;
                });
    
            }
            return ret;
    
        });
    
    }


    static findByCss(locator: string) {
        let _element = element(by.css(locator));
        this.waitElementUntilVisibleOrEnable_(_element, undefined)        
    }
     
    static findElementUsingText (elements: ElementArrayFinder, findText: string) {
        let exist = browser.wait(presenceOfAll(elements), timeout.DEFAULT);
        if (exist) {
            elements.filter((eachElement, index) => {
                return eachElement.getText().then((text: string ) => {
                    return text === findText;
                });
            }).then((filteredElement) => {
                console.log(` match found : ${filteredElement.length}`)
                if (filteredElement.length > 0) {
                    filteredElement[0].click();
                } else {
                    getElementArrayText(elements);
                    throw new Error(`couldn't find : ${findText}`)
                }
            })
            
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
    };

    /**
     * wait with 3sec polling and 30sec timeout
     * @param {WebElement} element
     * @returns {Boolean}
     */
    static waitUntilDisplayed(by: By, timeOut: number) {
        //set implicit wait to zero so that it doesn't interfere with the polling interval
        browser.manage().timeouts().implicitlyWait(0);
        browser.wait(()=> {
            browser.sleep(timeout.POLLING);
            return element(by).isDisplayed()
            .then((isDisplayed) => { 
                return isDisplayed; 
            })
            .catch((error)=> { 
                console.error(`Waiting for ${by.toString()} to be displayed...`)
                return false; 
            });
        }, timeOut);
    }

    /**
     * @param element {ElementFinder}
     * @returns {Promise.<ElementFinder>}
     */
    static elementIsDisplayed = async (element: ElementFinder) => {
        let isDisplayed : boolean = await element.isDisplayed();            
        return isDisplayed;
    };



    static waitUntilInvisiilityOf(timeOut: number, func: any) {
        //set implicit wait to zero so that it doesn't interfere with the polling interval
        browser.manage().timeouts().implicitlyWait(0);
        browser.wait(()=> {
            browser.sleep(timeout.POLLING);
            return func
            .then((conditionIsTrue) => { 
                return conditionIsTrue; 
            })
            .catch((error)=> { 
                console.error(`Fail`)
                return false; 
            });
        }, timeOut);
    } 


}

function presenceOfAll(elementArray: ElementArrayFinder) {
    return () => {
        return elementArray.count().then((count: number ): boolean => {
            return count > 1;
        })        
    };
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
               text !== 'abc '
               return text;
           })

       }
       console.log(elementArray.every(func));
}

function invisibilityOf() {
    let placeHoder = undefined;    
    return () => ExpectedConditions.invisibilityOf(placeHoder);
}
    
