// 引入 webdriver
var webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome.js');
// webdriver 选择器
var sizzle = require('webdriver-sizzle');
// 引入断言库 chai
var chai = require('chai');
// chai中的Promise封装，例如 expect(Promise.resolve({ foo: "bar" })).to.eventually.have.property("foo")
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
// chai断言webdriver语法糖，例如 expect(selector).dom.to.have.text('string')
var chaiWebdriver = require('chai-webdriver');


// 导出模块
exports.webdriver = webdriver;
exports.sizzle = sizzle;
exports.chai = chai;
exports.chaiWebdriver = chaiWebdriver;
exports.getDriver = getDriver;


/**
 * 初始化 chrome driver
 * @param  {String} deviceName chrome支持的手机型号字符串 Google Nexus 6/Apple iPhone 6
 * @return {driver} Driver 实例
 */
function getDriver(deviceName) {
    var options = new chrome.Options()
        .setMobileEmulation({ // 手机模拟系统
            deviceName: deviceName || "Google Nexus 6"
        });
    var driver = new webdriver.Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();
    return driver;
}

