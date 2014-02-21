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
 * @file 用户模型。
 * @author Liang Ding <DL88250@gmail.com>
 * @version 1.0.0.1, Feb 19, 2014
 * @since 1.0.0
 */

"use strict";

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var noty = require('../noty');

var Schema = mongoose.Schema;

/**
 * 用户结构。
 *
 * @type {Schema}
 */
var userSchema = new Schema({
    /**
     * 用户名。
     */
    name: {type: String, required: [true, noty.i18n.__('invalidFormat')]},
    /**
     * 邮件。
     */
    email: {type: String, set: toLower},
    /**
     * 网址。
     */
    url: {type: String},
    /**
     * 密码。
     */
    password: {type: String},
    /**
     * 角色。
     */
    role: {type: String},
    /**
     * 创建时间。
     */
    created: {type: Date, default: Date.now},
    /**
     * 更新时间。
     */
    updated: {type: Date, default: Date.now}
});

function toLower (v) {
    return v.toLowerCase();
}

// 导出用户模型
var User = mongoose.model('User', userSchema);
module.exports = User;
