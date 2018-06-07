var environment_config = require('./../../environment-config');
var webdriver = require('selenium-webdriver');
var browser_key = 'chrome';
var env_key = 'localhost';

/** Builds WebDriver object for tests */
var buildDriver = function() {
  var env = environment_config[env_key.toLowerCase()];
  return new webdriver.Builder()
  .usingServer("http://" + env.hostname + ":" + env.port + "/wd/hub")
  .withCapabilities(webdriver.Capabilities.chrome())
  .build();
};

module.exports.buildDriver = buildDriver;
