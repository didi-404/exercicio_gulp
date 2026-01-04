const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const imagemin = require("gulp-imagemin");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const rename = require("gulp-rename");

const paths = {
  styles: {
    src: "src/scss/**/*.scss",
    dest: "dist/css"
  },
  scripts: {
    src: "src/js/**/*.js",
    dest: "dist/js"
  },
  images: {
    src: "src/images/**/*.{jpg,jpeg,png,svg,gif,webp}",
    dest: "dist/images"
  }
};

// 1) Compilação do SASS
function styles() {
  return gulp
    .src("src/scss/main.scss")
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(paths.styles.dest));
}

// 2) Compressão de imagens
function images() {
  return gulp
    .src(paths.images.src)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.images.dest));
}

// 3) Compressão / minificação de JS
function scripts() {
  return gulp
    .src(paths.scripts.src)
    .pipe(concat("main.js"))
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(paths.scripts.dest));
}

// Watch
function watch() {
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.images.src, images);
}

exports.styles = styles;
exports.images = images;
exports.scripts = scripts;
exports.watch = watch;

// Build padrão
exports.build = gulp.parallel(styles, scripts, images);

// Default: build
exports.default = exports.build;
