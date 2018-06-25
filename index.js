// through2 是一个对 node 的 transform streams 简单封装
var through = require('through2');
// var gutil = require('gulp-util');
// var PluginError = gutil.PluginError;
var fs = require('fs');

// 常量
const PLUGIN_NAME = 'gulp-code-replace';

// 公共变量
var errArr = [];

/**
 * 文件内容处理
 *
 * @param {String} tmpPath 模版路径
 * @param {String} str 文件内容
 * @returns
 */
function codeRep(tmpPath, str) {
    str = str.replace(/\{\{([^}}]+)?\}\}/g, function ($0, $1) {
        var res = $0;
        try {
            res = fs.readFileSync(`${tmpPath}/${$1}`);
        } catch (error) {
            errArr.push(error);
            // throw new PluginError(PLUGIN_NAME, `no such file or directory, open ${error.path}`);
        } finally {
            return res;
        }

    });
    return str;
}

/**
 * 插件入口
 *
 * @param {String} tmpPath
 * @returns
 */
function gulpCodeReplace(tmpPath) {
    return through.obj(function (file, enc, cb) {
        if (file.isNull()) cb(null, file);

        var result = codeRep(tmpPath, file.contents.toString());

        if (file.isBuffer()) {
            file.contents = new Buffer(result);
        }

        if (file.isStream()) {
            var stream = through();
            result = stream.write(result);

            file.contents = file.contents.pipe(result);
        }

        cb(null, file);

    });

};

module.exports = gulpCodeReplace;