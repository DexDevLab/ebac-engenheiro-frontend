const { series } = require("gulp");
const gulp = require("gulp");
const gulpConcat = require("gulp-concat");
const gulpCSSmin = require("gulp-cssmin");
const gulpRename = require("gulp-rename");
const gulpUglify = require("gulp-uglify");
const gulpImage = require("gulp-image");
const gulpStripJs = require("gulp-strip-comments");
const gulpStripCSS = require("gulp-strip-css-comments");
const gulpHTMLmin = require("gulp-htmlmin");
const gulpBabel = require("gulp-babel");
const browser = require("browser-sync");
const { reload } = require("browser-sync");

function taskCSS(cb) {
  gulp
    .src([
      "./node_modules/bootstrap/dist/css/bootstrap.css",
      "./node_modules/@fortawesome/fontawesome-free/css/all.css",
      "./node_modules/jquery-ui/dist/themes/base/jquery-ui.min.css",
      "./vendor/owl/css/owl.css",
      "./src/css/**/*.css",
    ])
    .pipe(gulpStripCSS())
    .pipe(gulpConcat("libs.css"))
    .pipe(gulpCSSmin())
    .pipe(gulpRename({ suffix: ".min" }))
    .pipe(gulp.dest("./dist/css"));

  return cb();
}

function taskJS(cb) {
  gulp
    .src([
      "./node_modules/jquery/dist/jquery.min.js",
      "./node_modules/jquery-mask-plugin/dist/jquery.mask.min.js",
      "./node_modules/@fortawesome/fontawesome-free/js/all.js",
      "./node_modules/jquery-ui/dist/jquery-ui.min.js",
      "./node_modules/bootstrap/dist/js/bootstrap.js",
      "./vendor/owl/js/owl.js",
      "./src/js/**/*.js",
    ])
    .pipe(gulpStripJs())
    .pipe(gulpConcat("libs.js"))
    .pipe(gulpUglify())
    .pipe(gulpRename({ suffix: ".min" }))
    .pipe(gulp.dest("./dist/js"));

  return cb();
}

function taskBabel(cb) {
  return Promise.resolve(gulp.src("./dist/js/*.js").pipe(gulpBabel()).pipe(gulp.dest("./dist/js")));
}

function taskImgs(cb) {
  gulp
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

  return cb();
}

function taskHTML(cb) {
  gulp
    .src(["./src/**/*.html"])
    .pipe(gulpHTMLmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("./dist"));
  return cb();
}

gulp.task("serve", function () {
  browser.init({
    server: {
      baseDir: "./dist",
    },
  });
  gulp.watch("./src/**").on('change', gulpProcess);
  gulp.watch("./dist/**").on('change', reload);
});

const gulpProcess = series(taskCSS, taskHTML, taskImgs, taskJS, taskBabel);

exports.styles = taskCSS;
exports.scripts = taskJS;
exports.images = taskImgs;
exports.html = taskHTML;
exports.babel =  taskBabel;

exports.default = gulpProcess;
