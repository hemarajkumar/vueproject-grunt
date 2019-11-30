module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
       images: ["web/images"],
       js: ["web/js"],
       fonts: ["web/fonts"]
    },
    copy: {
        js: {
          cwd: '_ui-src/js/common/',
          src: 'lodash.js',
          dest: 'web/js/',
          expand: true
        },
        images: {
          expand: true,
          cwd: '_ui-src/images',
          src:'**/*',
          dest: 'web/images/'
        },
        fonts: {
          expand: true,
          cwd: '_ui-src/fonts',
          src:'**/*',
          dest: 'web/css/fonts'
        }
    },

    jshint: {
       options: {
           "-W041": false,
           "asi" : true,
           "-W069": false,
           "expr": true,
           "strict": false,
           "unused": false,
           "scripturl":true,
            "esversion": 6,
           "globals": {
               "jQuery": true
           }
       },
       all: ['_ui-src/js/theme/*.js']
    },


	watch: {
    files: ['_ui-src/js/theme/*.js'],
    tasks: ['jshint'],
		less: {
			files: ["_ui-src/less/*.less"],
			tasks: ["less", "postcss"],
			options: {
				nospawn: true
			}
		},
    concat: {
      files: ['_ui-src/js/common/jquery-3.3.1.js',
            '_ui-src/js/common/bootstrap.min.js',
            '_ui-src/js/common/owl.carousel.js',
            '_ui-src/js/common/vue.js',
            '_ui-src/js/theme/cookie.js',
            '_ui-src/js/theme/component.js',
            '_ui-src/js/theme/scripts.js',
            '_ui-src/js/theme/gtm.js'
            ],
      tasks: ["concat"]
    }
  //  files: ['<%= jshint.all %>'],
  //  tasks: ['jshint'],
  //  ybasejs: {
  //     files: ['_ui-src/js/theme/*.js'],
  //     tasks: ['sync:syncybase', 'jshint'],
  //   },
	},
	less: {
      build: {
  			options: {
  				compress: false,
  				yuicompress: false,
  				optimization: 2,
  				cleancss:false,
  				paths: ["css"],
          syncImport: false,
          strictUnits:false,
          strictMath: true,
          ieCompat: false
        },
  			files: {
  				"web/css/theme/compile.css": "_ui-src/less/styles.less"
  			}
		}
	},

  concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['_ui-src/js/common/jquery-3.3.1.js',
              '_ui-src/js/common/bootstrap.min.js',
              '_ui-src/js/common/owl.carousel.js',
              '_ui-src/js/theme/lodash.js',
              '_ui-src/js/common/vue.js',
              '_ui-src/js/common/cookie.js',
              '_ui-src/js/theme/jsondata.js',
              '_ui-src/js/theme/component.js',
              '_ui-src/js/theme/scripts.js',
              '_ui-src/js/theme/gtm.js'

              ],
        dest: 'web/js/project-script.js',
      },
    },

    concat_css: {
      options: {
          // Task-specific options go here.
        },
        all: {
          src: ["_ui-src/css/common/bootstrap/*.css",
                "_ui-src/css/common/owl-carousel/*.css"],
          dest: "web/css/common/plugin.css",
        }
    },

    postcss: {
      options: {
        processors: [
          require('autoprefixer')({'overrideBrowserslist': ['last 4 version']})
          //require('cssnano')()
        ]
      },
      dist: {
        src: 'web/css/theme/compile.css',
        dest: 'web/css/theme/project.css'
      }
    }
    
  });

  /** Plugin's */
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat-force');
  grunt.loadNpmTasks('grunt-concat-css');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.registerTask('post-css', ['postcss']);
  grunt.registerTask('default', ['clean', 'less', 'concat', 'concat_css', 'postcss', 'jshint', 'copy', 'watch']);
};
