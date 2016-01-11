(function () {
    'use strict';

    var gulp = require('gulp'),
        rename = require('gulp-rename'),
        uglify = require('gulp-uglify'),
        header = require('gulp-header'),
        jshint = require('gulp-jshint'),
        strip = require('gulp-strip-comments'),
        removeEmptyLines = require('gulp-remove-empty-lines'),
        zip = require('gulp-zip'),
        pkg = require('./package.json');

    var banner = [
        '/**',
        ' * <%= pkg.name %> - <%= pkg.description %>',
        ' * @version v<%= pkg.version %>',
        ' * @author <%= pkg.author %>',
        ' * @homepage <%= pkg.homepage %>',
        ' * @repository <%= pkg.repository.url %>',
        ' */',
        ''
    ].join('\n');

    gulp.task('copy', function () {
        return gulp.src('src/webStorage.js')
            .pipe(strip())
            .pipe(removeEmptyLines())
            .pipe(header(banner, {
                pkg: pkg
            }))
            .pipe(gulp.dest('dist'));
    });

    gulp.task('minify', function () {
        return gulp.src('src/webStorage.js')
            .pipe(uglify())
            .pipe(rename({
                extname: '.min.js'
            }))
            .pipe(header(banner, {
                pkg: pkg
            }))
            .pipe(gulp.dest('dist'));
    });

    gulp.task('lint', function () {
        return gulp.src('./src/webStorage.js')
            .pipe(jshint())
            .pipe(jshint.reporter('jshint-stylish'));
    });

    function compressFn() {
        return gulp
            .src('dist/*')
            .pipe(zip('dist.zip'))
            .pipe(gulp.dest('./'));
    }

    gulp.task('build', ['lint', 'copy', 'minify']);
    gulp.task('build_travis', ['lint', 'copy', 'minify'], compressFn);
}());
