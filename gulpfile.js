let gulp = require("gulp");
let browserSync = require("browser-sync").create();

function sync(done){
    browserSync.init({
        server: {
            baseDir: "./"
        },
        port: 3000
    });
    done();
}

function browserReload(done) {
    browserSync.reload();
    done();
}

function watchFile(){
    gulp.watch('./index.html', browserReload);
    gulp.watch('./js/index.js', browserReload);
    gulp.watch('./style/style.css', browserReload);
}

gulp.task("default",gulp.parallel(sync, watchFile));