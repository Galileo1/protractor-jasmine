'use strict';

var gulp = require('gulp');
var tslint = require('gulp-tslint');
var ts = require('gulp-typescript');
var protractor = require("gulp-protractor").protractor;
var args = require('yargs').argv;

var tsProject = ts.createProject('tsconfig.json');

gulp.task('tslint', function() {
    return gulp.src([
        'e2e-tests/**/*.ts',
        'helpers/**/*.ts',
        '!**/node_modules/**/*.ts'])
      .pipe(tslint({
        formatter: "prose"
        })).pipe(tslint.report({
            summarizeFailureOutput: true
        }));
});

gulp.task('tsc', function() {
    var tsResult = tsProject.src()
        // ["helpers/**/*.ts", "e2e-tests/**/*.ts",                             
        //                     "typings.d.ts"], { base: './e2e-tests' }) // or tsProject.src()
        .pipe(tsProject());
 
    return tsResult.js.pipe(gulp.dest('build'));
});


gulp.task('run' , function() {
    return gulp.src(["./build/e2e-tests/*.js"])
    .pipe(protractor({
        configFile: "./build/e2e-tests/config/protractor.config.js",
        args: [
            '--baseUrl', args.baseUrl,
            '--suite', args.suite           
        ]
    }))
    .on('error', function(e) { throw e })
});

gulp.task('compile', ['tslint','tsc']);

gulp.task('default', ['tslint','tsc','run']);

