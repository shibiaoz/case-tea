"use strict";
 
var gulp         = require('gulp');
var postcss      = require('postcss');
var gulp_postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer-core');           // 浏览器前缀
var sourcemaps   = require('gulp-sourcemaps');
var mqpacker     = require('css-mqpacker');                // MQ 包装器
var csswring     = require('csswring');                    // css minify
var nested       = require('postcss-nested');              // 支持css嵌套
//var mixins       = require('postcss-mixins');              // 支持mixins
var vars         = require('postcss-simple-vars');         // 变量定义
var cssimport    = require('postcss-import');              // css import
var rename       = require('gulp-rename');                 // 文件重命名
var reporter     = require('postcss-reporter');

var fixedIEOpacity = postcss.plugin('fixedIEOpacity', function(){
  return function (css) {
    css.eachRule(function(rule){

      rule.eachDecl('opacity', function (decl) {
          var amount = Math.floor(decl.value * 100);
          var VAL_REPLACE  = 'progid:DXImageTransform.Microsoft.Alpha(Opacity=' + amount + ')';

          var isFilterAlreadyPresent = false;
          rule.eachDecl(function (d) {
            if (d.prop === 'filter' && d.value === VAL_REPLACE) {
              isFilterAlreadyPresent = true;
            }
          });

          if (!isFilterAlreadyPresent) {
            decl.cloneBefore({ prop: 'filter', value: VAL_REPLACE });
          }
      });

    });
  };
});

gulp.task('postcss', function(){
  var processors = [
      cssimport,
      //mixins,
      nested,
      vars,
      autoprefixer({browsers: ['> 1%', 'IE 8']}),
      mqpacker,
      fixedIEOpacity,
      csswring({
        preserveHacks: true,
        removeAllComments: true
      }),
      //reporter({})
  ];
  return gulp.src('./pc/css/main.css')
          .pipe(sourcemaps.init())
          .pipe(gulp_postcss(processors))
          .on('error', errorHandler)
          .pipe(rename({suffix: ".min"}))
          .pipe(sourcemaps.write('.'))
          .pipe(gulp.dest('./pc/css'));
});

gulp.task('watch', function () {
    gulp.watch([
      './pc/css/lib/**/*.css',
      './pc/css/pages/**/*.css'
    ], ['postcss']);
});

// Main stask
gulp.task('default', ['postcss','watch']);



function errorHandler(error){
  console.log(error.message);
  console.log(error.fileName);
  console.log('line:', error.line, 'column:', error.column);
  this.emit('end');
}