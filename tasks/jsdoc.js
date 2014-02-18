/**
 * @file 由于 grunt-jsdoc 有些 bugs，所以这里直接调用 jsdoc 进行文档生成。
 * @author Liang Ding <DL88250@gmail.com>
 * @version 1.0.0.0, Feb 14, 2014
 */

"use strict";

var process = require('child_process');

module.exports = function (grunt) {
    grunt.registerMultiTask('jsdoc', 'Generates JavaScript documentation',

        function () {
            this.filesSrc.forEach(function (filepath) {

                var cmd = __dirname + '/../node_modules/.bin/jsdoc -d doc -r ' + __dirname + '/../'
                    + filepath;

                // console.log(cmd);

                // TODO: 没回调
                process.exec(cmd,
                    function (error, stdout, stderr) {
                        if (error !== null) {
                            console.log('exec error: ' + error);
                        }

                        if (stdout !== null) {
                            console.log(stdout);
                        }

                        if (stderr !== null) {
                            console.log(stderr);
                        }
                    });

            });
        });
};
