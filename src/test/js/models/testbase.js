/*
 * Copyright (c) 2013, 2014, B3log
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @file 测试用例基础模块。
 * @author Liang Ding <DL88250@gmail.com>
 * @version 1.0.0.0, Mar 7, 2014
 * @since 1.0.0
 */

var mongoose = require('mongoose');
var mongoURL = 'mongodb://localhost/b3log-noty';

exports.setup = function() {
    mongoose.connection.on('error', function (err) {
        console.log('Could not connect to mongo server, skips tests [' + err + ']');

        exports.skipTests = true;
    });

    if (0 === mongoose.connection.readyState) {
        mongoose.connect(mongoURL);
    }
}

exports.shutdown = function () {
    // 数据库连接会由测试进程自动关闭
}
