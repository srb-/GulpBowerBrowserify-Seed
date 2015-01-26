

# Import modules
gulp        = require('gulp')
coffee      = require("gulp-coffee")
jasmine     = require("gulp-jasmine")           # JS testing framework, tests in /spec
browserify  = require('browserify')             # module system fore require() in browser
source      = require('vinyl-source-stream')    # makes browserify bundle compatible with gulp
browserSync = require('browser-sync')           # webserver and automatic browser reloads on change
sourcemaps  = require('gulp-sourcemaps')        # so we can debug coffeescript in browser
concat      = require("gulp-concat")
uglify      = require("gulp-uglify")
clean       = require('gulp-clean')
bowerFiles  = require('main-bower-files')
runSequence = require('run-sequence')


# File paths
sources =
  css: 'app/css/**/*.css'
  html: 'app/**/*.html'
  coffee: 'app/js/**/*.coffee'

destinations =
  css: 'public/css'
  html: 'public/'
  js: 'public/js'


# Auto-reloading in the browser when src or html changes
gulp.task 'browser-sync', ->
  browserSync.init null,
    open: false
    server:
      baseDir: "./public"
    watchOptions:
      debounceDelay: 1000


gulp.task 'html', ->
  gulp.src(sources.html)
    .pipe(gulp.dest(destinations.html))


gulp.task 'src', ->
  browserify(
    entries: ['./app/js/main.coffee']
    extensions: ['.coffee']
    debug: true                           # Enable sourcemaps
  )
  .transform('coffeeify')                 # Compile coffeescript
  .bundle()
  .pipe(source('app.js'))
  .pipe(gulp.dest('./public/js'))



gulp.task 'watch', ->
  gulp.watch sources.html, ['html']
  gulp.watch sources.coffee, ['src', 'test']
  gulp.watch 'public/**/**', (file) ->
    browserSync.reload(file.path) if file.type is "changed"


gulp.task 'bower', ->
  gulp.src(bowerFiles(includeDev: true).filter((f) ->
    f.substr(-2) is "js"
  ))
    .pipe(concat("vendor.js"))
    .pipe gulp.dest("./public/js/")



gulp.task 'build', ->
  runSequence 'clean', ['src', 'html', 'bower']


gulp.task 'clean', ->
  gulp.src(['public/'], {read: false}).pipe(clean())


gulp.task 'test', ->
  gulp.src('spec/**.coffee')
    .pipe(jasmine())


# Default task call every tasks created so far
gulp.task 'default', ['build', 'browser-sync','watch']


