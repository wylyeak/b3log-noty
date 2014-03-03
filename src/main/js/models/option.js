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
 * @file 参数配置模型。
 *
 * @author Steven Yao<wmainlove@gmail.com>
 * @author Liang Ding <DL88250@gmail.com>
 * @version 1.0.0.1, Mar 3, 2014
 * @since 1.0.0
 */

"use strict";

var mongoose = require('mongoose');
var noty = require('../noty');
var User = require('./user');
var logger = noty('logger');

var Schema = mongoose.Schema;

/**
 * 参数配置结构。
 */
var optionSchema = new Schema({
    /**
     * 类别。
     */
    category: {type: String},
    /**
     * 键。
     */
    key: {type: String},
    /**
     * 值。
     */
    value: {type: String}
});

/**
 * 初始化参数配置。
 *
 * @param args 指定的实参，例如：
 * <pre>
 * {
 *     userName: "88250"
 * }
 * </pre>
 */
optionSchema.statics.initialize = function (args) {
    Option.find(function (err, options) {
        if (0 < options.length) {
            logger.log('info', 'Options has already initialized');

            return; // 初始化过的话不再进行初始化
        }

        // 进行初始化
        init(args);
    });
};

/**
 * 初始化参数配置。
 */
function init(args) {
    logger.log('info', 'Initing options');

    var userName = new Option({
        category: 'prefs',
        key: 'userName',
        value: args.userName
    });

    userName.save();

    // 初始化管理员用户
    new User({
       name: args.userName
    }).save();

    //

    logger.log('info', 'Inited options');
}

// 导出文章模型
var Option = mongoose.model('option', optionSchema);
module.exports = Option;
