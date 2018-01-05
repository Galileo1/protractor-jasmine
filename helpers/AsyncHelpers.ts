import { ElementArrayFinder, ElementFinder } from "protractor";

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

// /**
//  * is element checked
//  * @param {ElementFinder} element
//  * @returns {Promise<boolean>}
//  */
// const itemExists = async (element: ElementFinder, item: string) => {
//     const itemList = Promise.
// }



module.exports = {
    getElementArrayText,
    hasValue
}