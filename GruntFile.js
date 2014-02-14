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
                        src: 'app.js'
                    },
                    {
                        src: 'routes/**/*.js'
                    }
                ]
            }
        },
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
    grunt.loadNpmTasks('grunt-stamp');

    grunt.registerTask('default', ['stamp', 'uglify', 'jshint']);
};
