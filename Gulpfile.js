var gulp = require('gulp')

  //CSS stuff
  ,postcss = require('gulp-postcss')
  ,cssnext = require('postcss-cssnext')
  ,cssimport = require("gulp-cssimport")
  ,cssmin = require('gulp-cssmin')

  //javaScript stuff
  ,browserify = require('browserify')
  ,babelify = require('babelify')
  ,source = require('vinyl-source-stream')
  ,buffer = require('vinyl-buffer')
  ,sourcemaps = require('gulp-sourcemaps')
  ,uglify = require('gulp-uglify')

  // bobs
  ,watch = require('gulp-watch')
  ,clean = require('gulp-clean');

var is_production = true;

gulp.task('default', ['move_files', 'css', 'js']);

gulp.task('move_files', function() {
  gulp.src('./src/pages/**/*',{dot:true})
    .pipe(gulp.dest('./build'));

  gulp.src('./src/php/**/!(app)*')
    .pipe(gulp.dest('./build/_php'));

  gulp.src('./src/php/app.php')
    .pipe(gulp.dest('./build/_php'));

  gulp.src('./src/partials/**/*')
    .pipe(gulp.dest('./build/_php/partials'));

  gulp.src('./src/assets/**/*')
    .pipe(gulp.dest('./build/_includes'));
});

gulp.task('css', function() {

  gulp.src('./src/css/style.css')
    .pipe(cssimport())
    .pipe(postcss([cssnext]))
    .pipe(cssmin())
    .pipe(gulp.dest('./build/_includes/style.css'))

  gulp.src('./src/css/admin.css')
    .pipe(cssimport())
    .pipe(postcss([cssnext]))
    .pipe(cssmin())
    .pipe(gulp.dest('./build/_includes/admin.css'))

});

gulp.task('js', function() {

  compile_js('admin', 'admin.js', is_production);
  compile_js('global', 'app.js', is_production);

});

function compile_js(dir, file_name, is_production) {

  var babel = babelify.configure({presets: ['es2015']});
  browserify('src/javascripts/'+dir+'/'+file_name, {debug: !is_production})
    .transform(babel)
    .bundle()
    .pipe(source(file_name))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe( uglify() )
    .pipe( sourcemaps.write('./') )
    .pipe(gulp.dest('./build/_includes'));

}

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



