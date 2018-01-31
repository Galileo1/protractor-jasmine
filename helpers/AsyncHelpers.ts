import { ElementArrayFinder, ElementFinder, browser } from 'protractor';
import * as PromiseBB from 'bluebird';
import { timeout } from '../e2e-tests/config/constants';

/* tslint:disable:arrow-return-shorthand */

/**
 * get the Array of all text from element.all
 * @param {ElementArrayFinder} elementArray
 * @returns {Promise<string>}
 */
export const getElementArrayText = async (elementArray: ElementArrayFinder) => {
   return await elementArray.getText();
};

/**
 * check if element has attribute value which matches with value parameter
 * @param {ElementFinder} element
 * @returns {Promise<boolean>}
 */
export const hasValue = async (element: ElementFinder, value: string) => {
    return await element.getAttribute('value') === value;
};

/**
 * check if element has attribute value which matches with value parameter
 * @param {ElementFinder} element
 * @returns {Promise<boolean>}
 */
export const hasClass = async (element: ElementFinder, clazz: string) => {
    return await element.getAttribute('class') === clazz;
};

/**
 * is element disabled
 * @param {ElementFinder} element
 * @returns {Promise<boolean>}
 */
export const isDisabled = async (element: ElementFinder) => {
    return await element.get.getAttribute('disabled');
};

/**
 * is element checked
 * @param {ElementFinder} element
 * @returns {Promise<boolean>}
 */
export const isChecked = async (element: ElementFinder) => {
    return await element.getAttribute('checked');
};

/**
 * check whether value exist in an element array 
 * @param {ElementArrayFinder} elementArray
 * @returns {Promise<boolean>}
 */
export const itemExists = async (elementAll: ElementArrayFinder, name: string) => {
    const itemText = await elementAll.map((elm: ElementFinder) => elm.getText());
    const itemList = await PromiseBB.all(itemText);
    const filterdList = itemList.filter(item => item === name);
    return filterdList.length == 1;
};

export const getMatchingElement = async (elementAll: ElementArrayFinder, name: string) => {
    const itemText = await elementAll.map((elm: ElementFinder) => elm.getText());
    const itemList = await PromiseBB.all(itemText);
    try {
        return await elementAll.filter(ele => ele.getText().then(text => text === name)).first();
    } catch (exception) {
        console.error(`Cannot find text '${name}', in element array '${itemList}'`);
    }
};

export const sendText = async (element: ElementFinder, text: string) => {
    return await element.clear().then(()=> element.sendKeys(text));
};

export const openPopUpModal = (element: ElementFinder,popUpModal: ElementFinder) => {
    browser.actions().mouseMove(element).click().perform().then(()=> {
        browser.wait(()=> {
            return popUpModal.getAttribute('style').then((display) => display === 'display: block');
        }, timeout.SHORT).then((isModalOpen)=>{
            if (isModalOpen) {
                console.log(`popup modal is open`);
            } else {
                console.log(`popup modal is not open`);
            }
        });
    });
};

// module.exports = {
//     getElementArrayText,
//     hasValue,
//     itemExists,
//     openPopUpModal,
//     isChecked
// }