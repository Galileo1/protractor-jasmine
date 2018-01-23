import { ProtractorExpectedConditions, ElementFinder, promise } from 'protractor';
import { falseIfMissing } from './util';

declare module 'protractor/built/expectedConditions' {    

    export interface ProtractorExpectedConditions {
        hasSomeText(elementFinder: ElementFinder) : Function;        
    }

}

/**
 * 
 * An expectation for checking if the some text is present in the
 * element. Returns false if the elementFinder does not find an element.
 * 
 * @example
 * var EC = protractor.ExpectedConditions; *
 * browser.wait(EC.hasSomeText($('#locator')), 5000);
 * 
 * @alias ExpectedConditions.hasSomeText
 * 
 * @param  {ElementFinder} elementFinder
 * {!function} An expected condition that returns a promise representing whether some text is present in the element.
 * 
 */
ProtractorExpectedConditions.prototype.hasSomeText = function (elementFinder: ElementFinder) {
    let hasText = function () {
        return elementFinder.getText().then(function (actualText: string) {
            return actualText.length > 1; 
        }, falseIfMissing);    
    };
    return this.and(this.presenceOf(elementFinder), hasText);
}

