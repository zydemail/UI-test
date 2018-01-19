define(function (require, exports, module) {

    module.exports = APP.createService({

        get: function (url, params) {
            return $.ajax({
                url: url,
                data: params || {},
                type: 'GET'
            });
        },

        post: function (url, params) {
            return $.ajax({
                url: url,
                data: params || {},
                type: 'POST'
            });
        },

        jsonp: function (url, params) {
            return $.ajax({
                url: url,
                data: params || {},
                dataType: 'jsonp'
            });
        }

    });

});