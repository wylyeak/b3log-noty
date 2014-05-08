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
 * <p>
 *     Noty 的初始化也是在该模块中实现，初始化有两个步骤：
 *     <ol>
 *         <li>初始化数据库</li>
 *         <li>初始化应用参数配置</li>
 *     </ol>
 *     第一个步骤执行成功的话将以 noty.json 为模版创建 noty-prod.json，第二个步骤会将一些配置保存到数据库。
 * </p>
 *
 * @author Steven Yao<wmainlove@gmail.com>
 * @author Liang Ding <DL88250@gmail.com>
 * @version 1.0.0.2, Mar 7, 2014
 * @since 1.0.0
 */

"use strict";

var fs = require('fs');
var path = require('path');
var mongoose = require('mongoose');
var noty = require('../noty');
var util = noty('_');
var i18n = noty('i18n');
var User = require('./user');
var Post = require('./post');
var Tag = require('./tag');
var logger = noty('logger');
var conf = require('../../resources/noty.json'); // 注意这里使用的是基础配置模版，而不是 noty('conf')
var Schema = mongoose.Schema;

var confProdPath = path.join(__dirname, '../../resources/noty-prod.json');

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
 * 获取“偏好设定”。
 *
 * 偏好设定对象：
 * <pre>
 * {
 *     title: "",
 *     subTitle: ""
 * }
 * </pre>，将作为实参调用传入的回调函数。
 */
optionSchema.statics.getPreferences = function (callback) {
    Option.find({category: 'prefs'}, null, function (err, options) {
        var preferences = {};

        for (var key in options) {
            var option = options[key];
            preferences[option.key] = option.value;
        }

        if (callback) {
            callback(preferences);
        }

        return preferences;
    });
};

/**
 * 初始化数据库。
 *
 * arg 初始化实参，例如
 * <pre>
 * {
 *     hostname: "",
 *     port: "",
 *     username: "",
 *     password: "",
 *     database: ""
 * }
 * </pre>
 */
optionSchema.statics.initMongo = function (arg, callback) {
    var initedDB = util.isInited(1);

    if (initedDB) {
        callback('inited');

        return;
    }

    logger.log('info', 'Initializing database');

    var mongoURL = 'mongodb://' + arg.username + ':' + arg.password + '@' +
        arg.hostname + ':' + arg.port + '/' + arg.database;

    mongoose.connection.close(); // 无论是否有已打开的连接，先关闭一次，避免下面进行连接时报错
    mongoose.connect(mongoURL, {server: {auto_reconnect: true}});

    mongoose.connection.on('connected', function () {
        if (!initedDB) {
            // 保存配置
            conf.mongo.hostname = arg.hostname;
            conf.mongo.port = arg.port;
            conf.mongo.username = arg.username;
            conf.mongo.password = arg.password;
            conf.mongo.database = arg.database;

            // 更新步骤标识，1 表示初始化数据（步骤 1）已经完成
            conf.init = 1;

            fs.writeFileSync(confProdPath, JSON.stringify(conf, null, 4));

            logger.log('info', 'Initialized database');

            callback('succ');

            return;
        }
    });

    mongoose.connection.on('error', function (err) {
        callback('failed');

        return;
    });
};

/**
 * 初始化应用参数配置。
 *
 * arg 初始化实参，例如
 * <pre>
 * {
 *     title: "",
 *     subTitle: "",
 *     userName: "",
 *     email: "",
 *     password: ""
 * }
 * </pre>
 */
optionSchema.statics.initNoty = function (arg, callback) {
    var initedNoty = util.isInited(2);

    if (initedNoty) {
        callback('inited');

        return;
    }

    logger.log('info', 'Initializing Noty');

    // 初始化参数配置
    new Option({ // 标题
        category: 'prefs',
        key: 'title',
        value: arg.title
    }).save();

    new Option({ // 子标题
        category: 'prefs',
        key: 'subTitle',
        value: arg.subTitle
    }).save();

    // 初始化管理员用户
    var admin = new User({
        name: arg.userName,
        email: arg.email,
        password: arg.password, // User 保存的时候会哈希
        role: 'Admin'
    });

    admin.save();

    // 发布 "Hello World!" 文章
    new Post({
        title: i18n.__('helloWorldTitle'),
        abstract: i18n.__('helloWorldContent'),
        authorId: admin.id,
        content: i18n.__('helloWorldContent'),
        tags: [new Tag({title: 'B3log Noty'})]
    }).publish();

    var conf = require(confProdPath); // 此时生产配置一定存在
    // 更新步骤标识，2 表示初始化应用（步骤 2）已经完成
    conf.init = 2;

    fs.writeFileSync(confProdPath, JSON.stringify(conf, null, 4));

    logger.log('info', 'Initialized Noty');

    // 登录用户
    arg.req.session.user = admin;

    callback('succ');
};

/**
 * 恢复初始化状态。
 *
 * <ol>
 *     <li>删除 resources/noty-prod.json 文件</li>
 *     <li>删除数据库中所有数据</li>
 * </ol>
 */
optionSchema.statics.initAg = function () {
    if (fs.existsSync(confProdPath)) {
        fs.unlinkSync(confProdPath);
    }

    Post.remove(function (err) {
        if (err) {
            throw err;
        }
    });

    Tag.remove(function (err) {
        if (err) {
            throw err;
        }
    });

    Option.remove(function (err) {
        if (err) {
            throw err;
        }
    });

    User.remove(function (err) {
        if (err) {
            throw err;
        }
    });

    logger.log('info', 'Noty has been reset');
};

// 导出文章模型
var Option = mongoose.model('option', optionSchema);
module.exports = Option;
