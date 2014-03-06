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
 * @file 初始化页面
 * <ul>
 *     <li>展现初始化数据库页面：/init/mongo, GET</li>
 *     <li>展现初始化应用页面：/init/noty, GET</li>
 *     <li>初始化数据库：/init/mongo, POST</li>
 *     <li>初始化应用：/init/noty, POST</li>
 *     <li>恢复初始化状态：/init/ag, POST</li>
 * </ul>
 *
 * @author Liyuan Li <http://vanessa.b3log.org>
 * @author Liang Ding <DL88250@gmail.com>
 * @version 1.0.0.2, Mar 4, 2014
 * @since 1.0.0
 */

"use strict";

var Option = require('../models/option');

module.exports.controller = function (app) {

    app.get('/init/mongo', function (req, res) {
        res.render('init-mongo', { title: 'Noty - register' });
    });

    app.get('/init/noty', function (req, res) {
        res.render('init-noty', { title: 'Noty - register' });
    });

    app.post('/init/mongo', function (req, res) {
        var arg = {
            hostname: 'localhost',
            port: '27017',
            username: '',
            password: '',
            database: 'b3log-noty'
        };

        Option.initMongo(arg);

        res.send('inited mongo');
    });

    app.post('/init/noty', function (req, res) {
        var arg = {
            userName: req.param('userName'),
            email: req.param('email'),
            password: req.param('password'),
            title: req.param('title'),
            subTitle: req.param('subTitle')
        };

        Option.initNoty(arg);

        res.send('inited noty');
    });

    app.get('/init/ag', function (req, res) {
       Option.initAg();
    });
};
