module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*\n' +
            ' * Copyright (c) 2013, 2014, B3log\n' +
            ' *\n' +
            ' * Licensed under the Apache License, Version 2.0 (the "License");\n' +
            ' * you may not use this file except in compliance with the License.\n' +
            ' * You may obtain a copy of the License at\n' +
            ' *\n' +
            ' *    http://www.apache.org/licenses/LICENSE-2.0\n' +
            ' *\n' +
            ' * Unless required by applicable law or agreed to in writing, software\n' +
            ' * distributed under the License is distributed on an "AS IS" BASIS,\n' +
            ' * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n' +
            ' * See the License for the specific language governing permissions and\n' +
            ' * limitations under the License.\n' +
            ' */\n',
        stamp: {
            options: {
                banner: '<%= banner %>'
            },
            target: {
                files: [
                    {
                        src: 'src/main/js/**/*.js'
                    }
                ]
            }
        },
        jsdoc : {
            dist : {
                src: ['src/main/js/**/*.js'],
                options: {
                    destination: 'doc'
                }
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %>, <%= grunt.template.today("mmm dd, yyyy") %> */\n'
            },
            target: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/main/js',
                        src: '**/*.js',
                        dest: 'target/'
                    }
                ]
            }
        },
        jshint: {
            files: ['GruntFile.js', 'src/main/js/**/*.js'],
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
    grunt.loadNpmTasks('grunt-jsdoc');

    grunt.loadTasks('tasks');

    grunt.registerTask('default', ['stamp', 'jsdoc', 'uglify', 'jshint']);
};
