var base = require('./common/base');
var util = require('./common/util');
var webdriver = base.webdriver;
var until = webdriver.until;
var driver = base.getDriver();
var $ = base.sizzle(driver, webdriver); // webdriver 选择器
var expect = base.chai.expect;
base.chai.use(base.chaiWebdriver(driver)); // 初始化 chaiWebdriver 语法糖


// 测试用例
describe('播放区UI测试', function() {
    // 异步超时时限
    this.timeout(60e3);
    // 失败重试最多次数
    this.retries(0);

    it('播放器封面背景图存在，切换视频后背景图更换', function() {
        var firstImg = '';
        return driver.get('http://m.iqiyi.com/v_19rrll0l7g.html')
            .then(function() { // 获取海报地址
                return $('.m-video-poster img').getAttribute('src');
            }).then(function(imgUrl) { // 验证地址，首屏海报应当正常展示
                expect(2).to.equal(2);
                expect(imgUrl).to.match(/(.+)\.jpg/);
                firstImg = imgUrl;
                return $.all('.c-album-item');
            }).then(function(lists) { // 切换剧集
                return lists[1].click();
            }).then(function() { // 切换视频后海报地址应当更换
                return expect('.m-video-poster img').dom.not.to.have.attribute('src', firstImg);
            });
    });

    it('进入并退出全屏', function() {
        var detectjs = 'return $("#video")[0].webkitDisplayingFullscreen';
        return driver.get('http://m.iqiyi.com/v_19rrll0l7g.html')
            .then(function() { // 点击全屏
                return $('.fullScreen').click();
            }).then(function() { // 当前应当是全屏状态
                return expect(driver.executeScript(detectjs)).to.eventually.be.true;
            }).then(function() { // 退出全屏
                return driver.executeScript('return $("#video")[0].webkitExitFullScreen()');
            }).then(function() { // 当前应当不是全屏状态
                return expect(driver.executeScript(detectjs)).to.eventually.be.false/*.notify(done)*/;
            });
    });

    it('拖动进度条，立即播放，播放进度同时改变', function() {
        return driver.get('http://m.iqiyi.com/v_19rrmbebr8.html')
            .then(function() { // 点击播放按钮
                return $('.c-videoplay-icon[data-node=btn]').click();
            }).then(function() { // 等待播放
                return util.wait(1e3);
            }).then(function() { // 拖动进度条
                return new webdriver.TouchSequence(driver)
                    .tapAndHold({x: 100, y: 288})
                    .move({x: 250, y: 288})
                    .release({x: 250, y: 288})
                    .perform();
            }).then(function() { // 播放时间应当大于1s
                return expect($('.timeDisplay-current').getText()).to.eventually.be.above('00:01');
            });
    });

    it('进入试看播放页，出现试看6分钟按钮，点击按钮，播放完毕出现会员浮层', function() {
        return driver.get('http://m.iqiyi.com/v_19rrletlz4.html')
            .then(function() { // 点击试看按钮
                return $('[data-node=playBtn]').click();
            }).then(function() { // 等待播放
                return util.wait(1e3);
            }).then(function() { // 拖动至6分钟结束
                return new webdriver.TouchSequence(driver)
                    .tapAndHold({x: 100, y: 288})
                    .move({x: 367, y: 288})
                    .release({x: 367, y: 288})
                    .perform();
            }).then(function() { // 等待播放完毕展示会员浮层
                return driver.wait(until.elementIsVisible($('[glue-node=vipLayer]')), 10e3);
            });
    });

    it('非VIP用户，播完广告，自动跳过片头播放正片', function(){
        return driver.get('http://m.iqiyi.com/v_19rrll0l7g.html')
            .then(function() { // 点击播放按钮
                return $('.c-videoplay-icon[data-node=btn]').click();
            }).then(function() { // 等待播放
                return util.wait(2e3);
            }).then(function() { // 首先播放广告，广告时间应当显示
                return expect('.m-video-player>div:last').dom.to.be.visible();
            }).then(function() { // 获取广告时间
                return $('.m-video-player>div:last').getText();
            }).then(function(adTime) { // 等待广告播放完毕，并跳过片头
                return util.wait((+adTime + 4) * 1000);
            }).then(function() { // 播放时间应当大于3s
                return expect($('.timeDisplay-current').getText()).to.eventually.be.above('00:03');
            });
    });

    it('VIP用户，自动跳过片头直接播放正片', function(){
        // 通过authcookie登录vip，跳转至播放页
        var url = 'http://m.iqiyi.com/user.html?overwrite=1&authcookie=ebn8pm2DkBN6ufA1Q5nI6VBzFFHQEcvk5xTm2AXm1jm1c0pvyElaTEPx73exlCm1v5GqUwR60&redirect_url=http%3A%2F%2Fm.iqiyi.com%2Fv_19rrll0l7g.html';
        return driver.get(url)
            .then(function() { // 等待登录跳转完成，播放按钮出现
                return driver.wait(until.elementIsVisible($('.c-videoplay-icon[data-node=btn]')), 30e3);
            }).then(function(playBtn) { // 点击播放按钮
                return playBtn.click();
            }).then(function() { // 等待跳过片头
                return util.wait(3e3);
            }).then(function() { // 获取当前播放时间
                return expect($('.timeDisplay-current').getText()).to.eventually.be.above('00:02');
            });
    });

    after(function() {
        driver.quit();
    });

});
