const gulp = require('gulp');
const uglify = require('gulp-uglify');
// const concat = require('gulp-concat');
// const uglifycss = require('gulp-uglifycss');
const babel = require('gulp-babel');
const jshint = require('gulp-jshint');
const stylus = require('gulp-stylus');
// const webpack = require('gulp-webpack');
const fs = require('fs');
const replace = require('gulp-replace');

gulp.task('default', ['html']);
gulp.task('build', ['js', 'css']);
gulp.task('lint', (() => {
  gulp.src('src/js/*.js')
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
}));
gulp.task('js', (() => {
  gulp.src('src/js/bundle.js')
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(uglify())
    .pipe(gulp.dest('build/'));
}));
gulp.task('css', (() => {
  gulp.src('src/css/*.styl')
    .pipe(stylus())
    .pipe(gulp.dest('build/'));
}));
gulp.task('html', (() => {
  gulp.src('src/*.html')
    .pipe(replace(/<style><\/style>/g, () => {
      const style = fs.readFileSync('./build/style.css', 'utf8');
      return `<style>${style}</style>`;
    }))
    .pipe(replace(/<script><\/script>/g, () => {
      const js = fs.readFileSync('./build/bundle.js', 'utf8');
      return `<script>${js}</script>`;
    }))
    .pipe(gulp.dest('dist/'));
}));
