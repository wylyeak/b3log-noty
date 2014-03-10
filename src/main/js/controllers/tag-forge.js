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
 * @file    后台标签处理。
 *
 * <ul>
 *     <li>展现后台标签：/tag-forge, GET</li>
 * </ul>
 *
 * @author <a href="http://vanessa.b3log.org">Liyuan Li</a>
 * @version 1.0.0.0, Mar 10, 2014
 * @since 1.0.0
 */

"use strict";
var noty = require('../noty');
var i18n = noty('i18n');

module.exports.controller = function (app) {

    app.get('/console', function (req, res) {
        res.render('console/index', { title: i18n.__('tagForge') + ' - Noty'});
    });

    app.get('/console/tag-forge', function (req, res) {
        res.render('console/tag-forge', { title: i18n.__('tagForge') + ' - Noty'});
    });
};
