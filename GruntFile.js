module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %>, <%= grunt.template.today("mmm dd, yyyy") %> */\n'
            },
            target: {
                files: [
                    {
                        src: 'app.js',
                        dest: 'target/app.js'
                    },
                    {
                        expand: true,
                        cwd: 'routes',
                        src: '**/*.js',
                        dest: 'target/routes'
                    },
                    {
                        expand: true,
                        cwd: 'db',
                        src: '**/*.js',
                        dest: 'target/db'
                    }
                ]
            }
        },
        jshint: {
            files: ['GruntFile.js', 'app.js', 'routes/**/*.js', 'db/**/*.js'],
            options: {
                globals: {
                    jQuery: true,
                    console: true,
                    module: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', ['uglify', 'jshint']);
};
