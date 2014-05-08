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
 * @file 配置模型测试用例。
 * @author Liang Ding <DL88250@gmail.com>
 * @version 1.0.1.1, Apr 30, 2014
 * @since 1.0.0
 */

"use strict";

var assert = require('assert');
var Post = require('../../../main/js/models/post');
var Tag = require('../../../main/js/models/tag');
var Option = require('../../../main/js/models/option');
var User = require('../../../main/js/models/user');
var conf = require('../../resources/noty.json');
var testbase = require('./testbase');

describe('Option 模型测试', function () {
    before(function () {
        testbase.setup();
    })

    after(function () {
        testbase.shutdown();
    })

    /**
     * 基本的配置增删改查测试。
     */
    describe('基础 CRUD', function () {

        describe('#save', function () {
            it('ok', function () {
                var option = new Option({
                    category: 'prefs',
                    key: 'title',
                    value: '测试标题'
                });

                option.save(function (err) {
                    if (err) {
                        console.error(err);
                    }
                });
            });
        })

        describe('#find', function () {
            it('>= 0', function () {
                Option.find().where('category', 'prefs').where('key', 'title').exec(function (err, options) {
                    assert(0 < options.length);
                });
            })
        })

        describe('#update', function () {
            it('ok', function () {
                Option.update({category: 'prefs', key: 'title'}, {value: '更新后的标题'}, function () {
                });
            })
        })

        describe('#find', function () {
            it('find updated', function () {
                Option.find().where('category', 'prefs').where('key', 'title').exec(function (err, options) {
                    assert(0 < options.length);
                    assert('更新后的标题' === options[0].value);
                });
            })
        })

        describe('#remove', function () {
            it('remove all', function () {
                Option.remove(function (err) {
                    if (err) {
                        console.error(err);
                    }
                });
            })
        })

        describe('#find', function () {
            it('should empty', function () {
                Option.find().exec(function (err, options) {
                    assert(0 === options.length);
                })
            })
        })
    })

    /**
     * 配置模型静态方法测试。
     */
    describe('静态操作', function () {
        after(function () {
            Option.initAg();
        })

        describe('#initMongo', function () {
            it('ok', function () {
                Option.initMongo({
                    username: conf.mongo.username,
                    password: conf.mongo.password,
                    hostname: conf.mongo.hostname,
                    port: conf.mongo.port,
                    database: conf.mongo.database
                }, function () {
                });
            });
        });

        /*
        describe('#initNoty', function () {
            it('ok', function () {
                Option.initNoty({
                    title: "测试标题",
                    subTitle: "测试子标题",
                    userName: "88250",
                    email: "DL88250@gmail.com",
                    password: "test"
                }, function () {
                });
            });
        })
        */
    })
})
