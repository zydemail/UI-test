var config = {
    'staticImg': {
        'coffee-machine-wrapper': 'open coffee machine button',
    },
    'dynamicImg':{
        'myModal': 'coffee machine dialog',
        'cappuccino-button': 'cappuccino success',
        'coffee-machine-wrapper': 'Coffee machine close success',
        'coffee-machine-button': 'Coffee machine button success',
    },    
};
var settings = {
    'iphone5s': {
        pageSettings: {
            // 冒充浏览器
            userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X; en-us) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53'
        },
        // 浏览器窗口大小
        viewportSize: {
            width: 320,
            height: 568
        }
    },
    'iphone7': {
        pageSettings: {
            // 冒充浏览器
            userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X; en-us) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53'
        },
        // 浏览器窗口大小
        viewportSize: {
            width: 320,
            height: 568
        }
    },
};
exports.config = config;