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
 * @version 1.0.0.0, Feb 17, 2014
 * @since 1.0.0
 */

"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var noty = require('../noty');

var postSchema = new Schema({
    title: {type: String, required: [true, noty("i18n").__('invalidFormat')]}
});

var Post = mongoose.model('Post', postSchema);
module.exports = Post;
