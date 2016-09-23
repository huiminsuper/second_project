/*引入gulp来配置文件*/
var gulp=require('gulp');
var gulpLoadPlugins=require('gulp-load-plugins')();//变成gulp-load-plugins下的方法



gulp.task('yasuo',function() {//'yasuo'可以改成default在node(命令行)中直接gulp回车
	gulp.src('src/js/a.js')//将src中的js文件压缩到dest中，也可以改名字
		.pipe(gulpLoadPlugins.uglify())
		.pipe(gulpLoadPlugins.rename({
			suffix:'.minnnnnn',//加后缀
			prefix:'pre.'//,//加前缀
			//extname:'.jss',//改扩展名
			//basename:'index'//改变主文件名
		}))//重命名
		.pipe(gulp.dest('dest/js'))
})


/*js代码检查*/
/*gulp.task('checkjs',function() {
	return gulp.src('src/js/pub.js')
			   .pipe(jshint())
			   .pipe(jshint.reporter('default'))
})*/

/*压缩js文件*/
/*gulp.task('yasuo',['checkjs'],function() {//'yasuo'可以改成default在node(命令行)中直接gulp回车
	gulp.src('src/js/a.js')//将src中的js文件压缩到dest中，也可以改名字
		.pipe(uglify())
		.pipe(rename({
			suffix:'.minnnnnn',//加后缀
			prefix:'pre.'//,//加前缀
			//extname:'.jss',//改扩展名
			//basename:'index'//改变主文件名
		}))//重命名
		.pipe(gulp.dest('dest/js'))
})*/

/*css压缩*/
gulp.task('cssYaSuo',function() {
	gulp.src('src/css/style.css')
		.pipe(cleanCss())
		.pipe(rename({
			suffix:'.min'
		}))
		.pipe(gulp.dest('dest/css'))
})

/*编译less*/
gulp.task('lessToCss',function() {
	gulp.src('src/less/style.less')//也可编译src下的所有less文件
		.pipe(less())
		.pipe(gulp.dest('dest/css'))
})

/*充当服务器使用，配置服务器任务*/

/*//设置静态服务器
gulp.task('go',function() {
	webServise.server({
		root:'src',//类似www
		port:'5555',//改变端口号
		livereload:true
	})
})

gulp.task('index',function() {
	gulp.src('src/html/*.html')
		.pipe(webServise.reload())
})
gulp.task('watch',function() {
	gulp.watch(['src/html/*.html'],['index'])
})
gulp.task('default',['go','watch'])*/

/*配置删除文件/文件夹任务*/
/*gulp.task('cancel',function() {
	return gulp.src('dest/js/hebing.min.js')
			   .pipe(cancelFile())
})
gulp.task('yasuo',['cancel'],function()	{
	gulp.src('src/js/a.js')
		.pipe(jshint())
		.pipe(rename({
			suffix:'.min',
			prefix:'abc.'
		}))
		.pipe(gulp.dest('dest/js'))
})*/

/*配置合并任务*/
gulp.task('cancat',function(){
	gulp.src('src/js/*.js')
		.pipe(cancat('hebing.js'))//合并后的名称
		.pipe(uglify())//压缩
		.pipe(rename({//改名
			suffix:'.min',
			prefix:'pre.'
		}))
		.pipe(gulp.dest('dest/js'))//合并后的存放位置
})

/*配置压缩图片任务*/
gulp.task('imgs',function(){
	gulp.src('src/imgs/*.jpg')
		.pipe(yaSuoImg())
		.pipe(gulp.dest('dest/imgs'))
})


/*watch自动监听(即src中的文件有变化同时dest中对应的文件就会及时执行对应的变化)*/
/*gulp.task('default',function() {
	gulp.watch('src/js/*.js',['yasuo'])
})*/
//监听多个
/*gulp.task('default',function() {
	gulp.watch(['src/js/*.js','src/less/*.less','src/imgs/*.jpg'],['yasuo','lessToCss','imgs']);
})*/
