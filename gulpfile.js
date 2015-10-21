var gulp = require('gulp');
var runSequence = require('run-sequence');
var del = require('del');
var merge = require('merge-stream');

gulp.task('build', function () {
    runSequence('clean', 'cp-assets');
});

gulp.task('clean', function () {
    return del('public/**/*');
});

gulp.task('cp-assets', function () {
    var images = gulp.src('./src/img/*')
        .pipe(gulp.dest('./public/img'));
    var css = gulp.src('./src/css/*')
        .pipe(gulp.dest('./public/css'));

    return merge(images, css);
});