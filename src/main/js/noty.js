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
 * @file Noty 相关配置与工具。
 * @author Liang Ding <DL88250@gmail.com>
 * @version 1.0.0.0, Feb 14, 2014
 * @since 1.0.0
 */

var path = require('path');
var I18n = require('i18n-2');
var mongoose = require('mongoose');
var winston = require('winston');
var moment = require('moment');

// 日志工具
var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            'level': 'debug',
            'timestamp': function () {
                return moment().format('YYYY-MM-DD hh:mm:ss');
            },
            'colorize': true
        })
    ]
});
// 导出日志工具
exports.logger = logger;

// 国际化配置
var i18nConf = {
    directory: path.join(__dirname, '../resources/locales'),
    extension: '.json',
    locales: ['zh_CN']
};
// 导出国际化工具
exports.i18n = new I18n(i18nConf);

// TODO: 初始化向导生成
// Noty 配置
var conf = {
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
    i18n: i18nConf
};
// 导出 Noty 配置
exports.conf = conf;

var mongoURL = 'mongodb://' + conf.mongo.hostname + '/' + conf.mongo.database;
// 连接数据库
mongoose.connect(mongoURL);

logger.log('debug', 'Connected database [%s]', mongoURL);
