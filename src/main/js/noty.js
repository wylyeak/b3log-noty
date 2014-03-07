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
 * 公共服务。
 *
 * <ul>
 *     <li>logger</li>winston
 *     <li>i18n</li>i18n-2
 *     <li>_</li>underscore, underscore.string
 * </ul>
 */
var service = {};

module.exports = function (serviceName) {
    return service[serviceName];
};

var conf = require('../resources/noty.json');

// 日志工具
var logConfig = conf.logger;
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

// 注册国际化工具
service.i18n = new I18n({
    directory: path.join(__dirname, conf.i18n.directory),
    extension: conf.i18n.extension,
    locales: conf.i18n.locales
});

// 通用 util 集合
// underscore 集成 underscore.string
var _ = require('underscore');
_.str = require('underscore.string');
_.mixin(_.str.exports());
service._ = _;

//数据库
var mongoConf = conf.mongo;
var mongoURL = 'mongodb://' + mongoConf.username + ':' + mongoConf.password + '@' +
    mongoConf.hostname + ':' + mongoConf.port + '/' + mongoConf.database;
// 连接数据库
mongoose.connection.on('connected', function (ref) {
    logger.log('info', 'Connected to mongo server');
});
mongoose.connection.on('disconnected', function () {
    logger.log('info', 'Disconnected from mongo server');
});
mongoose.connection.on('error', function (err) {
    logger.log('error', 'Could not connect to mongo server [' + err + ']');
});
// 如果用户已经初始化过 noty 了，则在此时连接 mongo，否则会在初始化过程中连接（option#initMongo）
// TODO: mongoose.connect(mongoURL);
