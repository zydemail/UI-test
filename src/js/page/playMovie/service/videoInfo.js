define(function(require, exports, module) {
    var interfaces = require("../../../common/service/config/config").interfaces;
    var videoInfo = require("../../../common/service/utils/videoInfo");

    module.exports = APP.createService({
         _cache: {},
        _handle: {},
        
        getAlbumOrSourceInfo: function(params) {
            var self = this;
            var id = params.id;
            var url = interfaces.albumInfo + id;
            var deferred = $.Deferred();
            this.ajax({
                url: url,
                dataType: 'jsonp',
                cache: true,
                success: function(data){
                    deferred.resolve(data);
                },
                error: function(xhr, errorType, error){
                    deferred.reject(error);
                }
            });
            return deferred;
        },
        getVideoParams: function(params) {
            var self = this;
            return $.Deferred(function(deferred) {
                videoInfo.getVideoInfo(params.tvid, params.vid, function(data) {
                    data.templateType = self.getVideoTemplateType(data);
                    deferred.resolve(data);
                });
            }).promise();
        },
        getVideoTemplateType: function(data) { // 根据vi视频信息判断视频模板类型
            // 接口wiki: http://wiki.qiyi.domain/pages/viewpage.action?pageId=10763348
            // 1、"vType": 0         //0:PPC , 1:PGC , 2:UGC
            // 2、"subType": 1,      //新增判断视频是 7,单视频、1,长视频剧集类、2,长视频来源类
            // 3、"c": 1,            // 频道Id
            var templateType = "";
            if (data.subType == 1) {
                templateType = "ALBUM";
            } else if (data.subType == 2) {
                templateType = "SOURCE";
            } else {
                if (data.c == 1 && data.vType != 2) {
                    templateType = "MOVIE";
                } else {
                    templateType = "SHORT";
                }
            }
            return templateType;
        },
        // 缓存设置与并发处理
        ajax: function(opt) {
            var that = this;
            var id = JSON.stringify(opt);
            if (this._cache[id] && this._cache[id] != "waiting") {
                opt.success && opt.success(this._cache[id]);
                opt.complete && opt.complete(this._cache[id]);
            } else if (this._cache[id] == "waiting") {
                this._handle[id].push({
                    "success" : opt.success,
                    "error" : opt.error,
                    "complete" : opt.complete
                });
            } else if (this._cache[id] == undefined || this._cache[id] == "failed") {
                this._handle[id] = [{
                    "success" : opt.success,
                    "error" : opt.error,
                    "complete" : opt.complete
                }];
                opt.success = function(data) {
                    that._cache[id] = data;
                    that._handle[id].forEach(function(handle) {
                        handle.success && handle.success(data);
                    });
                };
                opt.error = function(data) {
                    that._cache[id] = "failed";
                    that._handle[id].forEach(function(handle) {
                        handle.error && handle.error(data);
                    });
                };
                opt.complete = function(data) {
                    that._handle[id].forEach(function(handle) {
                        handle.complete && handle.complete(data);
                    });
                };
                $.ajax(opt);
                this._cache[id] = "waiting";
            }
        }

    });
});