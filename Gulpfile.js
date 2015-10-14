var gulp = require('gulp')
  ,suitcss = require('gulp-suitcss')
  ,autoprefixer = require('gulp-autoprefixer')
  ,concat = require('gulp-concat')
  ,watch = require('gulp-watch');

gulp.task('move_files', function() {
  gulp.src('./src/pages/**/*')
    .pipe(gulp.dest('./build'));

  gulp.src('./src/php/**/*')
    .pipe(gulp.dest('./build/_php'));

  gulp.src('./src/partials/**/*')
    .pipe(gulp.dest('./build/_php/partials'));
});

gulp.task('css', function() {
  var suit_options = {
     compress: true
    ,dir: 'src/css'
  };
  var prefex_options = {
    browsers: ['last 2 versions'],
    cascade: false
  };
  gulp.src('./src/css/style.css')
    .pipe(suitcss(suit_options))
    //.pipe(autoprefixer(prefex_options))
    .pipe(gulp.dest('./build/_includes/'))
/*
  gulp.src('./src/css/admin.css')
    .pipe(suitcss(suit_options))
    .pipe(gulp.dest('./build/_includes/'))
*/
});

gulp.task('js', function() {
  gulp.src(['./src/javascripts/global/vendor/**/*.js','./src/javascripts/global/**/*.js'])
    .pipe(concat('script.js'))
    .pipe(gulp.dest('./build/_includes/'));

  gulp.src('./javascripts/admin/**/*.js')
    .pipe(concat('admin.js'))
    .pipe(gulp.dest('./build/_includes/'));
});

gulp.task("watch", function() {
  gulp.watch('./src/pages/**/*', ['move_files']);
  gulp.watch('./src/css/**/*.css', ['css']);
  gulp.watch('./src/javascripts/**/*.js', ['js']);
});
