define(function(require, exports, module) {

    var intf = {
        isLogin : "http://passport.iqiyi.com/apis/user/islogin.php",
        userInfo : "http://passport.iqiyi.com/apis/user/info.action"
    };

    var isLogin = APP.createService({
        send : function(opt, callback) {
            opt.param = opt.param || {};
            opt.param.agenttype = (APP.$.browser.iPhone) ? 12 : 13;
            opt.param.authcookie = APP.$.cookie.get("P00001");
            opt.param.antiCsrf = APP.$.crypto.md5(opt.param.authcookie);

            $.ajax({
                url : intf.isLogin,
                data : opt.param,
                dataType : "jsonp",
                headers : {
                    withCredentials : true
                },
                success : function(data, status, xhr) {
                    if (callback) {
                        callback(data);
                    }
                }
            });
        },
        sendInfoAction : function(option, success, failure) {
            var opt = {};
            $.extend(opt, option);
            if (!opt.authcookie) {
                opt.authcookie = APP.$.cookie.get("P00001");
            }
            opt.antiCsrf = APP.$.crypto.md5(opt.authcookie);

            $.ajax({
                url : intf.userInfo,
                data : opt,
                dataType : "jsonp",
                timeout : 1000,
                cache : true,
                headers : {
                    withCredentials : true
                },
                success : function(data, status, xhr) {
                    if (success) {
                        success(data);
                    }
                },
                error: function() {
                    if (failure) {
                        failure();
                    }
                }
            });
        }
    });

    module.exports = isLogin;
});
