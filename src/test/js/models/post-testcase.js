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
 * @file 文章模型测试用例。
 * @author Liang Ding <DL88250@gmail.com>
 * @version 1.0.0.1, Feb 19, 2014
 * @since 1.0.0
 */

"use strict";

var assert = require('assert');
var Post = require('../../../main/js/models/post');

describe('Post', function () {
        describe('#save', function () {
            it('ok', function () {
                var post = new Post({
                    title: '测试文章标题'
                });

                post.save(function (err) {
                    if (err) {
                        console.error(err);
                    }
                });
            });
        })

        describe('#find', function () {
            it('>= 0', function () {
                Post.find().where('title').regex(/试文/i).exec(function (err, posts) {
                    assert(0 < posts.length);
                });
            })
        })

        describe('#update', function () {
            it('ok', function () {
                Post.update({title: /.+/i}, {title: '测试更新'}, function (err, numberAffected, raw) {
                    if (err) {
                        console.error(err);
                    }
                })
            })
        })

        describe('#find', function () {
            it('find updated', function () {
                Post.find().where('title').equals('测试更新').exec(function (err, posts) {
                    assert(0 < posts.length);
                });
            })
        })

        describe('#remove', function () {
            it('remove all', function () {
                Post.remove(function (err) {
                    if (err) {
                        console.error(err);
                    }
                });
            })
        })

        describe('#find', function () {
            it('should empty', function () {
                Post.find().exec(function (err, posts) {
                    assert(0 === posts.length);
                })
            })
        })
    }
)

