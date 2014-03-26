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
 * @file 发布（文章/导航）相关处理。
 *
 * <ul>
 *     <li>展现新建文章页面：/console/article/new</li>
 *     <li>新建文章：/console/article, PUT</li>
 * </ul>
 *
 * @author Liang Ding <DL88250@gmail.com>
 * @version 1.2.1.2, Mar 26, 2014
 * @since 1.0.0
 */

"use strict";

var Post = require('../models/post');
var Tag = require('../models/tag');
var noty = require('../noty');
var i18n = noty('i18n');
var str = noty('_').str;
var Auth = require('../models/auth');

module.exports.controller = function (app) {

    app.get('/console/article/new', Auth.checkLogin, function (req, res) {
        res.render('console/new-article', {
            title: i18n.__('newArticle') + ' - Noty',
            consoleType: "new-article"
        });
    });

    /**
     * 新建文章，请求参数：
     *
     * {
     *     title: "",
     *     abstract: "",
     *     content: "",
     *     tags: ""
     * }
     */
    app.put('/console/article', function (req, res) {
        var title = req.param('title');
        var abstract = req.param('abstract');
        var content = req.param('content');
        var tagsStr = req.param('tags');

        var tagStrs = tagsStr.split(',');
        var tags = [];

        for (var tagStr in tagStrs) {
            tagStr = tagStr.trim();

            if (!str(tagStr).isBlank()) {
                tags.push(new Tag({title: tagStr}));
            }
        }

        new Post({
            title: title,
            abstract: abstract,
            authorId: '0',
            content: content,
            tags: tags
        }).publish();
    });
};
