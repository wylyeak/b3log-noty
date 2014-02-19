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
 * @author Steven Yao <wmainlove@gmail.com>
 * @version 1.0.0.0, Feb 19, 2014
 * @since 1.0.0
 */

var path = require('path');
var I18n = require('i18n-2');
var mongoose = require('mongoose');
var winston = require('winston');

var moment = require('moment');


/**
 * 包含的服务
 * logger： 使用 winston
 * i18n:    使用i18n-2
 * _: 包含underscore，同时集成underscore.string，整个工具集
 *
 */
var service = {}
module.exports = function (serviceName) {
    return service[serviceName];
}

var configs = require('../resources/noty.json');

// 日志工具
var logConfig = configs.logger
var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            'level': logConfig.level,
            'timestamp': function () {
                return moment().format('YYYY-MM-DD hh:mm:ss');
            },
            'colorize': true
        })
    ]
});
// 注册日志工具
service.logger = logger;


// 国际化配置
var i18nConfig = configs.i18n
var i18nConf = {
    directory: path.join(__dirname, '../resources/locales'),
    extension: '.json',
    locales: i18nConfig.locales
};
// 注册国际化工具
service.i18n = new I18n(i18nConf);

//通用util集合
//underscore 集成underscore.string
var _ = require('underscore');
_.str = require('underscore.string');
_.mixin(_.str.exports());
service._ = _;


//数据库
var mongoConfig = configs.mongo;
var mongoURL = 'mongodb://' + mongoConfig.hostname + '/' + mongoConfig.database;
// 连接数据库
mongoose.connect(mongoURL);
logger.log('debug', 'Connected database [%s]', mongoURL);
