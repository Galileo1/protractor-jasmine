import { ElementArrayFinder, ElementFinder } from 'protractor/built/element';
import { protractor } from 'protractor';

declare module 'protractor/built/element' {
    export interface ElementArrayFinder {
      getByText(text: string) : ElementFinder;
    }
  }


ElementArrayFinder.prototype.getByText = function (compareText) {
    console.log(`elementText---${this}`)
    let foundElement;
    return this.filter(function (element) {
        console.log(`elementText---111`)
       return element.getText().then(function (elementText) {
            console.log(`elementText ${elementText}`)
           return elementText.trim() === compareText;
        });
    }).first();
  
}

export *  from 'protractor';




