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
 * @file 用户参数配置。
 *
 * <ul>
 *     <li>更新偏好设定：/prefs?key=xxx&value=xxx, PUT</li>
 * </ul>
 *
 * @author Steven Yao<wmainlove@gmail.com>
 * @author Liang Ding <DL88250@gmail.com>
 * @version 1.0.0.1, Mar 7, 2014
 * @since 1.0.0
 */

"use strict";

var noty = require('../noty');
var logger = noty('logger');
var Option = require('../models/option');

module.exports.controller = function (app) {

    app.get('/prefs', function (req, res) {
        Option.update({category: 'prefs', key: req.query.key}, {value: req.query.value}, function () {
            res.send(true);
        });
    });
};
