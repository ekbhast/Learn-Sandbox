const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass        = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename"); 
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');

gulp.task('server', function() {

    browserSync({
        server: {
            baseDir: "Petrichenko_Practice_3_Pulsemeter/dist"
        }
    });

    gulp.watch("Petrichenko_Practice_3_Pulsemeter/src/*.html").on('change', browserSync.reload); 
});

gulp.task('styles', function() {
    return gulp.src("Petrichenko_Practice_3_Pulsemeter/src/sass/**/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("Petrichenko_Practice_3_Pulsemeter/dist/css"))
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch("Petrichenko_Practice_3_Pulsemeter/src/sass/**/*.+(scss|sass|css)", gulp.parallel('styles'));
    gulp.watch("Petrichenko_Practice_3_Pulsemeter/src/*.html").on('change', gulp.parallel('html')); 
});

gulp.task('html',function(){
    return gulp.src("Petrichenko_Practice_3_Pulsemeter/src/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("Petrichenko_Practice_3_Pulsemeter/dist/"));
});

gulp.task('script',function(){
    return gulp.src("Petrichenko_Practice_3_Pulsemeter/src/js/**/*.js")
    .pipe(gulp.dest("Petrichenko_Practice_3_Pulsemeter/dist/js"));
});

gulp.task('fonts',function(){
    return gulp.src("Petrichenko_Practice_3_Pulsemeter/src/fonts/**/*")
    .pipe(gulp.dest("Petrichenko_Practice_3_Pulsemeter/dist/fonts"));
});

gulp.task('icons',function(){
    return gulp.src("Petrichenko_Practice_3_Pulsemeter/src/icons/**/*")
    .pipe(gulp.dest("Petrichenko_Practice_3_Pulsemeter/dist/icons"));
});

gulp.task('mailer',function(){
    return gulp.src("Petrichenko_Practice_3_Pulsemeter/src/mailer/**/*")
    .pipe(gulp.dest("Petrichenko_Practice_3_Pulsemeter/dist/mailer"));
});

gulp.task('images',function(){
    return gulp.src("Petrichenko_Practice_3_Pulsemeter/src/img/**/*")
    .pipe(imagemin())
    .pipe(gulp.dest("Petrichenko_Practice_3_Pulsemeter/dist/img"));
});


gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'script', 'fonts', 'icons', 'mailer', 'html', 'images'));