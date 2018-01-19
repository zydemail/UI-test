define(function(require, exports, module) {
    var config = require("../../../common/service/config/config");
    var user = require("../../../common/service/user/user");
    module.exports = APP.createService({
        _cache : {},
        _handle : {},
        format : function(data){
            // 替换mixer接口对应字段
            data.cid = data.cid || data.channelId;
            data.videoName = data.vn || data.videoName || data.name;
            data.imageUrl = data.apic || data.imageUrl || data.albumImageUrl;
            data.shareCount = data.sc || data.shareCount;
            data.qitanId = data.qitanid || data.qitanId;
            data.sourceName = data.s || data.sourceName;
            data.userId = data.uid || data.userId;
            data.userName = data.un || (data.user && data.user.name);
            data.order = data.pd || data.order;
            data.period = data.ty || data.period;
            data.commentCount = data.cc || data.commentCount;
            data.albumName = data.an || data.albumName || data.videoName;
            data.sid = (data.sourceId == "0") ? false : data.sourceId;
            data.userVideoCount = data.user && data.user.videoCount;
            data.followerCount = data.user && data.user.followerCount;
            data.isUploadVideo = data.isUploadVideo || !!(data.userId && data.userName && data.userVideoCount && data.followerCount);
            data.commentAllowed = (!!data.commentAllowed) ? "true" : "false";
            data.desc = data.info || data.description;
            // mixer接口兼容新老数据tvid
            data.tvId = (data.tvId == data.qipuId) ? data.tvId : data. qipuId;
            data.tvid = data.tvid || data.tvId;
            data.vu = data.vu || data.url;
            data.aid = data.aid || data.albumId;
            data.vn = data.name;
            data.vpic = data.vpic || data.videoImageUrl;
            data.subt = data.subtitle;
            data.plg = data.duration;
            data.c = data.cid;
            data.cType = data.contentType || data.cType;
            // 连播时用到vType、subType、c三个字段来判断模板类型，mixer接口无对应subType
            // 新增判断视频subType: 7为单视频、1为长视频剧集类、2为长视频来源类
            data.vType = data.videoType || data.vType;
            if(!data.sourceId && data.solo == 1){
                data.subType = 7;
            }else if(!data.sourceId && data.solo == 0){
                data.subType = 1;
            }else if(!!data.sourceId){
                data.subType = 2;
            }
            if((data.tvid + "").length < 7){
                data.vrsid = data.tvid;
            }
            //当为混合剧集时，直接展示vip入口，当不是混合剧集且data.albumBossStatus == 2为付费剧集，展示vip入口
            data.bossMixerAlbum = data.bossMixerAlbum || (data.albumBossStatus == 2 ? true : false);
            data.bossStatus = data.bossStatus || data.isPurchase;
            return data;
        },
        setCache : function(data, params){
            //默认参数取cast，包括hosts,directors,mainActors,guests,actors等视频信息展示数据
            var id = JSON.stringify({
                url : config.interfaces.ugcVI + params.tvid,
                dataType : "jsonp",
                cache : true,
                data: { 
                    select : params.select || "cast" 
                },
                success : function(data){
                    callback({
                        code : 'A00000',
                        data : data
                    });
                },
                error : function(data){
                    failure && failure(data);
                }
            });
             //判断模板类型，数据中没有vType字段，需要根据userId的值判断vType
            data.vType = (data.userId && data.userId != '') ? (data.vType != 2) : -1;
            this._cache[id] = data;            
        },
        //兼容旧版调用mixer入口
        getVideoInfo : function(tvid, vid, callback, failure) {
            var that = this;
            this.VJInterface({
                tvid : tvid,
                vid : vid || ''
            }, function(data) {
                callback(that.format(data.data));
            }, failure);
        },
        VJInterface : function(opt, callback, failure){
            var that = this;
            this.ajax({
                url : config.interfaces.ugcVI + opt.tvid,
                dataType : "jsonp",
                cache : true,
                data: { 
                    select : opt.select || "cast"
                },
                success : function(data){
                    callback({
                        code : 'A00000',
                        data : data
                    });
                },
                error : function(data){
                    failure && failure(data);
                }
            });
        },
        ajax : function(opt){
            var that = this;
            var id = JSON.stringify(opt);
            if (this._cache[id] && this._cache[id] != "waiting") {
                opt.success && opt.success(this._cache[id]);
                opt.complete && opt.complete(this._cache[id]);
            } else if(this._cache[id] == "waiting"){
                this._handle[id].push({"success" : opt.success, "error" : opt.error, "complete" : opt.complete});
            } else if(this._cache[id] == undefined || this._cache[id] == "failed"){
                this._handle[id] = [{"success" : opt.success, "error" : opt.error, "complete" : opt.complete}];
                opt.success = function(data){
                    that._cache[id] = data;
                    that._handle[id].forEach(function(handle){
                        handle.success && handle.success(data);
                    });
                };
                opt.error = function(data){
                    that._cache[id] = "failed";
                    that._handle[id].forEach(function(handle){
                        handle.error && handle.error(data);
                    });
                };
                opt.complete = function(data){
                    that._handle[id].forEach(function(handle){
                        handle.complete && handle.complete(data);
                    });
                };
                $.ajax(opt);
                this._cache[id] = "waiting";
            }
        }
    });
});
