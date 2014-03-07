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
var noty = require('../noty');
var i18n = noty('i18n');

module.exports.controller = function (app) {

    app.get('/init/mongo', function (req, res) {
        if (Option.isInited()) {
            res.redirect('/');
        }

        res.render('init-mongo', { title: 'Noty - ' + i18n.__('init') + i18n.__('wizard') });
    });

    app.get('/init/noty', function (req, res) {
        res.render('init-noty', { title: 'Noty - ' + i18n.__('init') + i18n.__('wizard') });
    });

    app.post('/init/mongo', function (req, res) {
        var arg = {
            hostname: req.param('hostname'),
            port: req.param('port'),
            username: req.param('username'),
            password: req.param('password'),
            database: req.param('database')
        };

        Option.initMongo(arg, function(result) {
            switch (result) {
                case 'inited':
                case 'succ':
                    res.send(true);

                    break;
                case 'failed':
                    res.send(i18n.__('dbConnErr'));

                    break;
                default :
                    res.send(i18n.__('unknownErr'));
            }
        });
    });

    app.post('/init/noty', function (req, res) {
        var arg = {
            userName: req.param('userName'),
            email: req.param('email'),
            password: req.param('password'),
            title: req.param('title'),
            subTitle: req.param('subTitle')
        };

        var result = Option.initNoty(arg, function(result) {
            switch (result) {
                case 'inited':
                case 'succ':
                    res.send(true);

                    break;
                default:
                    res.send(i18n.__('unknownErr'));
            }
        });
    });
};
