module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
       images: ["web/webroot/_ui/images"]
    },
    copy: {
        images: {
          expand: true,
          cwd: '_ui-src/web/webroot/images',
          src:'**/*',
          dest: 'web/webroot/_ui/images/'
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
       all: ['_ui-src/web/webroot/js/theme/*.js']
    },


	watch: {
		less: {
			files: ["_ui-src/web/webroot/less/*.less"],
			tasks: ["less"],
			options: {
				nospawn: true
			}
		},
    files: ['<%= jshint.all %>'],
    tasks: ['jshint'],
    ybasejs: {
       files: ['_ui-src/web/webroot/js/theme/*.js'],
       tasks: ['sync:syncybase', 'jshint'],
     },
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
  				"web/webroot/_ui/css/theme/project.css": "_ui-src/web/webroot/less/styles.less"
  			}
		}
	},

    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['_ui-src/web/webroot/js/common/jquery-3.3.1.js',
              '_ui-src/web/webroot/js/common/bootstrap.min.js',
              '_ui-src/web/webroot/js/common/owl.carousel.js',
              '_ui-src/web/webroot/js/common/vue.js',
              '_ui-src/web/webroot/js/theme/jsondata.js',
              '_ui-src/web/webroot/js/theme/component.js',
              '_ui-src/web/webroot/js/theme/scripts.js'
              ],
        dest: 'web/webroot/_ui/js/project-script.js',
      },
    },

     concat_css: {
        options: {
          // Task-specific options go here.
        },
        all: {
          src: ["_ui-src/web/webroot/css/common/bootstrap/*.css",
                "_ui-src/web/webroot/css/common/owl-carousel/*.css"],
          dest: "web/webroot/_ui/css/common/plugin.css",
        }
      }
  });

  /** Plugin's */
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-sync');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat-force');
  grunt.loadNpmTasks('grunt-concat-css');


  grunt.registerTask('default', ['clean', 'less', 'copy', 'jshint', 'watch', 'concat', 'concat_css']);
};
