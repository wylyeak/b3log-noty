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
 * @file 标签-文章关联模型。
 * @author Liang Ding <DL88250@gmail.com>
 * @version 1.0.0.0, Feb 20, 2014
 * @since 1.0.0
 */

"use strict";

var mongoose = require('mongoose');
var noty = require('../noty');

var Schema = mongoose.Schema;

/**
 * 标签-文章关联结构。
 */
var tagPostSchema = new Schema({
    /**
     * 标签 Id。
     */
    tagId: {type: Schema.ObjectId, ref: "Tag"},
    /**
     * 文章 Id。
     */
    postId: {type: Schema.ObjectId, ref: "Post"}
});

// 导出标签-文章关联模型
var TagPost = mongoose.model('TagPost', tagPostSchema);
module.exports = TagPost;
