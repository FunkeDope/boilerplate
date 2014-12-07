module.exports = function(grunt) {
  'use strict';
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['_js/**/*.js'],
        dest: 'public/js/main.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'public/js/main.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    compass: {
       dev: {
           options: {              
               sassDir: ['_sass'],
               cssDir: ['public/css'],
               sourcemap: true,
               environment: 'development'
           }
       }
    },
    jshint: {
          beforeconcat: ['_js/**/*.js']
    },
    watch: {
      js: {
          files: ['_js/**/*.js'],
          tasks: ['concat', 'uglify']
      },
      css: {
          files: ['_sass/*.scss'],
          tasks: ['compass'],
          options: {
              spawn: false
          }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['compass', 'jshint', 'concat', 'uglify', 'watch']);

};