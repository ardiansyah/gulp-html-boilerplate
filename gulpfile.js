const gulp           = require('gulp');
const browserSync    = require('browser-sync').create();
const cssmin         = require('gulp-cssmin');
const sass           = require('gulp-sass');
const nunjucksRender = require('gulp-nunjucks-render');
const newer          = require('gulp-newer');
const concat         = require('gulp-concat');
const rename         = require('gulp-rename');
const uglify         = require('gulp-uglify');
const reload         = browserSync.reload;
const src = {
  scss : 'src/assets/sass/**/*.scss',
  jsFile: 'src/assets/js/**/*.js',
  css  : 'dist/assets/css/',
  njk  : 'src/app/**/*.njk',
  dist  : 'dist/'
};

gulp.task('serve', ['scss', 'nunjucks', 'scripts', 'img', 'font'], function() {
  browserSync.init({
    server: "./dist/app",
    serveStatic: ['./dist']
  });
  gulp.watch(src.njk, ['nunjucks']),
  gulp.watch(src.scss, ['scss']);
  gulp.watch(src.html).on('change', reload);
  gulp.watch(src.jsFile, ['scripts']);
});

// Converting njk files to html
gulp.task('nunjucks', function() {
  return gulp.src('src/app/templates/**/*.+(html|njk|nunjucks)')
    .pipe(nunjucksRender({
      path: ['src/app/']
    }))
    .pipe(gulp.dest('dist'))
    .pipe(reload({stream: true }));
});

// HTML Processing
gulp.task('html', ['images'], function(){
  return gulp.src(src.html)
    .pipe(newer(src.html))
    .pipe(gulp.dest(src.dist + 'assets/'));
});

// Converting scss files to css files
gulp.task('scss', function(){
  return gulp.src(src.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(src.css))
    .pipe(reload({stream: true}));
});

gulp.task('default', ['serve']);

gulp.task('minify-css', ['sass', 'scss'], function(){
  return gulp.src(src.css + '**/*.css')
    .pipe(cssmin())
    .pipe(gulp.dest(src.dist + 'assets/css'));
});

gulp.task('scripts', function() {
  return gulp.src(src.jsFile)
      .pipe(concat('scripts.js'))
      .pipe(gulp.dest('dist/assets/js'))
      .pipe(reload({stream: true}));
});

gulp.task('img', function () {
  return gulp.src('src/assets/img/**')
  .pipe(gulp.dest('dist/assets/img'));
});

gulp.task('font', function () {
  return gulp.src('src/assets/fonts/**')
  .pipe(gulp.dest('dist/assets/fonts'));
});

gulp.task('production', ['nunjucks', 'html', 'minify-css', 'scripts', 'img', 'font']);