define(function(require, exports, module) {
    var config = require('../../config/config');

    var sendAjax = function(url, options, success, failure) {
        var param = options.param,
            method = options.method || 'GET',
            jsonp = options.jsonp,
            timeout = options.timeout || 5000,
            that = this;
        $.ajax({
            url: url,
            dataType: 'jsonp',
            data: param,
            type: method,
            timeout: timeout,
            success: function(data) {
                if (success) {
                    success(data);
                }
            },
            error: function(xhr) {
                if (failure) {
                    failure({
                        code: 'E0000'
                    });
                }
            }
        });
    };

    module.exports = APP.createService({
        loginWithAuthcookie: function(authcookie, success, failure) {
            sendAjax(config.interfaces.user.loginWithAuthcookie, {
                param: {
                    "keep": 0,
                    "authcookie": authcookie, //P00001
                    "agenttype": $.os.android ? 13 : 12
                }
            }, success, failure);
        },
        PPSLoginWithAuthcookie : function(authcookie, success, failure){
            sendAjax(config.interfaces.user.PPSLoginWithAuthcookie, {
                param: {
                    "authcookie": authcookie, //P00001
                    "agenttype": $.os.android ? 13 : 12
                }
            }, success, failure);
        },
    });
});