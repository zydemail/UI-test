
exports.wait = wait;

/**
 * 封装 setTimeout 为 Promise
 * @param  {int}   time     必选，单位ms，等待时长
 * @param  {Function} fn    可选，回调函数，等待后执行
 * @return {Promise} Promise对象
 */
function wait(time, fn) {
    return new Promise(function(resolve) {
        setTimeout(function() {
            var rtn = typeof fn === "function" ? fn() : undefined;
            resolve(rtn);
        }, time);
    });
}

