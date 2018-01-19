define(function(require, exports, module) {

    var config = APP.createService({
        domain : 'iqiyi.com',
        mobileRoot : '/',
        videoId : 'video',
        defaultRate : 1,
        mtMap : {
            '96' : {
                name : '极速'
            },
            '1' : {
                name : '流畅'
            },
            '2' : {
                name : '高清'
            }
        },
        http : {
            timeout : 10000
        },
        cookie : {
            pc : 'QC020'
        },
        filterBrowsers : {
            fullScreen : ['mbaidu', 'mqq', 'muc', 'iPhone'] // 过滤掉一些浏览器
        },
        downLink : {
            ios : {
                url : "http://ota.iqiyi.com/adf/57e9653f79764d1b840b1ebeb776bd3e"
            },
            android : {
                url : "http://ota.iqiyi.com/adf/83cf0f0d5479422f947688e58c22b2b6"
            }
        },
        searchDownLink : {
            ios : {
                url : "http://ota.iqiyi.com/adf/c5ea53395d574e88b2838ef1be7f4402"
            },
            android : {
                url : "http://ota.iqiyi.com/adf/00b345c8144145aba21afa55a135037b"
            }
        },
        /*
         * by mengqinghui
         * 静态化的函数，因为这一个版本静态化不切域名，导致后台返回的www需要转变为m域, opt 包含tvid和vid的信息
         */
        replaceURL : function(url, opt) {
            //处理规则
            // 1 对于 vip／yule域名下的，使用相对路径
            // 2 对于www域名的，直接使用相对路径，也就是将www.iqiyi.com  替换为空
            if (!url) {
                return '';
            }
            // if (/(yule|vip)\.(i)?qiyi.com/.test(url)) {
            // url = url.replace(/(http:\/\/)?(yule|vip)\.(i)?qiyi\.com/, '');
            // } else {
            // if (/(w_|v_)/.test(url)) {
            // url = url.replace(/(http:\/\/)?www\.(i)?qiyi\.com/, '');
            // }
            // // else if (opt.tvid && opt.vid){
            // // url = '/play.html?tvid=' + opt.tvid + '&vid=' + opt.vid;
            // // }
            // }
            url = url.replace(/(http:\/\/)?(yule|vip|www)\.(i)?qiyi\.com/i, "");

            return url;
        },
        addAnchor : function(url, opt) {
            var anchor = opt.anchor;
            if (!anchor) {
                return url;
            }
            return url + '#' + anchor;
        },
        interfaces : {
            tm : 'http://cache.m.iqiyi.com/h5/tmm/',
            mm : 'http://qisu.video.qiyi.com/r/qisu/mac/mm/',
            a : 'http://cache.m.iqiyi.com/h5/a/',
            ss : 'http://cache.m.iqiyi.com/h5/s/',
            sc : 'http://cache.m.iqiyi.com/h5/sd/',
            cp : 'http://cache.m.iqiyi.com/h5/qiyichupin/',
            index : 'http://cache.m.iqiyi.com/h5/index/',
            ch : 'http://cache.m.iqiyi.com/h5/c/',
            p : 'http://cache.m.iqiyi.com/p/',
            pc : 'http://cache.video.iqiyi.com/jp/pc/',
            v : 'http://cache.m.iqiyi.com/h5/vlist/',
            vj : 'http://cache.video.iqiyi.com/jp/vi/',
            nAdInfo : 'http://pub.m.iqiyi.com/api/getNewAdInfo',
            qipaweixininfo : 'https://papaq.iqiyi.com/papaq-api/video/h5_info',
            topicAlbum : 'http://cache.m.iqiyi.com/h5/tal/',
            topicInfo : "http://cache.m.iqiyi.com/h5/ti/",
            topicList : "http://cache.m.iqiyi.com/h5/tl/",
            playList : "http://cache.m.iqiyi.com/h5/pl/",
            // [/^\/(\w+)\/playlist(\d+)\.html/, "playlistinfo.inc", "/h5/pli/$2/"]
            // [/^\/(\w+)\/playlist\.html/, "playlist.inc", "/h5/pl/$1/$2/playlist.html/"]
            // [/^\/pl\/(\d+)\/(\d+)\/playlist\.html/, "playlistplay.inc", "/h5/pl/$1/$2/"]

            qitanQxApi : "http://api.t.iqiyi.com/qx_api/qitan/get_movie_by_aid",
            qx : "http://api.t.iqiyi.com/qx_api/activity/h5popularize/feedback",
            search : "http://search.video.iqiyi.com/o",
            search_hot : "http://search.video.iqiyi.com/m",
            suggest : "http://suggest.video.iqiyi.com/",
            p13n : "http://qiyu.iqiyi.com/p13n20",
            // 超剧集数据接口
            ultraAlbum : 'http://cache.video.qiyi.com/jp/collection/',
            //剧集列表接口
            avlist : 'http://cache.video.iqiyi.com/jp/avlist/',
            //剧集列表接口(splay页面使用)
            vlist : 'http://cache.m.iqiyi.com/h5/vlist/',
            //来源期数接口
            sdate : 'http://cache.video.iqiyi.com/jp/sdlst/',
            //来源每期列表接口
            slist : 'http://cache.video.iqiyi.com/jp/sdvlst/',
            //来源每期非正片接口 (目前包含4中类型: CLIP片段、TITBIT花絮、PREVUE预告片、OTHER)
            slistTrailers : 'http://cache.video.iqiyi.com/jp/sdvlst/nf/',
            //UGC混合接口
            ugcVI : "http://mixer.video.iqiyi.com/jp/mixin/videos/",
            //专辑信息接口
            albumInfo : "http://mixer.video.iqiyi.com/jp/albums/",
            //原生大碟接口
            sound : "http://mixer.video.iqiyi.com/jp/mixin/",
            //UGC推荐接口
            mixer : 'http://mixer.video.iqiyi.com/jp/recommend/videos',
            // 分平台播放数量接口
            platformCount : "http://cache.video.qiyi.com/jp/pc/pr/",
            // 活动专题页
            activity : "http://cache.m.iqiyi.com/h5/kszt/200343212/23423asdf.html",
            // 收藏接口
            collect : "http://subscription.iqiyi.com/dingyue/api/",
            //获取相关预告片、相关片花、花絮信息接口
            othlist : "http://cache.video.qiyi.com/jp/othlist/",
            // 顶踩接口
            updown : {
                updown : "http://up.video.iqiyi.com/ugc-updown/aud.do",
                query_is_updown : "http://up.video.iqiyi.com/ugc-updown/quud.do",
                query_num : "http://up.video.iqiyi.com/ugc-updown/ud.do"
            },
            score : {
                getScore : "http://score.video.iqiyi.com/beaver-api/external/get_user_movie_score",
                setScore : "http://score.video.iqiyi.com/beaver-api/external/add_movie_score"
            },
            buyLayer : "http://serv.vip.iqiyi.com/pay/buyLayer.action",
            //电影票地址
            ticket : "http://piao.iqiyi.com",
            nologin_collect_list : "http://nlwl.iqiyi.com/apis/urc/getqd",
            nologin_collect_merge : "http://nlwl.iqiyi.com/apis/uwl/merge",
            nologin_collect_clear : "http://nlwl.iqiyi.com/apis/uwl/deleteAllSubscriptions.action",
            appstore_indexlist : "http://store.iqiyi.com/apis/gphone/collection.action", //appstore 精品页tab加载数据
            appstore_downlist : "http://store.iqiyi.com/apis/gphone/category/apps.action", //appstore 下载页加载数据
            notice : {
                getNotice : "http://notice.iqiyi.com/apis/msg/list_messages.action",
                getNoticeCount : "http://notice.iqiyi.com/apis/msg/count_messages.action",
                getAllNoticeCount : "http://notice.iqiyi.com/apis/msg/count_all_messages.action",
                getAllNoticeCountAnony : "http://nl.notice.iqiyi.com/apis/msg/count_all_messages.action",
                hasNewNotice : "http://notice.iqiyi.com/apis/msg/hasnew.action",
                relatedToMe : "http://notice.iqiyi.com/apis/msg/mixer/navall.action",
                readNotice : "http://notice.iqiyi.com/apis/msg/update_status.action",
                updateAllNotice : "http://notice.iqiyi.com/apis/msg/update_all_status.action"
            },
             router : {
                BindRouterDevice : "http://router.iqiyi.com/apis/bind/",
                UnbindRouterDevice : "http://router.iqiyi.com/apis/unbind/",
                NeedBindRouterDevice : "http://router.iqiyi.com/apis/needBind/",
                SwitchUserBindRouterDevice : "http://router.iqiyi.com/apis/replaceUser/"
            },
            subscription : {
                unSubscribe : 'http://sns.uc.iqiyi.com/apis/friend/remove_friends.action',
                subscribe : 'http://sns.uc.iqiyi.com/apis/friend/add_friends.action',
                isSubscribed : "http://sns.uc.iqiyi.com/apis/friend/are_friends.action"
            },
            security : {
                resetMailBox : "https://passport.iqiyi.com/apis/user/replace_email.action",
                resetPhone : "http://passport.iqiyi.com/apis/phone/replace_phone.action",
                resendActivationMail : "https://passport.iqiyi.com/apis/secure/resend_activate_email.action",
                sendActivationMail : "http://passport.iqiyi.com/apis/secure/send_verify_email.action",
                resendVerifyMail : "http://passport.iqiyi.com/apis/secure/resend_verify_email.action",
                resetPassword : "https://passport.iqiyi.com/apis/user/reset_passwd.action",
                resendResetPasswordMail : "http://passport.iqiyi.com/apis/secure/resend_verify_email.action",
                getPasswordScore : "http://passport.iqiyi.com/apis/secure/get_pwd_score.action",
                retrievePassword : "http://passport.iqiyi.com/pages/secure/password/save_pwd.action",
                checkPhoneVerify : "https://passport.iqiyi.com/apis/phone/verify_cellphone_authcode.action",
                locationList : "https://passport.iqiyi.com/pages/secure/login_history_list.action"
            },
            user : {
                loginWithAuthcookie : "https://passport.iqiyi.com/apis/user/authlogin.action",
                PPSLoginWithAuthcookie : "http://passport.pps.tv/apis/user/setcookie.action",
                bindPhone : "https://BEA3AA1908656AABCCFF76582C4C6660/apis/phone/bind_phone.action",
                testReBindPhone : "https://passport.iqiyi.com/apis/phone/check_switch_account.action",
                thirdPartyCheck : "http://passport.iqiyi.com/apis/user/check_account.action",
                rebindInfo : "https://passport.iqiyi.com/apis/phone/get_switch_info.action",
                rebindPhone : "https://passport.iqiyi.com/apis/phone/switch_account.action",
                login : "https://BEA3AA1908656AABCCFF76582C4C6660/apis/reglogin/login.action",
                checkUserName : "https://passport.iqiyi.com/apis/user/check_account.action",
                getPhoneVerify : "http://passport.iqiyi.com/apis/phone/send_cellphone_authcode.action",
                getPhonePicVerify : "http://passport.iqiyi.com/apis/phone/send_cellphone_authcode_vcode.action",
                thirdPartyLogin : "http://passport.iqiyi.com/apis/thirdparty/nlogin.action",
                phoneRegister : "https://BEA3AA1908656AABCCFF76582C4C6660/apis/reglogin/cellphone_reg.action",
                mailRegister : "https://passport.iqiyi.com/apis/reglogin/register.action",
                bindPhoneForThirdAccountInFirstTime : "https://BEA3AA1908656AABCCFF76582C4C6660/apis/thirdparty/bind_account.action",
                bindPhoneForThirdAccount : "https://BEA3AA1908656AABCCFF76582C4C6660/apis/secure/bind_account.action",
                userInfo : "https://passport.iqiyi.com/apis/user/info.action",
                verify: "http://renzheng.iqiyi.com/services/verify/veryfyInfo.htm"
            },
            userCenter: {
                getFavorite: 'http://subscription.iqiyi.com/apis/watchlater/list.action',
                getFavoriteTW: 'http://subscription.iqiyi.com/apis/watchlater/zh_tw/list.action',
                mergeFavorite: 'http://subscription.iqiyi.com/apis/uwl/merge',
                favorite: 'http://subscription.iqiyi.com/dingyue/api/subscribe.action',
                cancelFavorite: 'http://subscription.iqiyi.com/dingyue/api/unsubscribe.action',
                isFavorite: 'http://subscription.iqiyi.com/dingyue/api/isSubscribed.action',
                setPcLogin : "http://l.rcd.iqiyi.com/apis/qiyirc/setrc",
                setPcUnLogin : "http://nl.rcd.iqiyi.com/apis/urc/setrc"
            },
            history : {
                get : "http://passport.m.iqiyi.com/apis/qiyirc/getrc.php",
                set : "http://passport.m.iqiyi.com/apis/qiyirc/setrc.php",
                getLogin : "http://l.rcd.iqiyi.com/apis/qiyirc/getrc.php",
                getUnlogin : 'http://nl.rcd.iqiyi.com/apis/urc/getrc',
                setLogin : "http://l.rcd.iqiyi.com/apis/qiyirc/setrc.php",
                setUnlogin : "http://nl.rcd.iqiyi.com/apis/urc/setrc",
                delLogin : "http://l.rcd.iqiyi.com/apis/qiyirc/delrc.php",
                delUnlogin : "http://nl.rcd.iqiyi.com/apis/urc/delrc",
                clearLogin : "http://l.rcd.iqiyi.com/apis/qiyirc/delall.php",
                clearUnlogin : "http://nl.rcd.iqiyi.com/apis/urc/delall",
                importLogin : "http://nl.rcd.iqiyi.com/apis/urc/merge",
                importSearchLogin : "http://l.rcd.iqiyi.com/apis/qiyirc/setsrc",
                importSearchUnlogin : "http://l.rcd.iqiyi.com/apis/urc/setsrc",
                getSinglePlayRecord : "http://l.rcd.iqiyi.com/apis/qiyirc/getvplay"
            },
            updateVideo : "http://l.rcd.iqiyi.com/apis/qiyirc/getUpdateReminder",
            locateWithIP : "http://data.video.qiyi.com/v.mp4",
            rankingLike : "http://bird.sns.iqiyi.com/wechat-api/like.do",
            iplocation : "http://iplocation.geo.qiyi.com/cityjson",
            runningVote : {
                // wiki: http://wiki.qiyi.domain/pages/viewpage.action?pageId=21170235#id-投票20接口文档-4跑男3互动接口
                vote : 'http://vote.i.iqiyi.com/eagle/runman/join_h5web_lot_vote',
                getInfo : 'http://vote.i.iqiyi.com/eagle/runman/get_vote'
            },
            regLogin : "https://passport.iqiyi.com/apis/reglogin/login.action",
            cloudControl : {
                // wiki: http://wiki.qiyi.domain/pages/viewpage.action?pageId=28583148
                barrageComment : "http://control.i.iqiyi.com/control/content_config",
                platformStrategy: 'http://m.iqiyi.com/api/cloud/code'
            },
            cloudDisk : {
                paopaoUpload : "http://upload.iqiyi.com/paopao_upload",
                feedUpload: "http://api.t.iqiyi.com/feed/upload_pic"
            },
            comment : {// 新评论需要接口
                getComments : 'http://api.t.iqiyi.com/qx_api/framework/all_in_one',
                getSortType : 'http://api.t.iqiyi.com/qx_api/comment/query_configfile',
                submitComment : 'http://api.t.iqiyi.com/qx_api/comment/publish',
                like : 'http://api.t.iqiyi.com/qx_api/comment/like',
                replyComment : 'http://api.t.iqiyi.com/qx_api/comment/reply',
                getReplies : 'http://api.t.iqiyi.com/qx_api/comment/get_replies'
            },
            voucher : {
                takeVoucher : 'http://serv.vip.iqiyi.com/vms/api/process-jsonp.action',
                getBanner : 'http://info.vip.iqiyi.com/promotion/push.action'
            },
            vipNotice : "http://info.vip.iqiyi.com/promotion/push.action",
            vipActGift : "http://serv.vip.iqiyi.com/vms/gift/queryActGift.action",
            activationCode : 'http://036A7038F83161DF6823775AA428F46F/pay/exp_pay.action',
            cashier : {// 新收银台相关接口
                getSalesTips : 'http://serv.vip.iqiyi.com/pay/h5-fragment.action',
                getPrice : 'http://i.vip.iqiyi.com/pay/h5/fee.action',
                exchangeCoupon : 'http://i.vip.iqiyi.com/pay/readCoupon.action',
                getPayType : 'http://i.vip.iqiyi.com/pay/h5/paytype.action',
                pay : 'http://i.vip.iqiyi.com/pay/wappay.action',

                getMobilePayVD : 'http://i.vip.iqiyi.com/pay/mobile-pay-vd.action',
                orderStatus: 'http://i.vip.iqiyi.com/H5/payconfirm/confirmOrderStat.action',
                getPackage: 'http://i.vip.iqiyi.com/checkout/queryH5CustomSuites.action',
                getVipAutoRenew: 'http://serv.vip.iqiyi.com/vip/getVipAutoRenew.action'
            },
            weChatJsSDK : {
                getTicket : 'http://bird.sns.iqiyi.com/wechat/jsapi_ticket'
            },
            ipLookup : 'http://ip.geo.iqiyi.com/cityjson',
            bubble : {//泡泡相关接口
                getFeeds : "http://api.t.iqiyi.com/feed/get_feeds", //获取feed流
                getComments : "http://api.t.iqiyi.com/feed/get_comments", //获取评论
                addOrReplyComment : "http://api.t.iqiyi.com/feed/comment", //发表评论和回复
                publish : "http://api.t.iqiyi.com/feed/publish", //发布
                reportFeed : "http://api.t.iqiyi.com/feed/report_feed", //举报
                agree : "http://api.t.iqiyi.com/feed/agree", // 点赞
                feedDetail : "http://api.t.iqiyi.com/feed/get_feed", //详情
                collect : "http://paopao.iqiyi.com/apis/e/starwall/collect.action", //加入&退出圈子
                list : "http://paopao.iqiyi.com/apis/e/paopao/list.action", //获取用户信息以及泡泡列表等信息
                starlightWall : "http://pub.m.iqiyi.com/h5/bubble/starlightWall.json", //星光墙接口
                deleteFeed : "http://api.t.iqiyi.com/feed/delete", // 删除泡泡feed接口
                deleteComment : "http://api.t.iqiyi.com/feed/delete_comment", // 删除泡泡评论
                eventFeedList : "http://pub.m.iqiyi.com/h5/bubble/eventInfo.json",//事件页加载更多接口
                getImageText : "http://paopao.iqiyi.com/apis/e/paopao/getImageText.action" //泡泡长图文接口
            },
            emoji : {
                feedStatic : 'http://emoticon.sns.iqiyi.com/jaguar-core/query_config?bussiness=feedStatic'
            },
            hotComment: 'http://api.t.iqiyi.com/feed/outline',

            favorite: {  // 收藏相关接口
                getFavorite: 'http://subscription.iqiyi.com/apis/watchlater/list.action',
                getFavoriteTW: 'http://subscription.iqiyi.com/apis/watchlater/zh_tw/list.action',
                mergeFavorite: 'http://subscription.iqiyi.com/apis/uwl/merge',
                favorite: 'http://subscription.iqiyi.com/dingyue/api/subscribe.action',
                cancelFavorite: 'http://subscription.iqiyi.com/dingyue/api/unsubscribe.action',
                isFavorite: 'http://subscription.iqiyi.com/dingyue/api/isSubscribed.action'
            },
            keepalive: 'http://cm.passport.iqiyi.com/apis/cmonitor/keepalive.action'
        },
        channel : {// 频道号、频道名映射表
            DIAN_YING : 1,
            DIAN_SHI_JU : 2,
            JI_LU_PIAN : 3,
            DONG_MAN : 4,
            YIN_YUE : 5,
            ZONG_YI : 6,
            YU_LE : 7,
            GAME : 8,
            LV_YOU : 9,
            PIAN_HUA : 10,
            GONG_KAI_KE : 11,
            JIAO_YU : 12,
            SHI_SHANG : 13,
            SHI_SHANG_ZONG_YI : 14,
            SHAO_ER : 15,
            WEI_DIAN_YING : 16,
            TI_YU : 17,
            AO_YUN : 18,
            ZHI_BO : 19,
            GUANG_GAO : 20,
            SHENG_HUO : 21,
            GAO_XIAO : 22,
            QI_PA : 23,
            CAI_JING : 24,
            ZI_XUN : 25,
            QI_CHE : 26,
            YUAN_CHUANG : 27,
            TAO_MI : 91,
            LIAN_XIANG_HE_ZUO : 92,
            PIAN_MA_QI_CE_SHI : 96,
            OTHER : 97,
            CE_SHI : 99,
            VIP : 120,
            QI_YI_CHU_PIN : 111,
            PAIKE : '',
            JUNSHI : 28,
            MU_YING : 29,
            KE_JI : 30,
            TUO_KOU_XIU : 31,
            JIAN_KANG : 32
        },
        securitySrcKey : "bfc434ba2fa1457f8c42f824ff26aa7d",
        callAppVideo : {
            "204397501" : {
                "name" : "傻根进城",
                "browser" : "all",
                "location" : "all",
                "download" : {
                    "android" : "http://mbdapp.iqiyi.com/j/ap/iqiyi_1839.apk",
                    "ios" : "http://ota.iqiyi.com/adf/781a99e96c5540c0aaa96cb3ffe35958"
                }
            },
            "204384801" : {
                "name" : "校花的贴身高手3",
                "browser" : "all",
                "location" : "all",
                "download" : {
                    "android" : "http://mbdapp.iqiyi.com/j/ap/iqiyi_1816.apk",
                    "ios" : "http://ota.iqiyi.com/adf/781a99e96c5540c0aaa96cb3ffe35958"
                }
            },
            "204264301" : {
                "name" : "灰姑娘与四骑士",
                "browser" : "all",
                "location" : "all",
                "download" : {
                    "android" : "http://mbdapp.iqiyi.com/j/ap/iqiyi_1717.apk",
                    "ios" : "http://ota.iqiyi.com/adf/781a99e96c5540c0aaa96cb3ffe35958"
                }
            },
            "204386701" : {
                "name" : "青春鸡尾酒",
                "browser" : "all",
                "location" : "all",
                "download" : {
                    "android" : "http://mbdapp.iqiyi.com/j/ap/iqiyi_1842.apk",
                    "ios" : "http://ota.iqiyi.com/adf/781a99e96c5540c0aaa96cb3ffe35958"
                }
            },
            "204263601" : {
                "name" : "校花的贴身高手2",
                "browser" : "all",
                "location" : "all",
                "download" : {
                    "android" : "http://mbdapp.iqiyi.com/j/ap/iqiyi_1816.apk",
                    "ios" : "http://ota.iqiyi.com/adf/781a99e96c5540c0aaa96cb3ffe35958"
                }
            },
            "202666201" : {
                "name" : "陷入纯情",
                "browser" : "all",
                "location" : "all",
                "download" : {
                    "android" : "http://mbdapp.iqiyi.com/j/ap/iqiyi_10200.apk",
                    "ios" : "http://ota.iqiyi.com/adf/781a99e96c5540c0aaa96cb3ffe35958"
                }
            },
            "204313501" : {
                "name" : "亲爱的恩东啊",
                "browser" : "all",
                "location" : "all",
                "download" : {
                    "android" : "http://mbdapp.iqiyi.com/j/ap/iqiyi_699.apk",
                    "ios" : "http://ota.iqiyi.com/adf/781a99e96c5540c0aaa96cb3ffe35958"
                }
            },
            "204259301" : {
                "name" : "没有承诺的爱",
                "browser" : "all",
                "location" : "all",
                "download" : {
                    "android" : "http://mbdapp.iqiyi.com/j/ap/iqiyi_1840.apk",
                    "ios" : "http://ota.iqiyi.com/adf/781a99e96c5540c0aaa96cb3ffe35958"
                }
            },
            "204177901" : {
                "name" : "灭罪师",
                "browser" : "all",
                "location" : "all",
                "download" : {
                    "android" : "http://mbdapp.iqiyi.com/j/ap/iqiyi_1719.apk",
                    "ios" : "http://ota.iqiyi.com/adf/781a99e96c5540c0aaa96cb3ffe35958"
                }
            },
            "204268101" : {
                "name" : "江湖麻辣烫之尊上驾到",
                "browser" : "all",
                "location" : "all",
                "download" : {
                    "android" : "http://mbdapp.iqiyi.com/j/ap/iqiyi_1841.apk",
                    "ios" : "http://ota.iqiyi.com/adf/781a99e96c5540c0aaa96cb3ffe35958"
                }
            },
            "203164301" : {
                "name" : "老九门",
                "browser" : "all",
                "location" : "all",
                "download" : {
                    "android" : "http://mbdapp.iqiyi.com/j/ap/iqiyi_1843.apk",
                    "ios" : "http://ota.iqiyi.com/adf/781a99e96c5540c0aaa96cb3ffe35958"
                }
            },
            "204107701" : {
                "name" : "命运规则",
                "browser" : "all",
                "location" : "all",
                "download" : {
                    "android" : "http://mbdapp.iqiyi.com/j/ap/iqiyi_1817.apk",
                    "ios" : "http://ota.iqiyi.com/adf/781a99e96c5540c0aaa96cb3ffe35958"
                }
            },
            "203326001" : {
                "name" : "请回答1988",
                "browser" : "all",
                "location" : "all",
                "download" : {
                    "android" : "http://mbdapp.iqiyi.com/j/ap/iqiyi_1839.apk",
                    "ios" : "http://ota.iqiyi.com/adf/781a99e96c5540c0aaa96cb3ffe35958"
                }
            },
            "204101201" : {
                "name" : "超能快递侠",
                "browser" : "all",
                "location" : "all",
                "download" : {
                    "android" : "http://mbdapp.iqiyi.com/j/ap/iqiyi_1841.apk",
                    "ios" : "http://ota.iqiyi.com/adf/781a99e96c5540c0aaa96cb3ffe35958"
                }
            },
            "204067501" : {
                "name" : "狭路",
                    "browser" : "all",
                    "location" : "all",
                    "download" : {
                    "android" : "http://mbdapp.iqiyi.com/j/ap/iqiyi_1719.apk",
                    "ios" : "http://ota.iqiyi.com/adf/781a99e96c5540c0aaa96cb3ffe35958"
                }
            },
            "204064201" : {
                "name" : "余罪第二季",
                "browser" : "all",
                "location" : "all",
                "download" : {
                    "android" : "http://mbdapp.iqiyi.com/j/ap/iqiyi_1717.apk",
                    "ios" : "http://ota.iqiyi.com/adf/781a99e96c5540c0aaa96cb3ffe35958"
                }
            },
            "203556701" : {
                "name" : "陈白露",
                "browser" : "all",
                "location" : "all",
                "download" : {
                    "android" : "http://mbdapp.iqiyi.com/j/ap/iqiyi_1842.apk",
                    "ios" : "http://ota.iqiyi.com/adf/781a99e96c5540c0aaa96cb3ffe35958"
                }
            },
            "203966401" : {
                "name" : "余罪第1季",
                "browser" : "all",
                "location" : "all",
                "download" : {
                    "android" : "http://mbdapp.iqiyi.com/j/ap/iqiyi_1717.apk ",
                    "ios" : "http://ota.iqiyi.com/adf/781a99e96c5540c0aaa96cb3ffe35958"
                }
            },
            "203853401":{
                "name" : "废柴兄弟4",
                "browser" : "all",
                "location" : "all",
                "download" : {
                    "android" : "http://mbdapp.iqiyi.com/j/ap/iqiyi_1839.apk",
                    "ios" : "http://ota.iqiyi.com/adf/781a99e96c5540c0aaa96cb3ffe35958"
                }
            },
            "203897301":{
                "name" : "乾隆秘史",
                "browser" : "all",
                "location" : "all",
                "download" : {
                    "android" : "http://mbdapp.iqiyi.com/j/ap/iqiyi_1719.apk",
                    "ios" : "http://ota.iqiyi.com/adf/781a99e96c5540c0aaa96cb3ffe35958"
                }
            },
            "203278201":{
                "name" : "最好的我们",
                "browser" : "all",
                "location" : "all",
                "download" : {
                    "android" : "http://mbdapp.iqiyi.com/j/ap/iqiyi_1816.apk",
                    "ios" : "http://ota.iqiyi.com/adf/781a99e96c5540c0aaa96cb3ffe35958"
                }
            },
            "203636501":{
                "name" : "穿越谜团",
                "browser" : "all",
                "location" : "all",
                "download" : {
                    "android" : "http://mbdapp.iqiyi.com/j/ap/iqiyi_1842.apk",
                    "ios" : "http://ota.iqiyi.com/adf/781a99e96c5540c0aaa96cb3ffe35958"
                }
            },
            "202938201" : {
                "name" : "太阳的后裔",
                "browser" : "all",
                "location" : "all",
                "download" : {
                    "android" : "http://mbdapp.iqiyi.com/j/ap/iqiyi_10201.apk",
                    "ios" : "http://ota.iqiyi.com/adf/781a99e96c5540c0aaa96cb3ffe35958"
                },
                "special" : true
            },
            "203325501" : {
                "name" : "都市妖奇谈",
                "browser" : "all",
                "location" : "all",
                "download" : {
                    "android" : "http://mbdapp.iqiyi.com/j/ap/iqiyi_1719.apk",
                    "ios" : "http://ota.iqiyi.com/adf/781a99e96c5540c0aaa96cb3ffe35958"
                }
            },
            "202437601" : {
                "name" : "灵魂摆渡2",
                "browser" : "all",
                "location" : "all",
                "download" : {
                    "android" : "http://mbdapp.iqiyi.com/j/ap/iqiyi_1842.apk",
                    "ios" : "http://ota.iqiyi.com/adf/781a99e96c5540c0aaa96cb3ffe35958"
                }
            },
            "202112301" : {
                "name" : "新济公活佛",
                "browser" : "all",
                "location" : "all",
                "download" : {
                    "android" : "http://mbdapp.iqiyi.com/j/ap/iqiyi_10201.apk",
                    "ios" : "http://ota.iqiyi.com/adf/781a99e96c5540c0aaa96cb3ffe35958"
                }
            },
            "202112401" : {
                "name" : "新济公活佛未删减版",
                "browser" : "all",
                "location" : "all",
                "download" : {
                    "android" : "http://mbdapp.iqiyi.com/j/ap/iqiyi_10201.apk",
                    "ios" : "http://ota.iqiyi.com/adf/781a99e96c5540c0aaa96cb3ffe35958"
                }
            },
            "203114101" : {
                "name" : "新济公活佛下部",
                "browser" : "all",
                "location" : "all",
                "download" : {
                    "android" : "http://mbdapp.iqiyi.com/j/ap/iqiyi_10201.apk",
                    "ios" : "http://ota.iqiyi.com/adf/781a99e96c5540c0aaa96cb3ffe35958"
                }
            },
            "203114801" : {
                "name" : "新济公活佛下部未删减版",
                "browser" : "all",
                "location" : "all",
                "download" : {
                    "android" : "http://mbdapp.iqiyi.com/j/ap/iqiyi_10201.apk",
                    "ios" : "http://ota.iqiyi.com/adf/781a99e96c5540c0aaa96cb3ffe35958"
                }
            },
            "203062601" : {
                "name" : "蜀山战纪第2季",
                "browser" : "all",
                "location" : "all",
                "download" : {
                    "android" : "http://mbdapp.iqiyi.com/j/ap/iqiyi_1841.apk",
                    "ios" : "http://ota.iqiyi.com/adf/781a99e96c5540c0aaa96cb3ffe35958"
                }
            },
            "202550601" : {
                "name" : "蜀山战纪第1季",
                "browser" : "all",
                "location" : "all",
                "download" : {
                    "android" : "http://mbdapp.iqiyi.com/j/ap/iqiyi_1841.apk",
                    "ios" : "http://ota.iqiyi.com/adf/781a99e96c5540c0aaa96cb3ffe35958"
                }
            },
            "203166401" : {
                "name" : "蜀山战纪第3季",
                "browser" : "all",
                "location" : "all",
                "download" : {
                    "android" : "http://mbdapp.iqiyi.com/j/ap/iqiyi_1841.apk",
                    "ios" : "http://ota.iqiyi.com/adf/781a99e96c5540c0aaa96cb3ffe35958"
                }
            },
            "203166501" : {
                "name" : "蜀山战纪第4季",
                "browser" : "all",
                "location" : "all",
                "download" : {
                    "android" : "http://mbdapp.iqiyi.com/j/ap/iqiyi_1841.apk",
                    "ios" : "http://ota.iqiyi.com/adf/781a99e96c5540c0aaa96cb3ffe35958"
                }
            },
            "203166601" : {
                "name" : "蜀山战纪第5季",
                "browser" : "all",
                "location" : "all",
                "download" : {
                    "android" : "http://mbdapp.iqiyi.com/j/ap/iqiyi_1841.apk",
                    "ios" : "http://ota.iqiyi.com/adf/781a99e96c5540c0aaa96cb3ffe35958"
                }
            },
            "203152901" : {
                "name" : "替身",
                "browser" : "all",
                "location" : "all",
                "download" : {
                    "android" : "http://mbdapp.iqiyi.com/j/ap/iqiyi_1719.apk",
                    "ios" : "http://ota.iqiyi.com/adf/781a99e96c5540c0aaa96cb3ffe35958"
                }
            },
            "202467501" : {
                "name" : "心理罪",
                "browser" : "all",
                "location" : "all",
                "download" : {
                    "android" : "http://mbdapp.iqiyi.com/j/ap/iqiyi_1717.apk",
                    "ios" : "http://ota.iqiyi.com/adf/781a99e96c5540c0aaa96cb3ffe35958"
                }
            },
            "202635601" : {
                "name" : "校花的贴身高手",
                "browser" : "all",
                "location" : "all",
                "download" : {
                    "android" : "http://mbdapp.iqiyi.com/j/ap/iqiyi_1717.apk",
                    "ios" : "http://ota.iqiyi.com/adf/781a99e96c5540c0aaa96cb3ffe35958"
                }
            },
            "259247" : {
                "name" : "非常宅",
                "browser" : "all",
                "location" : "all",
                "download" : {
                    "android" : "http://mbdapp.iqiyi.com/j/ap/iqiyi_1717.apk",
                    "ios" : "http://ota.iqiyi.com/adf/781a99e96c5540c0aaa96cb3ffe35958"
                }
            },
            "115924701" : {
                "name" : "非常宅",
                "browser" : "all",
                "location" : "all",
                "download" : {
                    "android" : "http://mbdapp.iqiyi.com/j/ap/iqiyi_1717.apk",
                    "ios" : "http://ota.iqiyi.com/adf/781a99e96c5540c0aaa96cb3ffe35958"
                }
            },
            "202536601" : {
                "name" : "错配搭档第1季",
                "browser" : "all",
                "location" : "all",
                "download" : {
                    "android" : "http://mbdapp.iqiyi.com/j/ap/iqiyi_1717.apk",
                    "ios" : "http://ota.iqiyi.com/adf/781a99e96c5540c0aaa96cb3ffe35958"
                }
            },
            "202989601" : {
                "name" : "活着再见",
                "browser" : "all",
                "location" : "all",
                "download" : {
                    "android" : "http://mbdapp.iqiyi.com/j/ap/iqiyi_1719.apk",
                    "ios" : "http://ota.iqiyi.com/adf/781a99e96c5540c0aaa96cb3ffe35958"
                }
            },
            "203034501" : {
                "name" : "美梦成真",
                "browser" : "all",
                "location" : "all",
                "download" : {
                    "android" : "http://mbdapp.iqiyi.com/j/ap/iqiyi_1816.apk",
                    "ios" : "http://ota.iqiyi.com/adf/781a99e96c5540c0aaa96cb3ffe35958"
                }
            },
            "202842701" : {
                "name" : "废柴兄弟3",
                "browser" : "all",
                "location" : "all",
                "download" : {
                    "android" : "http://mbdapp.iqiyi.com/j/ap/iqiyi_1717.apk",
                    "ios" : "http://ota.iqiyi.com/adf/781a99e96c5540c0aaa96cb3ffe35958"
                }
            },
            "203325801" : {
                "name" : "哦我的鬼神大人",
                "browser" : "all",
                "location" : "all",
                "download" : {
                    "android" : "http://mbdapp.iqiyi.com/j/ap/iqiyi_1816.apk",
                    "ios" : "http://ota.iqiyi.com/adf/781a99e96c5540c0aaa96cb3ffe35958"
                }
            },
            "203276301" : {
                "name" : "老师晚上好",
                "browser" : "all",
                "location" : "all",
                "download" : {
                    "android" : "http://mbdapp.iqiyi.com/j/ap/iqiyi_1816.apk",
                    "ios" : "http://ota.iqiyi.com/adf/781a99e96c5540c0aaa96cb3ffe35958"
                }
            },
            "203440801" : {
                "name" : "百变五侠之我是大明星",
                "browser" : "all",
                "location" : "all",
                "download" : {
                    "android" : "http://mbdapp.iqiyi.com/j/ap/iqiyi_1842.apk",
                    "ios" : "http://ota.iqiyi.com/adf/781a99e96c5540c0aaa96cb3ffe35958"
                }
            },
            "203589101" : {
                "name" : "灵域2",
                "browser" : "all",
                "location" : "all",
                "download" : {
                    "android" : "http://mbdapp.iqiyi.com/j/ap/iqiyi_1717.apk",
                    "ios" : "http://ota.iqiyi.com/adf/781a99e96c5540c0aaa96cb3ffe35958"
                }
            },
            "203564601" : {
                "name" : "龙心战纪",
                "browser" : "all",
                "location" : "all",
                "download" : {
                    "android" : "http://mbdapp.iqiyi.com/j/ap/iqiyi_1840.apk ",
                    "ios" : "http://ota.iqiyi.com/adf/781a99e96c5540c0aaa96cb3ffe35958"
                }
            },
            "203709401" : {
                "name" : "假如我有超能力",
                "browser" : "all",
                "location" : "all",
                "download" : {
                    "android" : "http://mbdapp.iqiyi.com/j/ap/iqiyi_1839.apk",
                    "ios" : "http://ota.iqiyi.com/adf/781a99e96c5540c0aaa96cb3ffe35958"
                }
            },
            "202203201": {
                "name": "盗墓笔记",
                "browser" : "all",
                "location" : "all",
                "download": {
                    "android": "http://mbdapp.iqiyi.com/j/ap/iqiyi_1891.apk",
                    "ios": "http://ota.iqiyi.com/adf/781a99e96c5540c0aaa96cb3ffe35958"
                }
            },
            "202321601": {
                "name": "花千骨",
                "browser" : "all",
                "location" : "all",
                "download": {
                    "android": "http://mbdapp.iqiyi.com/j/ap/iqiyi_1838.apk",
                    "ios": "http://ota.iqiyi.com/adf/781a99e96c5540c0aaa96cb3ffe35958"
                }
            },
            "202328401": {
                "name": "加油吧实习生",
                "browser" : "all",
                "location" : "all",
                "download": {
                    "android": "http://mbdapp.iqiyi.com/j/ap/iqiyi_699.apk",
                    "ios": "http://ota.iqiyi.com/adf/781a99e96c5540c0aaa96cb3ffe35958"
                }
            },
            "202437701": {
                "name": "克拉恋人",
                "browser" : "all",
                "location" : "all",
                "download": {
                    "android": "http://mbdapp.iqiyi.com/j/ap/iqiyi_1843.apk",
                    "ios": "http://ota.iqiyi.com/adf/781a99e96c5540c0aaa96cb3ffe35958"
                }
            },
            "384616000": {
                "name": "我去上学啦",
                "browser" : "all",
                "location" : "all",
                "download": {
                    "android": "http://mbdapp.iqiyi.com/j/ap/iqiyi_1842.apk",
                    "ios": "http://ota.iqiyi.com/adf/781a99e96c5540c0aaa96cb3ffe35958"
                }
            },
            "202945101": {
                "name": "多情江山",
                "browser" : "all",
                "location" : "all",
                "download": {
                    "android": "http://mbdapp.iqiyi.com/j/ap/iqiyi_10201.apk",
                    "ios": "http://ota.iqiyi.com/adf/781a99e96c5540c0aaa96cb3ffe35958"
                }
            },
            "202121101": {
                "name": "琅琊榜",
                "browser" : "all",
                "location" : "all",
                "download": {
                    "android": "http://mbdapp.iqiyi.com/j/ap/iqiyi_10200.apk",
                    "ios": "http://ota.iqiyi.com/adf/781a99e96c5540c0aaa96cb3ffe35958"
                }
            },
            "203067201": {
                "name": "大秧歌",
                "browser" : "all",
                "location" : "all",
                "download": {
                    "android": "http://mbdapp.iqiyi.com/j/ap/iqiyi_1817.apk",
                    "ios": "http://ota.iqiyi.com/adf/781a99e96c5540c0aaa96cb3ffe35958"
                }
            },
            "203067101": {
                "name": "北上广不相信眼泪",
                "browser" : "all",
                "location" : "all",
                "download": {
                    "android": "http://mbdapp.iqiyi.com/j/ap/iqiyi_1719.apk",
                    "ios": "http://ota.iqiyi.com/adf/781a99e96c5540c0aaa96cb3ffe35958"
                }
            },
            "203386201": {
                "name": "少帅",
                "browser" : "all",
                "location" : "all",
                "download": {
                    "android": "http://mbdapp.iqiyi.com/j/ap/iqiyi_1843.apk",
                    "ios": "http://ota.iqiyi.com/adf/781a99e96c5540c0aaa96cb3ffe35958"
                }
            },
            "202744901": {
                "name": "奇葩说2",
                "browser" : "all",
                "location" : "all",
                "download": {
                    "android": "http://mbdapp.iqiyi.com/j/ap/iqiyi_1840.apk",
                    "ios": "http://ota.iqiyi.com/adf/781a99e96c5540c0aaa96cb3ffe35958"
                }
            },
            "204346701": {
                "name": "天机迷",
                "browser" : "all",
                "location" : "all",
                "download": {
                    "android": "http://mbdapp.iqiyi.com/j/ap/iqiyi_1841.apk",
                    "ios": "http://ota.iqiyi.com/adf/781a99e96c5540c0aaa96cb3ffe35958"
                }
            },
            "204147201": {
                "name": "警花与警犬",
                "browser" : "all",
                "location" : "all",
                "download": {
                    "android": "http://mbdapp.iqiyi.com/j/ap/iqiyi_1845.apk",
                    "ios": "http://ota.iqiyi.com/adf/781a99e96c5540c0aaa96cb3ffe35958"
                }
            },
            "202548801": {
                "name": "秀丽江山之长歌行",
                "browser" : "all",
                "location" : "all",
                "download": {
                    "android": "http://mbdapp.iqiyi.com/j/ap/iqiyi_1845.apk",
                    "ios": "http://ota.iqiyi.com/adf/781a99e96c5540c0aaa96cb3ffe35958"
                }
            },
            "204185301": {
                "name": "神犬小七第二季",
                "browser" : "all",
                "location" : "all",
                "download": {
                    "android": "http://mbdapp.iqiyi.com/j/ap/iqiyi_1845.apk",
                    "ios": "http://ota.iqiyi.com/adf/781a99e96c5540c0aaa96cb3ffe35958"
                }
            },
            "204284801": {
                "name": "多少爱可以重来",
                "browser" : "all",
                "location" : "all",
                "download": {
                    "android": "http://mbdapp.iqiyi.com/j/ap/iqiyi_1845.apk",
                    "ios": "http://ota.iqiyi.com/adf/781a99e96c5540c0aaa96cb3ffe35958"
                }
            },
            "203288701": {
                "name": "幻城",
                "browser" : "all",
                "location" : "all",
                "download": {
                    "android": "http://mbdapp.iqiyi.com/j/ap/iqiyi_1845.apk",
                    "ios": "http://ota.iqiyi.com/adf/781a99e96c5540c0aaa96cb3ffe35958"
                }
            },
            "204274901": {
                "name": "硬骨头",
                "browser" : "all",
                "location" : "all",
                "download": {
                    "android": "http://mbdapp.iqiyi.com/j/ap/iqiyi_1845.apk",
                    "ios": "http://ota.iqiyi.com/adf/781a99e96c5540c0aaa96cb3ffe35958"
                }
            },
            "203316801": {
                "name": "好先生",
                "browser" : "all",
                "location" : "all",
                "download": {
                    "android": "http://mbdapp.iqiyi.com/j/ap/iqiyi_1845.apk",
                    "ios": "http://ota.iqiyi.com/adf/781a99e96c5540c0aaa96cb3ffe35958"
                }
            },
            "151646701": {
                "name": "爱情公寓4",
                "browser" : "all",
                "location" : "all",
                "download": {
                    "android": "http://mbdapp.iqiyi.com/j/ap/iqiyi_1845.apk",
                    "ios": "http://ota.iqiyi.com/adf/781a99e96c5540c0aaa96cb3ffe35958"
                }
            },
            "204042201": {
                "name": "跨界歌王",
                "browser" : "all",
                "location" : "all",
                "download": {
                    "android": "http://mbdapp.iqiyi.com/j/ap/iqiyi_1845.apk",
                    "ios": "http://ota.iqiyi.com/adf/781a99e96c5540c0aaa96cb3ffe35958"
                }
            },
            "203902301": {
                "name": "我去上学啦第2季",
                "browser" : "all",
                "location" : "all",
                "download": {
                    "android": "http://mbdapp.iqiyi.com/j/ap/iqiyi_1845.apk",
                    "ios": "http://ota.iqiyi.com/adf/781a99e96c5540c0aaa96cb3ffe35958"
                }
            },
            'default': {
                "name" : "default",
                "browser" : "all",
                "location" : "all",
                "download" : {
                    "android" : "http://mbdapp.iqiyi.com/j/ap/iqiyi_1845.apk ",
                    "ios" : "http://ota.iqiyi.com/adf/781a99e96c5540c0aaa96cb3ffe35958"
                }
            }
        },

        specialFlowTipVideo : {
            "202938201" : {
                "name" : "太阳的后裔",
                "browser" : "all",
                "location" : "all",
                "download" : {
                    "android" : "http://mbdapp.iqiyi.com/j/ap/iqiyi_10201.apk",
                    "ios" : "http://ota.iqiyi.com/adf/781a99e96c5540c0aaa96cb3ffe35958"
                }
            }
        },

        flowTipVideo: {
            seriesList: {},
            active_sid: {}
        },
        pidPackage : {// 套餐 pid 与套餐类型关系表
            'HUANG_JIN' : 'a0226bd958843452',
            'BAI_YIN' : 'a232698bebb30ebd',
            'BAI_JIN' : 'adb3376b039b970b',
            'a0226bd958843452' : 'HUANG_JIN',
            'a232698bebb30ebd' : 'BAI_YIN',
            'adb3376b039b970b' : 'BAI_JIN'
        },
        playListOrder : { // 播放页连播顺序配置: priority 值越小优先级越高
            "albumList" : 1, // 剧集类列表
            "sourceList" : 1, // 来源类列表
            "playList" : 1, // 短视频播放列表
            "wonderful" : 2, // 精彩看点
            "focus" : 2, // 看点
            "videoAround" : 3, // 周边延伸
            "soundtrack" : 4, // 原声大碟
            "series" : 5, // 系列
            "recommend" : 6 // 猜你喜欢
        }
    });

    module.exports = config;
});
