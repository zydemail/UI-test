define(function (require, exports, module) {

    var customEvent = $.customEvent;
    var isLogin = require('./interface/isLogin');
    var login = require('./interface/login');
    var ic = console;
    var callbackList = [];
    var userInfo = APP.createService({
        init: function () {
            // 是否新用户
            this.isNewUser = false;
            //用户ID
            this.uid = "";
            //用户名称
            this.name = "";
            //邮箱
            this.email = "";
            //会员类型，1：超值套餐会员，2：经济套餐会员
            this.vipType = "";
            //付费类型，0：预付费用户，1:手机包月用户
            this.payType = "";
            //会员状态，0：无效，1：有效，2：锁定，3：过期
            this.status = "";
            //后台passport  islogin接口的数据  obj格式
            this.isLoginInfo = null;
            this.qy_info = null;
            this.bindEvent();
            this.checkUserInfo();
        },
        bindEvent: function () {
            customEvent.on("login", this.doLogin.bind(this));
            customEvent.on("logout", this.doLogout.bind(this));
        },
        //监听登入处理
        doLogin: function () {
            this.checkUserInfo();
        },
        //监听退出处理
        doLogout: function () {
            this.clearUserInfo();
        },
        //判断用户登入状态，设置用户信息
        checkUserInfo: function () {
            if (this.isLogin()) {
                var p00002 = APP.$.cookie.get("P00002");
                if (p00002 !== null && p00002 !== "") {
                    p00002 = window.JSON ? window.JSON.parse(p00002) : eval("(" + p00002 + ")");
                    this.uid = p00002.uid;
                    this.name = p00002.nickname;
                    this.email = p00002.email;
                }
            }
        },
        //判断是否有VIP信息设置VIP用户信息
        checkVipInfo: function (callBack, filed) {
            if (this.isLogin()) {
                if (!this.hasVipInfo) {
                    this.getInfoFromInterface(callBack, filed);
                } else {
                    if (callBack) {
                        callBack(filed ? this[filed] : "");
                    }
                }
            }
        },

        getVipLevel: function (callBack) {
            this.checkVipInfo(callBack, "level");
            return this.level;
        },
        getVipDeadline: function (callBack) {
            this.checkVipInfo(callBack, "vipDeadline");
            return this.vipDeadline;
        },
        //接口获取数据
        getInfoFromInterface: function (callBack, filed) {
            var _this = this;
            if (_this.isLoginInfo) {
                if (callBack) {
                    callBack(filed ? _this[filed] : "");
                }
            } else {
                if(_this.isLogin()){
                    isLogin.sendInfoAction({}, function (d) {
                        if (d.code == "A00005") {
                            /*relogin.reLogin(d);*/
                        } else {
                            if (d.code == "A00000") {
                                _this.setVipInfo(d.data || {});
                                _this.isLoginInfo = d.data.userinfo || {};
                                _this.qy_info = d.data.qiyi_vip_info || {};
                                callBack(filed ? _this[filed] : "");
                            } else {
                                ic.warn("调用vip信息接口失败");
                                _this.clearVipInfo();
                            }
                        }
                    });
                }
            }
        },
        //设置VIP用户信息
        setVipInfo: function (data) {
            var pps_info = data.pps_vip_info || {};
            var qy_info = data.qiyi_vip_info || {};
            var isPpsvip = parseInt(pps_info.vip_type, 10);
            var isQyvip = parseFloat(qy_info.type, 10);
            //会员到期时间
            var nowtime = 0;
            var pps_deadline_t = 0;
            var qy_deadline_t = 0;
            var pps_dadline = '';
            if (pps_info.vip_remain_day) {
                nowtime = new Date();
                pps_deadline_t = nowtime.setDate(nowtime.getDate() + pps_info.vip_remain_day);
                pps_dadline = APP.$.date.format(new Date(pps_deadline_t), 'yyyy年MM月dd日');
            }
            if (isQyvip || (parseInt(qy_info.vipType, 10) && !isPpsvip)) {
                if (qy_info.deadline) {
                    qy_deadline_t = qy_info.deadline.t;
                }
                this.vipType = qy_info.vipType + "";
                this.payType = qy_info.payType + "";
                this.status = qy_info.status + "";
                this.level = qy_info.level + "";
                this.hasVipInfo = true;
                this.isValidVip = (qy_info.status == "1");
                this.vipDeadline = qy_info.deadline;
            } else {
                if (isPpsvip) {
                    this.level = pps_info.pps_level + "";
                    this.vipType = "1";
                    this.payType = '0';
                    this.status = '1';
                    this.hasVipInfo = true;
                    this.isValidVip = true;
                }
            }
        },
        //清空用户信息
        clearUserInfo: function () {
            this.uid = "";
            this.name = "";
            this.email = "";
            this.clearVipInfo();
        },
        //清空VIP用户信息
        clearVipInfo: function () {
            this.level = "";
            this.vipType = "";
            this.payType = "";
            this.status = "";
            this.type = "";
            this.hasVipInfo = false;
            this.isValidVip = false;
        },
        //用户是否登入
        isLogin: function () {
            return (APP.$.cookie.get("P00002") !== "" && APP.$.cookie.get("P00002") !== null && APP.$.cookie.get("P00002") !== "deleted") && (APP.$.cookie.get("P00003") !== "" && APP.$.cookie.get("P00003") !== null && APP.$.cookie.get("P00003") !== "deleted");
        },
        //获取用户ID
        getUid: function () {
            return this.uid;
        },
        //获取匿名用户id
        getAnonymousUid: function () {

            var uid = $.cookie.get('QC006');
            if (! uid) {
                this.isNewUser = true;
                uid = $.crypto.md5(window.navigator.userAgent + document.cookie + Math.random() + new Date().getTime() * 1);
                $.cookie.set('QC006', uid, {
                    expires : 365 * 24 * 60 * 60 * 1000,
                    path : '/',
                    domain : 'iqiyi.com'
                });
            }
            return uid;
        },
        checkNewUser: function () {
            var uid = $.cookie.get("QC006");
            var ret = false;
            if (uid) {
                ret = this.isNewUser;
            } else {
                ret = true;
            }
            return ret;
        },
        //获取用户名称
        getName: function () {
            return this.name;
        },
        //获取邮箱
        getEmail: function () {
            return this.email;
        },
        //获取会员类型，1：超值套餐会员，2：经济套餐会员(已下线)，3：功能会员套餐
        getVipType: function (callBack) {
            this.checkVipInfo(callBack, "vipType");
            return this.vipType;
        },
        //获取付费类型，0：预付费用户，1:手机包月用户
        getPayType: function (callBack) {
            this.checkVipInfo(callBack, "payType");
            return this.payType;
        },
        //获取会员状态，0：无效，1：有效，2：锁定，3：过期
        getStatus: function (callBack) {
            this.checkVipInfo(callBack, "status");
            return this.status;
        },
        //是否为有效会员，0：无效会员，1：有效会员
        getIsValidVip: function (callback) {
            this.checkVipInfo(callback, "isValidVip");
            return this.isValidVip;
        },
        /*自动续费查询 */
        getAutoRenew: function (callback) {
            var url = 'http://serv.vip.iqiyi.com/services/autoRenewQuery.action';
            var opt = {};
            opt.param = {
                cid: 'afbe8fd3d73448c9',
                P00001: APP.$.cookie.get('P00001'),
                qyid: APP.$.cookie.get('QC006') || '',
                cb: "__pc__getAutoRenew__"
            };
            $.ajax({
                url: url,
                dataType: 'jsonp',
                data: opt.param,
                success: function (json) {
                    var status = 0;
                    if (json.status) {
                        status = json.status;
                    }
                    if (callback) {
                        callback(status);
                    }
                }
            });
        },
        getUserIcon: function (callback) {
            var iconurl = "";
            callback = callback ||
                function () {
                };
            if (this.isLogin()) {
                var opt = {};
                var url = 'http://passport.iqiyi.com/apis/user/info.action';
                opt.param = {};
                opt.param.qyid = APP.$.cookie.get('QC006') || '';
                // opt.param.cb = opt.param.cb || "__pc__getUserIcon__";
                opt.param.agenttype = (APP.$.browser.iPhone) ? 12 : 13;
                opt.param.authcookie = opt.param.authcookie || APP.$.cookie.get("P00001");
                opt.param.antiCsrf = APP.$.crypto.md5(opt.param.authcookie);

                $.ajax({
                    url: url,
                    dataType: 'jsonp',
                    data: opt.param,
                    success: function (data) {
                        if (data.code === 'A00000') {
                            var data = data.data;
                            if (data.userinfo && data.userinfo.icon) {
                                iconurl = data.userinfo.icon.replace('_130x130', '_70x70');
                                callback(iconurl);
                            }
                        }
                    }
                });

            } else {

            }
        },

        getUserAvatar: function (callback) {
            if(this.isLogin()){
                this.getInfoFromInterface(function (userInfo) {
                    callback(userInfo.icon.replace('_130x130', '_70x70'));
                }, "isLoginInfo");
            }
            else{
                callback(null);
            }
        },
        getAccountType: function (callBack) {
            var accountTypeMap = {
                1: "BAIDU",
                2: "SINA",
                3: "RENREN",
                4: "QQ",
                5: "ALIPAY",
                6: "KAIXIN",
                7: "LENOVO",
                8: "FEIXIN",
                9: "WEIXIN",
                10: "QIYI_EMAIL",
                11: "QIYI_PHONE",
                12: "QISHENG",
                13: "PPS",
                14: "PPS_BIND"
            };
            this.getInfoFromInterface(function (userInfo) {
                callBack(accountTypeMap[userInfo.accountType]);
            }, "isLoginInfo");
            //return accountTypeMap[this.accountType] || "UNKNOWN";

        },
        getAuthcookie: function () {
            return APP.$.cookie.get("P00001") || null;
        },
        loginWithAuthcookie: function (authcookie, success, failure) {
            login.loginWithAuthcookie(authcookie, function (data) {
                if (data.code == "A00000") {
                    $.customEvent.fire({
                        type: "login"
                    });
                    success();
                }
            }, failure);
        },
        PPSLoginWithAuthcookie : function(authcookie, success, failure){
            login.PPSLoginWithAuthcookie(authcookie,function (data) {
                if (data.code == "A00000") {
                    $.customEvent.fire({
                        type: "login"
                    });
                    success();
                }
            }, failure);
        },
        logout: function (redirect_url) {
            var href = encodeURIComponent(redirect_url || window.location.href);
            window.location.href = 'http://passport.iqiyi.com/user/logout.php?' +
                'url=' + href + '&logoutcb=Q.__logoutcb';
        },
        /**
         * 会员状态标识:
         * -1 非会员， 0 会员被封禁，2 白银会员，3 黄金会员，4 白金会员，5 荔枝VIP，6 台湾VIP(只在台湾站发送)
         * （如果接口不能区分会员类型，则统一投递：1 合法会员）
         * 需求wiki: http://wiki.qiyi.domain/pages/viewpage.action?pageId=6068417  (hu字段)
         * 接口wiki：http://wiki.qiyi.domain/pages/viewpage.action?pageId=17761475
         * @return {[functions]} [回调：返回会员状态字符串]
         */
        getVIPStatus: function(callback) {
            var vipStatus = 'NOVIP';
            var vipMap = {
                '1': 'GOLD',
                '3': 'SILVER',
                '4': 'PLATINUM' // 白金会员
            };
            if (this.isLogin()) {
                // 查询大陆会员信息
                this.getInfoFromInterface(function(info) {
                    if (info) {
                        if (info.status == 0 || info.status == 2) {
                            vipStatus = 'BANNED'; // 会员被封禁
                        } else if (info.status == 3) {
                            vipStatus = 'NOVIP'; // 非会员
                        } else if (info.status == 1) {
                            vipStatus = 'VALID'; // 合法会员
                            if (info.surplus > 0 || info.surplus == "") {
                                vipStatus = vipMap[info.vipType] || 'VALID';
                            }
                        }
                    }
                    callback(vipStatus);
                }, "qy_info");
            } else {
                callback(vipStatus)
            }
        }

    });
    //记录当前类是否有VIP信息
    userInfo.hasVipInfo = false;
    //是否为有效会员
    userInfo.isValidVip = false;
    userInfo.init();
    module.exports = userInfo;
});
