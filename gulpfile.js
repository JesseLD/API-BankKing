/* eslint-disable @typescript-eslint/no-var-requires */
const gulp = require("gulp");
const clean = require("gulp-clean");
const ts = require("gulp-typescript");

const tsProject = ts.createProject("tsconfig.json");

// Clean the build directory
gulp.task("clean", () => {
  return gulp.src("dist/*", { read: false, allowEmpty: true }).pipe(clean());
});

// Compile TypeScript files
gulp.task("scripts", () => {
  return tsProject.src().pipe(tsProject()).pipe(gulp.dest("dist"));
});

// Define a build task that depends on the other tasks
gulp.task("build", gulp.series("clean", "scripts"));

// Default task: Build the project
gulp.task("default", gulp.series("build"));

// Watch for changes and automatically rebuild
gulp.task("watch", () => {
  gulp.watch("src/**/*.ts", gulp.series("scripts"));
});
