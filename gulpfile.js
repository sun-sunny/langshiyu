'use strict'; 
var gulp = require('gulp'), 
browserSync = require('browser-sync').create(), 
SSI = require('browsersync-ssi'), 
concat = require('gulp-concat'), 
minifyCss = require('gulp-minify-css'), 
minify = require('gulp-minify'), 
plumber = require('gulp-plumber'), 
rename = require('gulp-rename'), 
sass = require('gulp-sass'), 
zip = require('gulp-zip');
gulp.task('serve', function() { 
	browserSync.init({ 
		server: { 
		baseDir:["./dist"], 
		middleware:SSI({ 
		baseDir:'./dist', 
		ext:'.shtml', 
		version:'2.10.0' 
		}) 
		} 
	}); 
	gulp.watch("src/css/*.scss", ['sass']); 
	gulp.watch("src/js/*.js", ['js']); 
	gulp.watch("src/html/*.html", ['html']); 
	gulp.watch("dist/html/*.html").on("change",browserSync.reload); 
});
gulp.task('sass', function() { 
	return gulp.src("src/css/*.scss") 
	.pipe(plumber()) 
	.pipe(sass.sync().on('error', sass.logError)) 
	.pipe(sass({outputStyle:"compact"})) 
	.pipe(gulp.dest("dist/css")) 
	.pipe(browserSync.stream()); 
});
gulp.task('js', function(){ 
	return gulp.src('src/js/*.js') 
	.pipe(plumber()) 
	.pipe(minify()) 
	.pipe(gulp.dest("dist/js")) 
	.pipe(browserSync.stream()); 
});
gulp.task('html', function() { 
	return gulp.src("src/html/*.html") 
	.pipe(plumber()) 
	.pipe(gulp.dest("dist/html")) 
	.pipe(browserSync.stream()); 
});
gulp.task('default', ['serve']);