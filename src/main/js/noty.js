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
 * @version 1.0.2.1, Mar 26, 2014
 * @since 1.0.0
 */

var fs = require('fs');
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
 *     <li>_</li>underscore, underscore.string, 其他自定义工具
 *     <li>conf</li>noty.json（初始化后为 noty-prod.json）
 * </ul>
 */
var service = {};

module.exports = function (serviceName) {
    return service[serviceName];
};

// 通用 utils
// underscore 集成 underscore.string
var _ = require('underscore');
_.str = require('underscore.string');
_.mixin(_.str.exports());
_.mixin({
    /**
     * 判断 Noty 是否处于指定的初始化步骤。
     */
    isInited: function (step) {
        var inited = this.getInited();
        if (-1 === inited) {
            return false;
        }

        return step === inited;
    },

    /**
     * 返回 Noty 当前处于的初始化步骤。
     */
    getInited: function () {
        var confProdPath = path.join(__dirname, '../resources/noty-prod.json');
        var exists = fs.existsSync(confProdPath);

        if (!exists) { // 不存在 noty-prod.json 的话任何步骤都还没开始
            return -1;
        }

        var confBuffer = fs.readFileSync(confProdPath);

        return JSON.parse(confBuffer.toString()).init;
    }
});
// 注册通用 utils
service._ = _;

var conf;
if (!_.isInited(2)) {
    conf = require('../resources/noty.json');
} else {
    conf = require('../resources/noty-prod.json');
}

// 注册基础配置
service.conf = conf;

// 日志工具
var logConf = conf.logger;
var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            'level': logConf.level,
            'timestamp': function () {
                return moment().format('YYYY-MM-DD hh:mm:ss');
            },
            'colorize': true,
            'prettyPrint': true
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

// 如果用户已经初始化过 mongo （做过步骤 1）了，则在此时连接 mongo，否则会在初始化过程中连接（option#initMongo）
if (_.isInited(1) || _.isInited(2)) {
    var mongoConf = conf.mongo;
    var mongoURL = 'mongodb://' + mongoConf.username + ':' + mongoConf.password + '@' +
        mongoConf.hostname + ':' + mongoConf.port + '/' + mongoConf.database;

    mongoose.connection.on('connected', function (ref) {
        logger.log('info', 'Connected to mongo server');
    });
    mongoose.connection.on('disconnected', function () {
        logger.log('info', 'Disconnected from mongo server');
    });
    mongoose.connection.on('error', function (err) {
        logger.log('error', 'Could not connect to mongo server [' + err + ']');
    });

    // 连接数据库
    mongoose.connect(mongoURL, {server: {auto_reconnect: true}});
}
