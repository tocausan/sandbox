const gulp = require('gulp'),
    sass = require('gulp-sass'),
    server = require('gulp-express'),
    publicPath = './public';


gulp.task('default', function () {
    gulp.watch(publicPath + '/**/*.scss', ['sass']);
    gulp.watch('.',['server']);
});

gulp.task('sass', function () {
    gulp.src(publicPath + '/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(publicPath + '/'));
});

gulp.task('server', function () {
    // Start the server at the beginning of the task
    server.run(['app.js']);

    // Restart the server when file changes
    gulp.watch([publicPath + '/**/*.ejs'], server.notify);
    gulp.watch([publicPath + '/**/*.scss'], ['styles:scss']);
    //gulp.watch(['{.tmp,app}/styles/**/*.css'], ['styles:css', server.notify]);
    //Event object won't pass down to gulp.watch's callback if there's more than one of them.
    //So the correct way to use server.notify is as following:
    gulp.watch(['{.tmp,app}/**/*.css'], function (event) {
        gulp.run('styles:css');
        server.notify(event);
        //pipe support is added for server.notify since v0.1.5,
        //see https://github.com/gimm/gulp-express#servernotifyevent
    });

    gulp.watch([publicPath + '/**/*.js'], ['jshint']);
    gulp.watch([publicPath + '/**/*'], server.notify);
    gulp.watch(['app.js', 'routes/**/*.js'], [server.run]);
});