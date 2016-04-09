var gulp = require('gulp')

  //CSS stuff
  ,postcss = require('gulp-postcss')
  ,cssnext = require('postcss-cssnext')
  ,autoprefixer = require('autoprefixer')
  ,cssimport = require("gulp-cssimport")

  //javaScript stuff
  ,browserify = require('browserify')
  ,babelify = require('babelify')
  ,source = require('vinyl-source-stream')
  ,buffer = require('vinyl-buffer')
  ,sourcemaps = require('gulp-sourcemaps')
  ,uglify = require('gulp-uglify')

  //setting config.json values in app.php
  ,replace = require('gulp-token-replace')
  ,config = require('./config.json')

  ,watch = require('gulp-watch');


gulp.task('default', ['move_files', 'css', 'js']);

gulp.task('move_files', function() {
  gulp.src('./src/pages/**/*',{dot:true})
    .pipe(gulp.dest('./build'));

  gulp.src('./src/php/**/!(app)*')
    .pipe(gulp.dest('./build/_php'));

  gulp.src('./src/php/app.php')
    .pipe(replace({global:config.development}))
    .pipe(gulp.dest('./build/_php'));

  gulp.src('./src/partials/**/*')
    .pipe(gulp.dest('./build/_php/partials'));

  gulp.src('./src/assets/**/*')
    .pipe(gulp.dest('./build/_includes'));
});

gulp.task('css', function() {
  var processors = [
      autoprefixer({browsers: ['last 1 version']}),
      cssnext
  ];

  gulp.src('./src/css/style.css')
    .pipe(cssimport())
    .pipe(postcss(processors))
    .pipe(gulp.dest('./build/_includes/style.css'))

  gulp.src('./src/css/admin.css')
    .pipe(cssimport())
    .pipe(postcss(processors))
    .pipe(gulp.dest('./build/_includes/admin.css'))

});

gulp.task('js', function() {

  var babel = babelify.configure({presets: ['es2015']});
  var bundler = browserify('src/javascripts/global/app.js', {debug: true}).transform(babel);

  bundler.bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    //.pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./build/_includes'));


//  gulp.src([
//      './src/javascripts/admin/vendor/**/*.js',
//      'src/javascripts/admin/**/!(admin)*.js',
//      'src/javascripts/admin/admin.js',
//    ])
//    .pipe(babel({presets: ['es2015']}))
//    .pipe(concat('admin.js'))
//    .pipe(gulp.dest('./build/_includes/'));

});



gulp.task('watch', function() {
  gulp.watch([
    './src/assets/**/*',
    './src/pages/**/*',
    './src/partials/**/*',
    './src/php/**/*',
  ], ['move_files']);
  gulp.watch('./src/css/**/*.css', ['css']);
  gulp.watch('./src/javascripts/**/*.js', ['js']);
});
