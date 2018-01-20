import { ElementArrayFinder, ElementFinder } from 'protractor/built/element';
import * as PromiseBB from 'Bluebird';
import { protractor } from 'protractor';

declare module 'protractor/built/element' {
    export interface ElementArrayFinder {
      getByText(text: string) : ElementFinder;
      hasItem(text: string) : Promise<boolean>;
    }
  }


ElementArrayFinder.prototype.getByText = function (compareText) {    
    let foundElement;
    return this.filter(function (element) {        
       return element.getText().then(function (elementText) {
            console.log(`elementText ${elementText}`)
           return elementText.trim() === compareText;
        });
    }).first();  
}

ElementArrayFinder.prototype.hasItem = async function (compareText) {    
    const itemText = await this.map((element: ElementFinder) => { return element.getText() });
    const itemList = await PromiseBB.all(itemText);
    const filterdList = itemList.filter(item => item === compareText);
    return filterdList.length == 1;  
}

export *  from 'protractor';




