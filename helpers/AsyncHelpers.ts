import { ElementArrayFinder, ElementFinder, browser } from "protractor";
import * as PromiseBB from 'bluebird';
import { async } from "q";

/**
 * get the Array of all text from element.all
 * @param {ElementArrayFinder} elementArray
 * @returns {Promise<string>}
 */
const getElementArrayText = async (elementArray: ElementArrayFinder) => {
   return await elementArray.getText();         
}

/**
 * check if element has attribute value which matches with value parameter
 * @param {ElementFinder} element
 * @returns {Promise<boolean>}
 */
const hasValue = async (element: ElementFinder, value: string) => {
    return await element.getAttribute('value') === value;
}


/**
 * is element disabled
 * @param {ElementFinder} element
 * @returns {Promise<boolean>}
 */
const isDisabled = async (element: ElementFinder) => {
    return await element.getAttribute('disabled');
}


/**
 * is element checked
 * @param {ElementFinder} element
 * @returns {Promise<boolean>}
 */
const isChecked = async (element: ElementFinder) => {
    return await element.getAttribute('checked');
}

/**
 * check whether value exist in an element array 
 * @param {ElementArrayFinder} elementArray
 * @returns {Promise<boolean>}
 */
export const itemExists = async (elementAll: ElementArrayFinder, name: string) => {
    const itemText = await elementAll.map((elm: ElementFinder) => { return elm.getText() });
    const itemList = await PromiseBB.all(itemText);
    const filterdList = itemList.filter(item => item === name);
    return filterdList.length == 1;    
}

export const openPopUpModal = (element: ElementFinder,popUpModal: ElementFinder) => {
    browser.actions().mouseMove(element).click().perform().then(()=> {
        browser.wait(()=> {
            return popUpModal.getAttribute('style').then((display) => {
                return display === 'display: block';
            })
        }, 5000).then((isModalOpen)=>{
            if (isModalOpen) {
                console.log(`popup modal is open`);
            } else {
                console.log(`popup modal is not open`);
            }
        })
    })
}



module.exports = {
    getElementArrayText,
    hasValue,
    itemExists,
    openPopUpModal
}