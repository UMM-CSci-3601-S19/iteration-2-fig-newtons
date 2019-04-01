import {browser, element, by, promise, ElementFinder} from 'protractor';
import {Key} from 'selenium-webdriver';

export class RidePage {
  navigateTo(): promise.Promise<any> {
    return browser.get('/rides');
  }

  // http://www.assertselenium.com/protractor/highlight-elements-during-your-protractor-test-run/
  highlightElement(byObject) {
    function setStyle(element, style) {
      const previous = element.getAttribute('style');
      element.setAttribute('style', style);
      setTimeout(() => {
        element.setAttribute('style', previous);
      }, 200);
      return 'highlighted';
    }

    return browser.executeScript(setStyle, element(byObject).getWebElement(), 'color: red; background-color: yellow;');
  }

  typeInto(field: string, value: string) {
    const input = element(by.id(field));
    input.click();
    input.sendKeys(value);
  }

  getRideTitle() {
    const title = element(by.id('ride-list-title')).getText();
    this.highlightElement(by.id('ride-list-title'));

    return title;
  }

  typeADriverName(name: string) {
    const input = element(by.id('driverName'));
    input.click();
    input.sendKeys(name);
  }

  getSeatNumber(company: string) {
    const input = element(by.id('rideSeatsAvailable'));
    input.click();
    input.sendKeys(company);
    this.click('submit');
  }

  getRides() {
    return element.all(by.className('rides'));
  }

  // getClass(theClass: string) {
  //   return element(by.className(theClass));
  // }

  elementExistsWithId(idOfElement: string): promise.Promise<boolean> {
    if (element(by.id(idOfElement)).isPresent()) {
      this.highlightElement(by.id(idOfElement));
    }
    return element(by.id(idOfElement)).isPresent();
  }

  elementExistsWithCss(cssOfElement: string): promise.Promise<boolean> {
    return element(by.css(cssOfElement)).isPresent();
  }

  getElementById(id: string) {
    return element(by.id(id));
  }

  getElementsByCss(css: string) {
    return element.all(by.css(css));
  }

  getUniqueRide(driver: string) {
    const ride = element(by.id(driver)).getText();
    this.highlightElement(by.id(driver));

    return ride;
  }


  click(idOfButton: string): promise.Promise<void> {
    this.highlightElement(by.id(idOfButton));
    return element(by.id(idOfButton)).click();
  }

  clickClass(classOfButton: string): promise.Promise<void> {
    this.highlightElement(by.className(classOfButton));
    return element(by.className(classOfButton)).click();
  }

  field(idOfField: string) {
    return element(by.id(idOfField));
  }

  button(idOfButton: string) {
    this.highlightElement(by.id(idOfButton));
    return element(by.id(idOfButton));
  }

  getTextFromField(idOfField: string) {
    this.highlightElement(by.id(idOfField));
    return element(by.id(idOfField)).getText();
  }

  getAddRideTitle() {
    const title = element(by.id('ride-add-title')).getText();
    this.highlightElement(by.id('ride-add-title'));

    return title;
  }

}
