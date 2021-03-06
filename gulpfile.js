const gulp = require('gulp'),
    clean = require('gulp-clean'),
    sass = require('gulp-sass'),
    ts = require('gulp-typescript'),
    server = require('gulp-express'),
    minifyHtml = require("gulp-minify-html"),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    pump = require('pump'),
    browserSync = require('browser-sync'),
    srcPath = './src',
    distPath = './dist';

gulp.task('default', ['ejs', 'sass', 'js', 'ts', 'browser-sync'], () => {
    gulp.watch(srcPath + '/**/*.js', ['js', 'browser-sync-reload']);
    gulp.watch(srcPath + '/**/*.scss', ['sass', 'browser-sync-reload']);
    gulp.watch(srcPath + '/**/*.ejs', ['ejs', 'browser-sync-reload']);
    gulp.watch('.', ['server']);
})
    .task('clean', function () {
        return gulp.src(distPath)
            .pipe(clean({force: true}))
            .pipe(gulp.dest('/'));
    })
    .task('ejs', () => {
        return gulp.src(srcPath + '/**/*.ejs')
            .pipe(minifyHtml())
            .pipe(gulp.dest(distPath + '/'));
    })
    .task('sass', () => {
        return gulp.src(srcPath + '/**/*.scss')
            .pipe(sass.sync().on('error', sass.logError))
            .pipe(gulp.dest(distPath + '/'));
    })
    .task('js', () => {
        return gulp.src(srcPath + '/**/*.js')
            .pipe(gulp.dest(distPath + '/'));
    })
    .task('ts', () => {
        return gulp.src(srcPath + '/**/*.ts')
            .pipe(ts({
                noImplicitAny: true
            }))
            .pipe(gulp.dest(distPath + '/'));
    })
    .task('browser-sync', () => {
        browserSync.init({
            proxy: "localhost:3000",
            port: 3000,
            notify: true
        });
    })
    .task('browser-sync-reload', () => {
        browserSync.reload();
    })
    .task('server', () => {
        server.run(['app.js']);
        gulp.watch(['app.js', 'routes/*.js'], [server.run]);
    });



