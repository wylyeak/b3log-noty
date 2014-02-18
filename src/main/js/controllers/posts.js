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
            title: ''
        });

        post.save(function (err) {
            if (err) {
                console.error('保存失败 [' + err.errors.title.message + ']');
            } else {
                console.log('保存成功');
            }
        });

        var post1 = new Post({
            title: 'Test 标题'
        });

        post1.save(
            function (err) {
                if (err) {
                    console.error(err.errors.title.message);
                } else {
                    console.log('保存成功');
                }
            }
        );

        res.send('post');
    });
};
