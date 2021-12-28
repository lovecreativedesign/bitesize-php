'use strict';
module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        site: '<%= pkg.site %>',

        // watch our project for changes
        watch: {
            options: {
                livereload: true
            },
            css: {
                files: [
                    'assets/css/style.css',
                    '!assets/css/style.dev.min.css',
                    '!assets/css/style.min.css'
                ],
                tasks: [
                    'jshint',                    
                    'concat',
                    'comments',
                    ///'removelogging',
                    'uglify',
                    'cssmin'
                ]
            },
            js: {
                files: [
                    '<%= jshint.all %>',
                    '!assets/js/build/*.js',
                    '!assets/js/scripts-all.min.js',
                    '!assets/js/scripts-dev.min.js'
                ],
                tasks: [
                    'jshint',
                    'concat',
                    'comments',
                    ///'removelogging',
                    'uglify',
                    'cssmin'
                ]
            }

        },
        // let us know if our JS is sound
        jshint: {
            options: {
                "bitwise": true,
                "browser": true,
                "curly": true,
                "eqeqeq": true,
                "eqnull": true,
                "es5": true,
                "esnext": true,
                "immed": true,
                "jquery": true,
                "latedef": true,
                "newcap": true,
                "noarg": true,
                "node": true,
                "strict": false,
                "trailing": true,
                "undef": true,
                "globals": {
                    "jQuery": true,
                    "alert": true,
                    "wp": true,
                    "bitesize_data_object": true,
                    "bitesize_google_object": true,
                    "bitesize" : true,
                    "_": true,
                    "google": true
                }
            },
            all: [
                '!Gruntfile.js',
                'assets/js/src/*.js',
                '!assets/js/build/*.js',
                '!assets/js/scripts-all.min.js',
                '!assets/js/scripts-dev.min.js'
            ]
        },
        removelogging: {
            dist: {
                src: "assets/js/build/*.js" // Each file will be overwritten with the output! 
            }
        },
        // concatenate the files into one
        concat: {
            js: {
                options: {
                    separator: ';'
                },
                files: {
                    'assets/js/build/scripts-concat.js': [
                        'assets/js/vendor/jquery-appear.js',
                        'assets/js/vendor/skip-link-focus-fix.js',
                        'assets/js/vendor/keyboard-image-navigation.js',
                        'assets/js/wrappers/intro.js',
                        'assets/js/src/*.js',
                        'assets/js/wrappers/outro.js'                        
                    ]
                }
            }
        },
        comments: {
            js: {
                // Target-specific file lists and/or options go here.
                options: {
                    singleline: true,
                    multiline: true
                },
                src: [                       
                    'assets/js/build/*.js'
                ] // files to remove comments from
            },
        },
        // concatenation and minification all in one
        uglify: {
            dist: {
                options: {
                    banner: '/*! <%= pkg.name %> <%= pkg.version %> filename.min.js <%= grunt.template.today("yyyy-mm-dd h:MM:ss TT") %> */\n',
                    compress: true,
                    mangle: true,
                    sourceMap: true,
                    report: 'gzip'
                },
                files: {
                    // 'assets/js/build/vendor.min.js': [
                    //    '*/vendor/plugin1/jquery.plugin.js',
                    //    '*/vendor/plugin2/plugin/plugin.js'
                    // ],
                    'assets/js/scripts-all.min.js': [
                        'assets/js/build/scripts-concat.js'
                    ]
                }
            },
            dev: {
                options: {
                    banner: '/*! <%= pkg.name %> <%= pkg.version %> filename.js <%= grunt.template.today("yyyy-mm-dd h:MM:ss TT") %> */\n',
                    beautify: true,
                    compress: false,
                    mangle: false,
                    report: 'gzip'
                },
                files: {
                    'assets/js/scripts-dev.min.js': [
                        'assets/js/build/scripts-concat.js'
                    ]
                }
            }
        },
        cssmin: {
            dist: {
                options: {
                    banner: '/*\n' +
                    'Theme Name: <%= pkg.theme_metadata.theme_name %>\n' +
                    'Theme URI: <%= pkg.theme_metadata.theme_uri %>\n' +
                    'Author: <%= pkg.theme_metadata.author %>\n' +
                    'Author URI: <%= pkg.theme_metadata.author_uri %>\n' +
                    'Description: <%= pkg.theme_metadata.description %>\n' +
                    'Version: <%= pkg.theme_metadata.version %>\n' +
                    'License: <%= pkg.theme_metadata.license %>\n' +
                    'License URI: <%= pkg.theme_metadata.license_uri %>\n' +
                    'Tags: <%= pkg.theme_metadata.tags %>\n' +
                    'Text Domain: <%= pkg.theme_metadata.text_domain %>\n<%= pkg.theme_metadata.other_meta %>\n*/'
                },
                files: {
                    'relativeAssets/css/style.min.css': [
                        'assets/css/_normalise.css',
                        'assets/css/style.css'
                    ]
                }
            },
            dev: {
                options: {
                    banner: '/*\n' +
                    'Theme Name: <%= pkg.theme_metadata.theme_name %>\n' +
                    'Template: <%= pkg.theme_metadata.template %>\n' +
                    'Theme URI: <%= pkg.theme_metadata.theme_uri %>\n' +
                    'Author: <%= pkg.theme_metadata.author %>\n' +
                    'Author URI: <%= pkg.theme_metadata.author_uri %>\n' +
                    'Description: <%= pkg.theme_metadata.description %>\n' +
                    'Version: <%= pkg.theme_metadata.version %>\n' +
                    'License: <%= pkg.theme_metadata.license %>\n' +
                    'License URI: <%= pkg.theme_metadata.license_uri %>\n' +
                    'Tags: <%= pkg.theme_metadata.tags %>\n' +
                    'Text Domain: <%= pkg.theme_metadata.text_domain %>\n<%= pkg.theme_metadata.other_meta %>\n*/'
                },
                files: {
                    'assets/css/style.dev.min.css': [
                        'assets/css/_normalise.css',
                        'assets/css/style.css'
                    ]
                }
            }
        },
        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 6
                },
                files: [{
                    expand: true,
                    cwd: 'img/*',
                    src: ['**/*.{png,jpg,gif,tiff,jpeg}'],
                    dest: 'dist/'
                },{
                    expand: true,
                    cwd: '../uploads/*',
                    src: ['**/*.{png,jpg,gif,tiff,jpeg}'],
                    dest: '../uploads/*'
                }]
            },
            dev: {
                options: {
                    optimizationLevel: 6
                },
                files: [{
                    expand: true,
                    cwd: 'img/*',
                    src: ['**/*.{png,jpg,gif,tiff,jpeg}'],
                    dest: '../uploads/*'
                }]
            }
        }

        // style (Sass) compilation via Compass
        /*compass: {
            dist: {
                options: {
                    sassDir: 'css/sass',
                    cssDir: 'css/build',
                    imagesDir: 'img',
                    images: 'img',
                    javascriptsDir: 'assets/js/build',
                    fontsDir: 'css/fonts',
                    environment: 'production',
                    outputStyle: 'expanded',
                    relativeAssets: true,
                    noLineComments: true,
                    force: true
                }
            }
        }*/

    });

    // load tasks
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    ///grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-stripcomments');
    grunt.loadNpmTasks("grunt-remove-logging");
    
    // register task
    grunt.registerTask('default', [
        'jshint',
        //'compass',
        'concat',
        ///'comments',
        ///'removelogging',
        ///'uglify',
        'cssmin',
        //'imagemin',
        'watch'
    ]);
    grunt.registerTask('dev', [
        'jshint',        
        //'compass',
        'concat',
        //'comments',
        //'removelogging',
        'uglify',
        'cssmin',
        //'imagemin',
        'watch'
    ]);
    grunt.registerTask('build', [
        'concat',
        'comments',
        'removelogging',
        'uglify',
        'cssmin'
        //'imagemin',
    ]);

};
