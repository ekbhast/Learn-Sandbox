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
            baseDir: "Petrichenko_Practicle_4_Portfolio/dist"
        }
    });

    gulp.watch("Petrichenko_Practicle_4_Portfolio/src/*.html").on('change', browserSync.reload);
});

gulp.task('styles', function() {
    return gulp.src("Petrichenko_Practicle_4_Portfolio/src/sass/**/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("Petrichenko_Practicle_4_Portfolio/dist/css"))
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch("Petrichenko_Practicle_4_Portfolio/src/sass/**/*.+(scss|sass|css)", gulp.parallel('styles'));
    gulp.watch("Petrichenko_Practicle_4_Portfolio/src/*.html").on('change', gulp.parallel('html'));
    gulp.watch("Petrichenko_Practicle_4_Portfolio/src/js/**/*.js").on('change', gulp.parallel('scripts'));
    gulp.watch("Petrichenko_Practicle_4_Portfolio/src/fonts/**/*").on('all', gulp.parallel('fonts'));
    gulp.watch("Petrichenko_Practicle_4_Portfolio/src/icons/**/*").on('all', gulp.parallel('icons'));
    gulp.watch("Petrichenko_Practicle_4_Portfolio/src/img/**/*").on('all', gulp.parallel('images'));
});

gulp.task('html', function () {
    return gulp.src("Petrichenko_Practicle_4_Portfolio/src/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("Petrichenko_Practicle_4_Portfolio/dist/"));
});

gulp.task('scripts', function () {
    return gulp.src("Petrichenko_Practicle_4_Portfolio/src/js/**/*.js")
        .pipe(gulp.dest("Petrichenko_Practicle_4_Portfolio/dist/js"))
        .pipe(browserSync.stream());
});

gulp.task('fonts', function () {
    return gulp.src("Petrichenko_Practicle_4_Portfolio/src/fonts/**/*")
        .pipe(gulp.dest("Petrichenko_Practicle_4_Portfolio/dist/fonts"))
        .pipe(browserSync.stream());
});

gulp.task('icons', function () {
    return gulp.src("Petrichenko_Practicle_4_Portfolio/src/icons/**/*")
        .pipe(gulp.dest("Petrichenko_Practicle_4_Portfolio/dist/icons"))
        .pipe(browserSync.stream());
});

gulp.task('images', function () {
    return gulp.src("Petrichenko_Practicle_4_Portfolio/src/img/**/*")
        .pipe(imagemin())
        .pipe(gulp.dest("Petrichenko_Practicle_4_Portfolio/dist/img"))
        .pipe(browserSync.stream());
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'scripts', 'fonts', 'icons', 'html', 'images'));