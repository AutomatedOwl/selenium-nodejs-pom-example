var BasePage = require('./BasePage');
var By = require('selenium-webdriver').By;

/**
 * Header title locator in Kibana page
 */
var HEADER_TITLE_LOCATOR = "//div[@class = 'navigation-wrapper']";
var FOOTER_LOCATOR = "//input[@id = 'Email']";

/**
 * Constructor for Kibana Page
 * @param webdriver
 * @constructor
 */
function KibanaPage(webdriver) {
  BasePage.call(this, webdriver);
}

/**
 * BasePage and Constructor wiring
 * @type {BasePage}
 */
KibanaPage.prototype = Object.create(BasePage.prototype);
KibanaPage.prototype.constructor = KibanaPage;

/**
 * Page loaded defined by validating header title
 * @returns {KibanaPage}
 */
KibanaPage.prototype.isLoaded = function() {
  this.waitForDisplayed(By.xpath(HEADER_TITLE_LOCATOR));
  return this;
};

/** Scroll into given web element */
KibanaPage.prototype.scrollToElement = function() {
  this.driver.executeScript("arguments[0].scrollIntoView(true);",
    this.driver.findElement(By.xpath(FOOTER_LOCATOR)));
  this.waitForDisplayed(By.xpath(FOOTER_LOCATOR));

  // Sleep before last driver method end
  this.driver.sleep(5000);
};

module.exports = KibanaPage;
