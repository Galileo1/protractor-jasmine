import { browser, by, element, ElementFinder, ExpectedConditions, ElementArrayFinder } from 'protractor';
import constants from '../e2e-tests/config/constants';
import * as _ from 'lodash';


export class SelectWrapper {

    private element : ElementFinder;
    
    constructor (element: ElementFinder) {
        this.element = element;
    }

    getOptions() {
        return this.element.all(by.tagName('option'));
    }

    getSelectOption() {
        return this.element.all(by.css('option[selected="selected"]'));
    }

    selectByValue(value: string) {
        return this.element.element(by.xpath('//option[(@value="' + value + '")]')).click();
    }

    selectByPartialText(partialText: string ) {
        return this.element.all(by.cssContainingText('option', partialText)).click();
    }

    selectByText(text: string) {
        console.log(by.xpath('//option[contains(text()="' + text + '")]').toString());
        return this.element.element(by.xpath('//option[contains(text(),"' + text + '")]')).click();
        
    }

    selectByIndex(index: number) {
        return this.element.all(by.tagName('option')).then((options) => options[index].click());
    }
}
