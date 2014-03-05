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
 *     第一个步骤执行成功的话将以 noty.json 为模版创建 noty-prod.json，第二个步骤会更新这个配置文件。
 *     调用 initAg 时会删除这个配置文件，恢复初始化状态。
 * </p>
 *
 * @author Steven Yao<wmainlove@gmail.com>
 * @author Liang Ding <DL88250@gmail.com>
 * @version 1.0.0.1, Mar 3, 2014
 * @since 1.0.0
 */

"use strict";

var fs = require('fs');
var path = require('path');
var mongoose = require('mongoose');
var noty = require('../noty');
var i18n = noty('i18n');
var User = require('./user');
var Post = require('./post');
var Tag = require('./tag');
var logger = noty('logger');
var conf = require('../../resources/noty.json');
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
optionSchema.statics.initNoty = function (arg) {
    var initedDB = fs.existsSync(confProdPath);

    if (!initedDB) {
        logger.log('info', 'Database has not initialized yet');

        return;
    }

    Option.find(function (err, options) {
        if (0 < options.length) {
            logger.log('info', 'Options has already initialized');

            return; // 如果已经初始化过则不再初始化
        }

        logger.log('info', 'Initializing options');

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
            password: arg.password,
            role: 'Admin'
        });

        admin.save();

        // 保存配置
        var confProd = require(confProdPath);

        confProd.base.title = arg.title;
        confProd.base.subTitle = arg.subTitle;

        fs.writeFile(confProdPath, JSON.stringify(confProd, null, 4));

        // 发布 "Hello World!" 文章
        var post = new Post({
            title: i18n.__('helloWorldTitle'),
            abstract: i18n.__('helloWorldContent'),
            authorId: admin.id,
            content: i18n.__('helloWorldContent'),
            tags: [new Tag({title: 'B3log Noty'})]
        });

        post.publish();

        logger.log('info', 'Initialized options');
    });
};

/**
 * 初始化数据库。
 */
optionSchema.statics.initMongo = function (arg) {
    var initedDB = fs.existsSync(confProdPath);

    if (initedDB) {
        logger.log('info', 'Database has already initialized');

        return;
    }

    logger.log('info', 'Initializing database');

    var mongoURL = 'mongodb://' + arg.username + ':' + arg.password + '@' +
        arg.hostname + ':' + arg.port + '/' + arg.database;

    mongoose.connect(mongoURL);

    // 保存配置
    conf.mongo.hostname = arg.hostname;
    conf.mongo.port = arg.port;
    conf.mongo.username = arg.username;
    conf.mongo.password = arg.password;
    conf.mongo.database = arg.database;

    fs.writeFileSync(confProdPath, JSON.stringify(conf, null, 4));

    logger.log('info', 'Initialized options');
};

/**
 * 恢复初始化状态。
 *
 * <ol>
 *     <li>删除 resources/noty-prod.json 文件</li>
 * </ol>
 */
optionSchema.statics.initAg = function () {
    if (fs.existsSync(confProdPath)) {
        fs.unlinkSync(confProdPath);
    }

    logger.log('info', 'Noty has been reset, please initialize it again');
};

/**
 * 判断 Noty 是否已经初始化完毕。
 */
optionSchema.statics.isInited = function () {
   return fs.existsSync(confProdPath);
};

// 导出文章模型
var Option = mongoose.model('option', optionSchema);
module.exports = Option;
