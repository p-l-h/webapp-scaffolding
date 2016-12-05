

import gulp from 'gulp';
import mapStream from 'map-stream';
import replace from 'gulp-replace';
import htmlmin from 'gulp-htmlmin';
import md5plus from 'gulp-md5-plus';


import yargs from 'yargs';
const args = yargs.argv;

import dealCss from './build/precompile/scss';
import dealJs from './build/precompile/babel';

const isProd = args.prod;


gulp.task('css', () => {
    gulp.src([
        'app/**/*.scss',
        '!app/common/**/*.scss',
        '!app/components/**/*.scss'
    ])
    .pipe(
        mapStream(
            (file, callback) => {

                dealCss(file.path, isProd, (result) => {
                    file.contents = new Buffer(result);
                    file.path = file.path.replace('.scss', '.css');
                    callback(null, file);
                });
            }
        )
    )
    .pipe(gulp.dest('output/app/'))


});

gulp.task('js', () => {
    gulp.src([
        'app/**/*.js',
        '!app/common/**/*.js',
        '!app/components/**/*.js'
    ])
    .pipe(
        mapStream(
            (file, callback) => {
                dealJs(file.path, isProd, (result) => {
                    file.contents = new Buffer(result)
                    callback(null, file);
                })
            }
        )
    )
    .pipe(gulp.dest('output/app/'));
});


gulp.task('html', () => {
    gulp.src('app/**/*.html')
        {{#swig}}
        .pipe(replace('{% parent %}', '{{ parent() }}'))
        .pipe(replace(/!empty\((.*)\)/g, '$1 is not empty'))
        .pipe(replace('.length', '|length'))
        .pipe(replace('as macros', ''))
        .pipe(replace('macros.', ''))
        {{/swig}}
        .pipe(htmlmin({
            collapseWhitespace: true,
            ignoreCustomFragments: [ /\{%[\s\S]*?%\}/, /\{\{\?[\s\S]*?\?\}\}/]
        }))
        .pipe(gulp.dest('output/app/'));
});

gulp.task('md5', () => {
    gulp.task(['output/app/**/*.js', 'output/app/**/*.css'])
        .pipe(md5plus(10, 'output/app/**/*.html'))
        .pipe(gulp.dest('output/app/'));
});
