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
 * @file 标签模型。
 * @author Liang Ding <DL88250@gmail.com>
 * @version 1.1.1.0, Mar 18, 2014
 * @since 1.0.0
 */

"use strict";

var mongoose = require('mongoose');
var noty = require('../noty');
var logger = noty('logger');
var Schema = mongoose.Schema;

/**
 * 标签结构。
 */
var tagSchema = new Schema({
    /**
     * 标签名。
     */
    title: {type: String},
    /**
     * 使用该标签的文章 Ids。
     */
    postIds: [
        {type: Schema.ObjectId, ref: 'Post'}
    ],
    /**
     * 创建时间。
     */
    created: {type: Date, default: Date.now}
});

/**
 * 在赋值虚拟属性 posts 时关联 postIds，
 */
tagSchema.virtual('posts').set(function (posts) {
    for (var key in posts) {
        var post = posts[key];
        if (!containsPost(this, post)) {
            this.postIds.push(post);
        }
    }
});

var Tag = mongoose.model('Tag', tagSchema);

/**
 * 在保存前判断是否已经存在，如果已经存在则忽略保存。
 */
tagSchema.pre('save', function (next) {
    Tag.find().where('title').equals(this.title).exec(function (err, tags) {
        if (!tags || 0 >= tags.length) { // 不存在的话继续推进保存
            next();
        } else { // 存在的话更新文章 Ids 引用
            var tag = tags[0];

            tag.update({title: this.title}, {$set: {postIds: this.postIds}}, function (err) {

            });
        }
    });
});

/**
 * 判断指定的 tag 中是否已经关联了指定的 post。
 *
 * @param tag 指定的 tag
 * @param post 指定的 post
 * @returns {boolean}
 */
function containsPost(tag, post) {
    for (var postId in tag.postIds) {
        if (postId === post._id) {
            return true;
        }
    }

    return false;
}

/**
 * 保存后打日志。
 */
tagSchema.post('save', function (next) {
    logger.log('debug', "Created a tag [title=%s]", this.title);
});

// 导出标签模型
module.exports = Tag;
