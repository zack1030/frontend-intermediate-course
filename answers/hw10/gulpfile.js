var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var uglifycss = require('gulp-uglifycss');
var babel = require('gulp-babel');
var jshint = require('gulp-jshint');
var stylus = require('gulp-stylus');
var webpack = require('gulp-webpack');
var fs = require('fs');
var replace = require('gulp-replace');
gulp.task('default', ['html']);
gulp.task('build', ['js', 'css']);
gulp.task('lint', function() {
    gulp.src('src/js/*.js')
        .pipe(babel({presets: ['es2015']}))
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
gulp.task('js', function(){
    return gulp.src('src/js/bundle.js')
//        .pipe(concat('bundle.js'))
        .pipe(babel({presets: ['es2015']}))
        .pipe(uglify())
        .pipe(gulp.dest('build/'));
});
gulp.task('css', function () {
    return gulp.src('src/css/*.styl')
        .pipe(stylus())
        .pipe(gulp.dest('build/'));
});
gulp.task('html', function () {
    return gulp.src('src/*.html')
    .pipe(replace(/<style><\/style>/g, function(s){
        let style = fs.readFileSync('./build/style.css', 'utf8');
        return `<style>${style}</style>`;
    }))
    .pipe(replace(/<script><\/script>/g, function(s){
        let js = fs.readFileSync('./build/bundle.js', 'utf8');
        return `<script>${js}</script>`;
    }))
    .pipe(gulp.dest('dist/'));
});
