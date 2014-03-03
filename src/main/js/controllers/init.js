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
 *     <li>展现初始化页面：/init, GET</li>
 *     <li>初始化：/init, POST</li>
 * </ul>
 *
 * @author Liyuan Li <http://vanessa.b3log.org>
 * @author Liang Ding <DL88250@gmail.com>
 * @version 1.0.0.1, Mar 3, 2014
 * @since 1.0.0
 */

"use strict";

var Option = require('../models/option');

module.exports.controller = function (app) {

    app.get('/init', function (req, res) {
        res.render('init', { title: 'Noty - register' });
    });

    app.get('/initOpt', function (req, res) {
        var args = {
            userName: 'test user'
        };

        Option.initialize(args);

        res.send('inited');
    });
};
