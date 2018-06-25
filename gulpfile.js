var codeReplace = require('./index');
var gulp = require('gulp');

gulp.task('default', function () {
    gulp.src(['demo/**/*.*', '!demo/cr-tmps/**/*.*'])
        .pipe(codeReplace('./demo/cr-tmps'))
        .pipe(gulp.dest('build'));
});