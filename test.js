var assert = require('assert');
var File = require('vinyl');
var codeReplace = require('./');

describe('gulp-code-replace', function () {
    it('codeReplace test', function (done) {

        var file = new File({
            path: 'test.html',
            contents: new Buffer('{{tmp.html}}')
        });
        var tempFile = new File({
            path: './cr-tmps/tmp.html',
            contents: new Buffer('这是替换后的结果')
        });

        
        //TODO: deal files
        
        stream.once('data', function (file) {
            assert.equal(file.contents.toString(), '这是替换后的结果');
            done();
        });

    });
});