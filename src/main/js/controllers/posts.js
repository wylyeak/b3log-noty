/**
 * @file 发布相关处理处理。
 *
 * <ul>
 *     <li>发布：/post, POST</li>
 * </ul>
 *
 * @author Liang Ding <DL88250@gmail.com>
 * @version 1.0.0.0, Feb 17, 2014
 * @since 1.0.0
 */

"use strict";

var Post = require('../models/post');

module.exports.controller = function (app) {

    app.get('/post', function (req, res) {
        var post = new Post({
            title: 'Test Title'
        });

        post.save();


        res.send('post');
    });
};
