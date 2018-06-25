# USAGE
```js
var codeReplace = require('gulp-code-replace');
var gulp = require('gulp');

gulp.task('default', function () {
    gulp.src(['demo/**/*.*', '!demo/cr-tmps/**/*.*'])
        .pipe(codeReplace('./demo/cr-tmps')) //pass the template base path
        .pipe(gulp.dest('build'));
});
```