var DriverManager = require('./../lib/Drivers/DriverManager');
var GooglePage = require('./../lib/Pages/GooglePage');
var KibanaPage = require('../lib/Pages/KibanaPage');
var Assert = require('chai').assert;
var test = require('selenium-webdriver/testing');

test.describe('Mocha Selenium Tests', function() {
  this.timeout(60000);
  var driver;
  var googlePage;
  var kibanaPage;

  test.before(function() {
    driver = DriverManager.buildDriver();
    googlePage = new GooglePage(driver);
    kibanaPage = new KibanaPage(driver);
  });

  test.it('should load google home page', function() {
    googlePage.open(GooglePage.GOOGLE_URL_EN);
    googlePage.isLoaded();
  });

  test.it('should search for kibana', function() {
    googlePage.searchFor("Kibana");
  });

  test.it('should fully load the first results page', function() {
    googlePage.waitForResults();
  });

  test.it('should print given results', function() {
    googlePage.printResults();
  });

  test.it('should validate kibana result and click on it', function() {
    googlePage.validateResult("www.elastic.co")
      .then(function(result) {
        console.log("Validation of kibana.com result: " + result);
        Assert.equal(result, true);
      });;
  });

  test.it('should verify kibana home page', function() {
    kibanaPage.isLoaded();
    kibanaPage.scrollToElement();
  });

  /**
   * Clean up function after test ends
   */
  test.after(function(done) {
    driver.quit();
    done();
  });
});
