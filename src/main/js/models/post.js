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
    //title: {type: String, required: [true, noty.i18n.__('invalidUserName')]}
    title: String
});

var Post = mongoose.model('Post', postSchema);
module.exports = Post;

