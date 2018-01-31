import { ElementArrayFinder, ElementFinder } from 'protractor/built/element';
import * as PromiseBB from 'Bluebird';
import { promise, browser, ExpectedConditions} from 'protractor';
import { timeout } from '../e2e-tests/config/constants';
import { falseIfMissing } from './util';


/* tslint:disable:only-arrow-functions */
declare module 'protractor/built/element' {
    export interface ElementArrayFinder {
      getByText(text: string) : ElementFinder;
      hasItem(text: string) : Promise<boolean>;
    }

    export interface ElementFinder {
        sendText(text: string) : promise.Promise<void>;
        safeClick() : promise.Promise<void>;
        hasClass(clazz: string) : promise.Promise<boolean>;
        hasAttributeValue(attribute: string, value: string) : promise.Promise<boolean>;
        isVisibleIn(time: number) : promise.Promise<boolean>;
    }
}

/**
 * Returns the first ElementFinder whos text matches the compareText passed as parameter. 
 * 
 * @example
 * let firstElement = element.all(by.css('.items li')).getByText('foo');
 * firstElement.click();
 * 
 * @param  {string} compareText
 * @returns {ElementFinder} finder representing element whos text matches the text passed in argument.
 */
ElementArrayFinder.prototype.getByText = function (compareText) {
    let foundElement;
    return this.filter(function (element) {
       return element.getText().then(function (elementText) {
            return elementText.trim() === compareText;
        });
    }).first();
};

/**
 * Checks whether the elements in array has the given text.This is using async/await for readability purpose.
 * 
 * @example
 * element.all(by.css('foo')).hasItem('bar');
 * 
 * @param  {string} compareText
 * @returns {Promise<boolean>} A promise that resolves in a boolean value.
 */
ElementArrayFinder.prototype.hasItem = async function (compareText) {
    const itemText = await this.map((element: ElementFinder) => element.getText());
    const itemList = await PromiseBB.all(itemText);
    const filterdList = itemList.filter(item => item === compareText);
    return filterdList.length == 1;
};

/**
 * clear the input field and send text
 *
 * @example
 * element(by.css('foo.input')).sendText('desiredText');
 *
 * @param  {string} text
 * @returns {promise.Promise<void>} A promise that resolves to void.
 */
ElementFinder.prototype.sendText = function (text: string) {
    let self = this;
    return self.clear().then(function () {
        self.sendKeys(text);
    });
};

/**
 * Safely click the element when element is clickable. 
 * 
 * @example
 * element(by.css('foo.button.or.link)).safeClick();
 * 
 * @returns {promise.Promise<void>} returns a promise that later resolves to void.
 */
ElementFinder.prototype.safeClick = function () {
    let self = this;
    return browser.wait(ExpectedConditions.elementToBeClickable(self), timeout.DEFAULT)
        .then(function () {
            return self.click(); //if found
        }, function () {
            falseIfMissing; //error
        });
};

/**
 * Get the first Element from an array of elements whose attribute value matches the desired value
 * 
 * @example
 * element.all(by.css('foo.element')).getByAttribute('class', 'bar')
 * 
 * @returns {ElementFinder} returns first ElementFinder that matches the condition
 */
ElementArrayFinder.prototype.getByAttribute = function (attribute, value) {
    return this.filter(function (element, index) {
        return element.getWebElement().getAttribute(attribute).then(function (elementAttribute) {
            return elementAttribute === value;
        });
    }).first();
};

/**
 * Checks whether the element has the given class attribute
 * 
 * @example
 * element(by.css('foo')).hasClass('bar')
 * 
 * @returns {promise.Promise<boolean>} returns promise that resolves in a boolean (true/false) value.
 */
ElementFinder.prototype.hasClass = function (clazz: string) {
    return this.getAttribute('class').then(function (className) {
        return className === clazz;
    });
};

/**
 * Checks whether the element has the given attribute and attribute has given vlaue
 * 
 * @example
 * element(by.css('foo')).hasAttributeValue('style',bar')
 * 
 * @returns {promise.Promise<boolean>} returns promise that resolves in a boolean (true/false) value.
 */
ElementFinder.prototype.hasAttributeValue = function (attribute: string, value: string) {
    return this.getAttribute(attribute).then(function (attributeValue) {
        return attributeValue === value;
    });
};

/**
 * Checks whether the element is visible in given time
 * 
 * @example
 * element(by.css('foo')).isVisibleIn(5000)
 * 
 * @returns {promise.Promise<boolean>} returns promise that resolves in a boolean (true/false) value.
 */
ElementFinder.prototype.isVisibleIn = function (time: number) {
    let self = this;
    return browser.wait(ExpectedConditions.visibilityOf(self), time)
        .then(function () {
            return true;
        }, function () {
            console.error(`Element: ${self.toString()} is not visible in ${time} seconds.}`);
            return false;
        });
};

export *  from 'protractor';