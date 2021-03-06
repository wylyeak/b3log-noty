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
 * @file 评论模型。
 * @author Liang Ding <DL88250@gmail.com>
 * @version 1.1.0.0, Mar 26, 2014
 * @since 1.0.0
 */

"use strict";

var mongoose = require('mongoose');
var noty = require('../noty');

var Schema = mongoose.Schema;

/**
 * 评论结构。
 */
var commentSchema = new Schema({
    /**
     * 评论内容。
     */
    content: {type: String},
    /**
     * 评论人名。
     */
    name: {type: String},
    /**
     * 评论人邮箱。
     */
    email: {type: String, set: toLower},
    /**
     * 评论文章/导航 Id。
     */
    postId: {type: Schema.ObjectId, ref: "Post"},
    /**
     * 回复评论的 Id。
     */
    replyId: {type: Schema.ObjectId, ref: "Comment"},
    /**
     * 书签地址。
     */
    sharpURL: {type: String},
    /**
     * 创建时间。
     */
    created: {type: Date, default: Date.now}
});

function toLower(v) {
    return v.toLowerCase();
}

// 导出评论模型
var Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
