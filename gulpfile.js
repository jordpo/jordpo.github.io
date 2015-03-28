var gulp        = require('gulp'),
    browserSync = require('browser-sync'),
    path        = require('path'),
    less        = require('gulp-less'),
    prefix      = require('gulp-autoprefixer'),
    cp          = require('child_process');

var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
        .on('close', done);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['less', 'jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        }
    });
});

/**
 * Compile files from _less into both _site/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task('less', function () {
    gulp.src('_less/app.less')
        .pipe(less({
            includePaths: ['less'],
            onError: browserSync.notify
        }))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('_site/css'))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest('css'));
});

/**
 * Watch less files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
    gulp.watch('_less/*.less', ['less']);
    gulp.watch(['index.html', 'elements.html', 'elements/*', 'js/*', '_layouts/*.html', '_posts/*','customers/*','blog/*','team/*','quote/*','events/*','products/*','services/*',], ['jekyll-rebuild']);
});

/**
 * Default task, running just `gulp` will compile the less,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);
