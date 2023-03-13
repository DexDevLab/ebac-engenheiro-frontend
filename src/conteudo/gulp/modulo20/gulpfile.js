const gulp = require("gulp");
const gulpConcat = require("gulp-concat");
const gulpCSSmin = require("gulp-cssmin");
const gulpRename = require("gulp-rename");
const gulpUglify = require("gulp-uglify");
const gulpImage = require("gulp-image");

function taskCSS(cb) {
  return gulp
    .src([
      "./node_modules/bootstrap/dist/css/bootstrap.min.css",
      "./node_modules/@fortawesome/fontawesome-free/css/all.css",
      "./node_modules/jquery-ui/dist/themes/base/jquery-ui.min.css",
      "./vendor/owl/css/owl.css",
      "./src/css/**/*.css",
    ])
    .pipe(gulpConcat("libs.css"))
    .pipe(gulpCSSmin())
    .pipe(gulpRename({ suffix: ".min" }))
    .pipe(gulp.dest("./dist/css"));
}

function taskJS(cb) {
  return gulp
    .src([
        "./node_modules/jquery/dist/jquery.min.js",
        "./node_modules/jquery-mask-plugin/dist/jquery.mask.min.js",
        "./node_modules/@fortawesome/fontawesome-free/js/all.js",
        "./node_modules/jquery-ui/dist/jquery-ui.min.js",
        "./node_modules/bootstrap/dist/js/bootstrap.min.js",
        "./vendor/owl/js/owl.js",
        "./src/js/**/*.js",
      ])
    .pipe(gulpConcat("libs.js"))
    .pipe(gulpUglify())
    .pipe(gulpRename({ suffix: ".min" }))
    .pipe(gulp.dest("./dist/js"));
}

function taskImgs(cb) {
  return gulp
    .src("./src/images/*")
    .pipe(
      gulpImage({
        pngquant: true,
        optipng: true,
        zopflipng: true,
        jpegRecompress: true,
        mozjpeg: true,
        gifsicle: true,
        svgo: true,
        concurrent: 10,
        quiet: true,
      })
    )
    .pipe(gulp.dest("./dist/images"));
}

exports.styles = taskCSS;
exports.scripts = taskJS;
exports.images = taskImgs;
