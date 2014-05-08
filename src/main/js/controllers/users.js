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
 * @file 用户相关处理。
 *
 * <ul>
 *     <li>展现用户列表：/users, GET</li>
 * </ul>
 *
 * @author Liang Ding <DL88250@gmail.com>
 * @version 1.0.0.0, Feb 14, 2014
 * @since 1.0.0
 */

"use strict";

var Auth = require('../models/auth');
var noty = require('../noty');
var i18n = noty('i18n');
var logger = noty('logger');

module.exports.controller = function (app) {

    app.get('/users', function (req, res) {
        res.send('test');
    });

    app.get('/login', function (req, res) {
        res.render('login', {
            title: i18n.__('login') + ' - Noty'
        });
    });

    app.post('/login', function (req, res) {
        Auth.login(req, res, function (err, user) {
            var sc = err || null !== user;
            var ret = {"sc": sc};
            if (!sc) {
                ret.msg = i18n.__('loginErr');
            } else { // 登录成功，设置会话
                req.session.user = user;
            }

            res.send(ret);
        });
    });
};
