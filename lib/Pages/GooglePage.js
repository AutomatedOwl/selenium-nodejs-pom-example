var BasePage = require('./BasePage');
var By = require('selenium-webdriver').By;
var Promise = require('selenium-webdriver').promise;

/**
 * Locators for the elements in this page
 * @type {string}
 */
var SEARCH_BAR_LOCATOR = "//input[@title='Search']";
var SEARCH_RESULTS_LOCATOR = "//div[@class='srg']/*";

/**
 * Constructor for Google Page
 * @param webdriver
 * @constructor
 */
function GooglePage(webdriver) {
  BasePage.call(this, webdriver);
}

/**
 * BasePage and Constructor wiring
 * @type {BasePage}
 */
GooglePage.prototype = Object.create(BasePage.prototype);
GooglePage.prototype.constructor = GooglePage;

/**
 * Page loaded defined by expected element loaded
 * @returns {GooglePage}
 */
GooglePage.prototype.isLoaded = function() {
  this.waitForDisplayed(By.xpath(SEARCH_BAR_LOCATOR));
  return this;
};

/**
 * Search for given query and submit
 */
GooglePage.prototype.searchFor = function(query) {
  this.getSearchBar().sendKeys(query);
  this.getSearchBar().submit();
};

/**
 * Wait for a results page of 10 results to load
 */
GooglePage.prototype.waitForResults = function() {
  var defer = Promise.defer();
  this.waitForNumberOfElements(By.xpath(SEARCH_RESULTS_LOCATOR), 10)
    .then(function(result) {
      if (result) {
        defer.fulfill(true);
      }
    });
  return defer.promise;
};

/**
 * Validate a given text in results page
 */
GooglePage.prototype.validateResult = function(expectedResult) {
  var defer = Promise.defer();
  this.getResults().then(function(elements) {
    elements.forEach(function(element, index) {
      element.getText().then(function(text) {
        if (text.includes(expectedResult)) {
          console.log("Expected URL found.");
          defer.fulfill(true);
          var linkEelement = element;
          linkEelement.findElements(By.xpath(SEARCH_RESULTS_LOCATOR + "//a"))
            .then(function(linkElements) {
              linkElements[0].click();
            });
          return;
        } else if (index === elements.length - 1) {
          defer.fulfill(false);
        }
      }, function(err) {
        if (err.name === "StaleElementReferenceError");
      });
    });
  });
  return defer.promise;
};

/**
 * Prints a full text of given results in page
 */
GooglePage.prototype.printResults = function() {
  console.log("\n\n" + "Printing results for searching 'Kibana' in Google:");
  console.log("\n" + "-------------------------------------------------------");
  this.getResults().then(function(elements) {
    elements.forEach(function(element) {
      element.getText().then(function(text) {
        console.log("\n\n" + text);
        console.log(
          "\n" + "-------------------------------------------------------");
      });
    });
  });
};

GooglePage.prototype.getSearchBar = function() {
  return this.driver.findElement(By.xpath(SEARCH_BAR_LOCATOR));
};

GooglePage.prototype.getResults = function() {
  return this.driver.findElements(By.xpath(SEARCH_RESULTS_LOCATOR));
};

module.exports = GooglePage;
module.exports.GOOGLE_URL_EN = "http://www.google.com/search?hl=en";
