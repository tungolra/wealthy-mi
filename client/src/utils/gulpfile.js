const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const util = require("gulp-util");
const del = require("del");

const stylesDir = "../styles/";

// scss and css tasks
gulp.task("sass", () => {
	return gulp
		.src(stylesDir + "scss/**/*.scss")
		.pipe(sass())
		.pipe(gulp.dest(stylesDir + "css"));
});

gulp.task("clean", async function () {
	console.log("--- Cleaning Styles ---");
	await del([stylesDir + "css/styles.css"], { force: true });
});

// watch task
gulp.task("watch", () => {
	// scss watch
	gulp.watch(stylesDir + "scss/", gulp.series("clean", "sass", "watch"));
});

gulp.task("dev", gulp.series("clean", "sass", "watch"));

gulp.task("default", gulp.series("clean", "sass"));
