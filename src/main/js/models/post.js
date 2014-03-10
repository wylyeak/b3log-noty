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
 * @file 文章/导航模型。
 * @author Liang Ding <DL88250@gmail.com>
 * @version 1.0.0.2, Feb 28, 2014
 * @since 1.0.0
 */

"use strict";

var mongoose = require('mongoose');
var noty = require('../noty');
var logger = noty('logger');
var Schema = mongoose.Schema;
var Tag = require('./tag');

/**
 * 文章/导航结构。
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
     * 标签 Ids。
     */
    tagIds: [
        {type: Schema.ObjectId, ref: 'Tag'}
    ],
    /**
     * 作者 Id。
     */
    authorId: {type: Schema.ObjectId, ref: 'User'},
    /**
     * 浏览计数。
     */
    viewCount: {type: Number, default: 0},
    /**
     * 内容。
     */
    content: {type: String, required: true},
    /**
     * 固定链接。
     */
    permalink: {type: String, default: Date.now, required: true},
    /**
     * 是否置顶。
     */
    stickied: {type: Boolean, default: false},
    /**
     * 签名档 Id。
     */
    signId: {type: Schema.ObjectId, ref: "Option"},
    /**
     * 是否可以评论。
     */
    commentable: {type: Boolean, default: true},
    /**
     * 密码，留空则表示不需要密码。
     */
    password: {type: String},
    /**
     * 类型，A：文章（Article），N：导航（Navigation）。
     */
    type: {type: String, enum: 'A N'.split(' '), default: 'A'},
    /**
     * 创建时间。
     */
    created: {type: Date, default: Date.now},
    /**
     * 更新时间。
     */
    updated: {type: Date, default: Date.now}
});

/**
 * 在赋值虚拟属性 tags 时关联 tagIds，
 */
postSchema.virtual('tags').set(function (tags) {
    for (var key in tags) {
        this.tagIds.push(tags[key]);
    }

    this.tagRefs = tags;
});

/**
 * 发布文章。
 */
postSchema.methods.publish = function () {
    logger.log('debug', 'Publishing post [title=%s, id=%s]', this.title, this.id);

    switch (this.type) {
        case 'A':
            publishArticle(this);

            break;
        case 'N':
            // TODO: 导航发布
            break;
        default:
            throw new Error('Unsupported post type [' + this.type + ']');
    }

    logger.log('debug', 'Published post [title=%s, id=%s]', this.title, this.id);
};

/**
 * 发布文章。
 *
 * @param articleEntity
 */
function publishArticle(articleEntity) {
    // 生成文章固定链接
    genPostPermalink(articleEntity);

    var tagRefs = articleEntity.tagRefs;

    articleEntity.save(function (err) {
        if (err) {
            throw err;
        }

        for (var key in tagRefs) {
            var tag = tagRefs[key];

            tag.save(); // 创建一个标签（在 Tag.pre() 中处理重复判断）
        }
    });
}

/**
 * 生成文章固定链接。
 */
// TODO: 用户自定义生成规则
function genPostPermalink(post) {
    post.permalink = post.id;
}

// 导出文章模型
var Post = mongoose.model('Post', postSchema);
module.exports = Post;
