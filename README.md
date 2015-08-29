# gulp-rename-plus




## Usage

First, install `gulp-rename-plus` as a development dependency:

```shell
npm install --save-dev gulp-md5-plus
```

Then, add it to your `gulpfile.js`:

```javascript
var rename = require("gulp-rename-plus");

gulp.src("./src/*.css")
    .pipe(rename({suffix : "scss"}))
    .pipe(gulp.dest("./dist"));
```

this will change all css files's suffix with scss




## License

http://en.wikipedia.org/wiki/MIT_License[MIT License]


