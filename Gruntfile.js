const mozjpeg = require('imagemin-mozjpeg');

module.exports = function(grunt) {
    // configuration function for our grunt plugins
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // ugligy config
        uglify: {
          build: {
            src: 'js/script.js',
            dest: 'js/script.min.js'
          }
        },
        // sass config
        sass: {
            dist: {
              files: {
                'css/style.css': 'css/main.scss'
              }
            }
          },
        // watch config
        watch: {
            scripts: {
              files: ['js/script.js', 'css/main.scss', 'css/style.css'],
              tasks: ['uglify', 'sass', 'cssmin'],
              options: {
                spawn: false,
              },
            },
          },
        cssmin: {
        target: {
            files: [{   
            expand: true,
            cwd: 'css',
            src: ['style.css', 'style.min.css'],
            dest: 'css',
            ext: '.min.css'
            }]
        }
        },
        imagemin: {
            static: {
                options: {
                    optimizationLevel: 3,
                    svgoPlugins: [{removeViewBox: false}],
                    use: [mozjpeg()]
                }
            },
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'img/',
                    src: ['img/*.{png,jpg,gif}'],
                    dest: 'img/'
                }]
            }
        }
    });
    // we need to load our plugins
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    // default tasks
    grunt.registerTask('default', ['uglify'], ['sass'], ['cssmin'], ['watch']); 
    grunt.registerTask('compress', ['imagemin']); 
};