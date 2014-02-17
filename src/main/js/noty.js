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

"use strict";

/**
 * @file Noty 相关配置。
 * @author Liang Ding <DL88250@gmail.com>
 * @version 1.0.0.0, Feb 14, 2014
 * @since 1.0.0
 */

var path = require('path');
var I18n = require('i18n-2');
var mongoose = require('mongoose');

// TODO: 初始化向导生成
exports.conf = {
    version: '1.0.0',
    notyTitle: 'B3log Noty',
    notySubTitle: '专注于知识整理与分享',
    mongo: {
        hostname: 'localhost',
        port: '27017',
        username: '',
        password: '',
        database: 'b3log-noty'
    },
    i18n: {
        directory: path.join(__dirname, '../resources/locales'),
        extension: '.json',
        locales: ['zh_CN']
    }
};

var mongoURL = 'mongodb://' + this.conf.mongo.hostname + '/' + this.conf.mongo.database;
mongoose.connect(mongoURL);
console.log('Connected MongoDB [' + mongoURL + ']');

exports.i18n = new I18n(this.conf.i18n);
