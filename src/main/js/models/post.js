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
 * @file 文章模型。
 * @author Liang Ding <DL88250@gmail.com>
 * @version 1.0.0.1, Feb 19, 2014
 * @since 1.0.0
 */

"use strict";

var mongoose = require('mongoose');
var noty = require('../noty');

var Schema = mongoose.Schema;

/**
 * 文章结构。
  */
var postSchema = new Schema({
    /**
     * 标题。
     */
    title: {type: String, required: [true, noty('i18n').__('invalidFormat')]},
    /**
     * 摘要。
     */
    abstract: {type: String},
    /**
     * 作者 Id。
     */
    authorId: {type: Schema.ObjectId, ref: 'User'},
    /**
     * 浏览计数。
     */
    viewCount: {type: Number},
    /**
     * 固定链接。
     */
    permalink: {type: String},
    /**
     * 是否置顶。
     */
    stickied: {type: Boolean},
    /**
     * 签名档 Id。
     */
    signId: {type: Schema.ObjectId, ref: "Option"},
    /**
     * 是否可以评论。
     */
    commentable: {type: Boolean},
    /**
     * 创建时间。
     */
    created: {type: Date},
    /**
     * 更新时间。
     */
    updated: {type: Date}
});

// 导出文章模型
var Post = mongoose.model('Post', postSchema);
module.exports = Post;
