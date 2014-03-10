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
 *     <li>展现参数配置：/console/settings，GET</li>
 *     <li>更新参数配置：/console/setting?cat=xxx&key=xxx&value=xxx, PUT</li>
 * </ul>
 *
 * @author Steven Yao<wmainlove@gmail.com>
 * @author Liang Ding <DL88250@gmail.com>
 * @version 1.0.0.2, Mar 10, 2014
 * @since 1.0.0
 */

"use strict";

var noty = require('../noty');
var i18n = noty('i18n');
var logger = noty('logger');
var Option = require('../models/option');

module.exports.controller = function (app) {

    app.get('/console/settings', function (req, res){
        res.render('console/settings', { title: 'Noty - ' + i18n.__('settings') });

        return;
    });

    app.put('/console/setting', function (req, res) {
        Option.update({category: req.query.cat, key: req.query.key}, {value: req.query.value}, function () {
            res.send(true);
        });
    });
};
