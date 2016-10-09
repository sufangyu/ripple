var banner = '/**\n'+
             ' * <%= app.name %>  v<%= app.version %>\n'+
             ' * @date  <%= grunt.template.today("yyyy-mm-dd") %>\n'+
             ' * @author  <%= app.author.name %>\n'+
             ' * @home  <%= app.homepage %>\n'+
             ' * Licensed under <%= app.license %>\n'+
             ' */\n';


module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        app: grunt.file.readJSON('_config.json'),

        //  语法检查
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            dist: {
				src: ['<%= app.dist.dir %>/**/*.js', 'Gruntfile.js']
			},
			src: {
                src: ['<%= app.src.dir %>/**/*.js', 'Gruntfile.js', '!<%= app.src.dir %>/**/jquery-1.9.1.min.js', '!<%= app.src.dir %>/**/zepto.min.js', '!<%= app.src.dir %>/**/highlight.js']
            }
        },
        

        //  压缩
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },

            dist: {
                options: {
                    banner: banner
                },
                files: {
                    'dist/js/<%= app.name %>.min.js': 'dist/js/<%= app.name %>.js'
                }
            }
        },


        //  删除文件夹与文件
        clean: {
            dist: [ '<%= app.dist.dir %>' ]
        },


        //  复制文件与文件夹
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= app.src.dir %>',
                        src: ['**/images/**/*', '**/demos/**/*', '!templates/**/*'],
                        dest: '<%= app.dist.dir %>'
                    }               
                ]
            },
            libs: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= app.src.dir %>',
                        src: '<%= app.src.libs %>',
                        dest: '<%= app.dist.dir %>'
                    }               
                ]
            }
        },

        // sass
        sass: {
            dist: {
                options: {
                    trace: true,
                    noCache: true,
                    sourcemap: 'none',
                    style: 'compressed'
                },
                files: {
                    '<%= app.dist.dir %>/css/style.css': '<%= app.src.dir %>/scss/style.scss',
                    '<%= app.dist.dir %>/css/ripple.css': '<%= app.src.dir %>/scss/ripple.scss',
                }
            },
        	src: {
                options: {
                	trace: true,
                    noCache: true,
                    sourcemap: 'none',
                    style: 'expanded'
                },
                files: {
                    '<%= app.src.dir %>/css/style.css': '<%= app.src.dir %>/scss/style.scss',
                    '<%= app.src.dir %>/css/ripple.css': '<%= app.src.dir %>/scss/ripple.scss',
                }
            }
        },
        

        // 文件连接
        concat: {
            dist: {
                files: {
                    '<%= app.dist.dir %>/js/<%= app.name %>.js': '<%= app.src.scripts %>'
                }
            }
        },

        // autoprefixer 自动补全浏览器前缀
        autoprefixer: {
			options: {
				browserslist:['last 2 versions', 'chrome','Firefox','ie', 'Opera', 'Safari']
			}
		},


        // connect 本地服务器
        connect: {
            options: {
                port: 9000,
                hostname: '*',
                open: true,
                livereload: true,
            },
            dist: {
                options: {
                    base: ['<%= app.dist.dir %>']
                }
            },            
            src: {
                options: {                    
                    base: ['<%= app.src.dir %>']
                }
            }
        },

        // watch 监听配置
        watch: {
            options: {
                livereload: true
            },            
            // 发布
            dist: {
            },
            // 开发
            src: {
            	files: [
            	    '<%= app.src.dir %>/*.html',
            	    '<%= app.src.dir %>/js/*.js',
            	    '<%= app.src.dir %>/scss/*.scss',
                    '<%= app.src.dir %>/images/*.{png,jpg,gif,svg}',
                    '<%= app.src.dir %>/demos/*.html'
            	],
            	tasks: ['jshint:src', 'sass:src']
            }
        },


    });

    
    //  执行任务
    grunt.registerTask('default', ['connect:templates']);
    grunt.registerTask('serve', ['connect:src', 'watch']);


    grunt.registerTask('dist', ['clean:dist', 'sass:dist', 'concat:dist', 'uglify:dist', 'copy:libs', 'copy:dist']);
    grunt.registerTask('src', ['connect:src', 'watch:src']);

    // grunt.registerTask('dist', [ 'clean:dist', 'sass:dist', 'autoprefixer', 'concat:dist', 'cssmin:dist', 'copy:distImages', 'jscs:dist', 'usebanner:dist', 'uglify:dist', 'copy:readme' ]);
    // grunt.registerTask('docs', [ 'dist', 'clean:docs', 'assemble', 'sass:docs', 'copy:docsAssets', 'copy:distToDocs', 'zip' ]);
    // grunt.registerTask('test', [ 'jshint:dist', 'qunit:dist', 'blanket_qunit:dist' ]);
    // grunt.registerTask('default', [ 'dist', 'docs', 'test' ]);
    // grunt.registerTask('serve', [ 'connect:docs', 'watch' ]);
    // grunt.registerTask('zip', [ 'compress' ]);
    // grunt.registerTask('deploy', [ 'docs', 'gh-pages' ]);


    /** Task:
     *  serve  => 浏览demo：本地服务器；
     *  dist   => 发布代码：
     *  test   => 代码测试：检查代码发布目录的 js 语法
     *  zip    => 代码打包：把发布的代码打包成压缩文件
     *  src    => 开发：本地服务器；实时刷新；生产dist文件
     *  templates => 静态模板：本地服务器；实时刷新
     */
};