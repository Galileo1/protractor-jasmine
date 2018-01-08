import { ElementArrayFinder, ElementFinder } from "protractor";
import * as PromiseBB from 'bluebird';

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
 * is element checked
 * @param {ElementArrayFinder} elementArray
 * @returns {Promise<boolean>}
 */
const itemExists = async (elementAll: ElementArrayFinder, name: string) => {
    const fn = await elementAll.map((elm: ElementFinder) => { return elm.getText() });
    const itemList = await PromiseBB.all(fn);
    const filterdList = itemList.filter(item => item === name);
    return filterdList.length == 1;    
}



module.exports = {
    getElementArrayText,
    hasValue
}