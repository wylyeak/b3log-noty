/*
 * grunt-stamp
 * https://github.com/brainkim/grunt-stamp
 *
 * Copyright (c) 2013 Brian Kim
 * Licensed under the MIT license.
 */

// TODO: grunt-stamp 问题确定与修复
/**
 * @file 用于加文件头/尾的工具。由于<a href='https://github.com/brainkim/grunt-stamp'>原作</a>有问题，所以暂时
 * 在这里进行修复，等有时间再给原作者 Pull。
 * @author Liang Ding <DL88250@gmail.com>
 * @version 1.0.0.0, Feb 14, 2014
 */

'use strict';

module.exports = function (grunt) {
    grunt.registerMultiTask('stamp', 'Add a banner or footer to files',
        function () {

            var options = this.options({
                banner: '',
                footer: ''
            });

            this.filesSrc.forEach(function (filepath) {
                if (grunt.file.isFile(filepath)) {
                    var file = grunt.file.read(filepath);

                    // 这里的代码在 Win7_64/Node 0.10.25 不工作，会导致每次运行后目标文件被添加一次 grunt.util.linefeed
                    // Remove <EOL>
                    if ('win32' !== process.platform) {
                        file = file[file.length - 1] === grunt.util.linefeed ?
                            file.slice(0, file.length - 1) :
                            file;
                    }

                    var banner, footer;
                    if (options.banner && checkBanner(file, options.banner)) {
                        banner = options.banner;
                    }

                    if (options.footer && checkFooter(file, options.footer)) {
                        footer = options.footer;
                    }

                    var newFile = [banner,
                        file,
                        footer]
                        .filter(function (s) {
                            return s;
                        })
                        .join(grunt.util.linefeed);

                    if ('win32' === process.platform) {
                        grunt.file.write(filepath, newFile);
                    } else { // 其他平台不确定，暂时保留
                        grunt.file.write(filepath, newFile + grunt.util.linefeed);
                    }

                    if (banner || footer) {
                        grunt.verbose.writeln(filepath + ' stamped!');
                    }
                }
            });
        });
};

function check(file, str, index) {
    return file.indexOf(str) !== index;
}

function checkBanner(file, banner) {
    return check(file, banner, 0);
}

function checkFooter(file, footer) {
    return check(file, footer, file.length - footer.length);
}