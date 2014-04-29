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
 * @file 权限模型。
 * @author Liang Ding <DL88250@gmail.com>
 * @version 1.0.0.1, Apr 22, 2014
 * @since 1.0.0
 */

"use strict";

var noty = require('../noty');
var User = require('./user');
var logger = noty('logger');

var Auth = {
    login: function (req, res, callback) {
        var userNemeOrEmail = req.param('userNameOrEmail');
        var passwordHash = req.param('passwordHash');

        // TODO: 登录

        callback({
            succ: true,
            msg: ''
        });
    },

    checkLogin: function (req, res, next) {
        next();

        return;

        // TODO: 权限验证
        /*
         if (!req.session.user_id) {
         res.redirect('/login');
         } else {
         next();
         }
         */
    }
};

module.exports = Auth;
