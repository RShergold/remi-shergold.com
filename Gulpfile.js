var gulp = require('gulp')
  //post css stuff
  ,postcss = require('gulp-postcss')
  ,cssnext = require('postcss-cssnext')
  ,autoprefixer = require('autoprefixer')
  ,cssimport = require("gulp-cssimport")

  ,concat = require('gulp-concat')
  ,babel = require('gulp-babel')
  ,watch = require('gulp-watch');


gulp.task('default', ['move_files', 'css', 'js']);

gulp.task('move_files', function() {
  gulp.src('./src/pages/**/*',{dot:true})
    .pipe(gulp.dest('./build'));

  gulp.src('./src/php/**/*')
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
  gulp.src([
      './src/javascripts/global/vendor/**/*.js',
      'src/javascripts/global/**/!(app)*.js',
      'src/javascripts/global/app.js',
    ])
    .pipe(babel({presets: ['es2015']}))
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./build/_includes/'));

  gulp.src([
      './src/javascripts/admin/vendor/**/*.js',
      'src/javascripts/admin/**/!(admin)*.js',
      'src/javascripts/admin/admin.js',
    ])
    .pipe(babel({presets: ['es2015']}))
    .pipe(concat('admin.js'))
    .pipe(gulp.dest('./build/_includes/'));
});



gulp.task('watch', function() {
  gulp.watch('./src/pages/**/*', ['move_files']);
  gulp.watch('./src/css/**/*.css', ['css']);
  gulp.watch('./src/javascripts/**/*.js', ['js']);
});
