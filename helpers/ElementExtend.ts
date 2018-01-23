import { ElementArrayFinder, ElementFinder } from 'protractor/built/element';
import * as PromiseBB from 'Bluebird';
import { promise} from 'protractor';

declare module 'protractor/built/element' {
    export interface ElementArrayFinder {
      getByText(text: string) : ElementFinder;
      hasItem(text: string) : Promise<boolean>;
    }

    export interface ElementFinder {
        sendText(text: string) : promise.Promise<void>;        
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
}

/**
 * @param  {string} compareText
 * @returns {Promise<boolean>} A promise that resolves in a boolean value.
 */
ElementArrayFinder.prototype.hasItem = async function (compareText) {    
    const itemText = await this.map((element: ElementFinder) => { return element.getText() });
    const itemList = await PromiseBB.all(itemText);
    const filterdList = itemList.filter(item => item === compareText);
    return filterdList.length == 1;  
}

/**
 * @param  {string} text
 * @returns {promise.Promise<void>} A promise that resolves to void.
 */
ElementFinder.prototype.sendText = function (text: string) {
    let self = this;
    return self.clear().then(function() {        
        self.sendKeys(text);
    });    
}

export *  from 'protractor';