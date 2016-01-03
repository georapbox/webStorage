var gulp = require('gulp'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    header = require('gulp-header'),
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
    return gulp.src('src/webStorage.js').
        pipe(header(banner, {
            pkg: pkg
        })).
        pipe(gulp.dest('dist'));
});

gulp.task('minify', function () {
    return gulp.src('src/webStorage.js').
        pipe(uglify()).
        pipe(rename({
            extname: '.min.js'
        })).
        pipe(header(banner, {
            pkg: pkg
        })).
        pipe(gulp.dest('dist'));
});
