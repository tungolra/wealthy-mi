const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const util = require("gulp-util");
const del = require("del");
const merge = require("merge-stream");

const stylesDir = "../styles/";
const vendorDir = "../styles/vendor/";
const nodeModDir = "../../node_modules/";

// bring in vendor scss from node packages
gulp.task("collect_vendor", async () => {
	function getDependSrc(rel_path) {
		return nodeModDir + rel_path;
	}

	function getVendorDir(rel_path) {
		return vendorDir + rel_path;
	}
	// bootstrap JS
	const bootstrapJS = gulp
		.src(getDependSrc("bootstrap/dist/js/*"))
		.pipe(gulp.dest(getVendorDir("bootstrap/js")));

	// bootstrap SCSS
	const bootstrapSCSS = gulp
		.src(getDependSrc("bootstrap/scss/**/*.scss"))
		.pipe(gulp.dest(getVendorDir("bootstrap/scss")));

	// chartJS js
	const chartJS = gulp
		.src(getVendorDir("chart.js/dist/*.js"))
		.pipe(gulp.dest(getVendorDir("chartjs")));

	// dataTables js and css
	const dataTables = gulp
		.src([
			getDependSrc("datatables.net/js/*.js"),
			getDependSrc("datatables.net-bs4/js/*.js"),
			getDependSrc("datatables.net-bs4/css/*.css"),
		])
		.pipe(gulp.dest(getVendorDir("datatables")));

	// fontwesome
	const fontAwesome = gulp
		.src(getDependSrc("@fortawesome/**/*"))
		.pipe(gulp.dest(getVendorDir(".")));

	// jqeuryEasing js
	const jqueryEasing = gulp
		.src(getDependSrc("jquery.easing/*.js"))
		.pipe(gulp.dest(getVendorDir("jquery-easing")));

	// jquery js
	const jquery = gulp
		.src(getDependSrc("jquery/dist/*"))
		.pipe(gulp.dest(getVendorDir("jquery")));

	await merge(
		chartJS,
		bootstrapJS,
		bootstrapSCSS,
		dataTables,
		fontAwesome,
		jquery,
		jqueryEasing
	);
});

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
