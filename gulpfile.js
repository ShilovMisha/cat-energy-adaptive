

var gulp = require("gulp");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var del = require("del");
var rename = require("gulp-rename");
var csso = require("gulp-csso");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var svgstore = require("gulp-svgstore");
var webp = require("gulp-webp");
var imagemin = require("gulp-imagemin");
var imageminSvgo = require("imagemin-svgo");
var sequence = require("run-sequence");

var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

gulp.task("serve", ["style"], function(){
	browserSync.init({
		server: ".",
		notify: false,
		open: true,
		cors: true,
		ui: false
	});
	gulp.watch("less/**/*.less", ["style"]);
	gulp.watch("less/blocks/*.less", ["style"]);
	gulp.watch("*.html").on("change", reload)
});

gulp.task("images", function(){
	return gulp.src("img/**/*.{png,jpg,svg}")
	.pipe(imagemin([
		imagemin.optipng({optimizationLevel: 3}),
		imagemin.jpegtran({progressive: true}),
		imagemin.svgo()
		]))
	.pipe(gulp.dest("img/optimized"));
});


gulp.task("webp", function(){
	 gulp.src("img/**/*.{png,jpg}")
	.pipe(webp({quality: 90}))
	.pipe(gulp.dest("img"));
});

gulp.task("svg", function(){
	gulp.src("img/*.svg")
	.pipe(svgstore({
		inlineSvg: true
	}))
	.pipe(rename("sprite.svg"))
	.pipe(gulp.dest("img"));
});


gulp.task("style", function(){
	return gulp.src("less/style.less")
		.pipe(plumber())
		.pipe(less())
		.pipe(postcss([autoprefixer()]))
		.pipe(csso())
		.pipe(gulp.dest("css"))
		.pipe(reload({stream: true}));
});

gulp.task('default', ['serve']);
