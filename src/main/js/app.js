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
 * @file Noty 主程序入口。
 * @author Liang Ding <DL88250@gmail.com>
 * @version 1.0.0.1, Feb 18, 2014
 * @since 1.0.0
 */

"use strict";

var fs = require('fs');
var http = require('http');
var path = require('path');
var express = require('express');
var i18n = require('i18n-2');
var noty = require('./noty');
var app = express();

// 环境准备
i18n.expressBind(app, noty.conf.i18n);
app.set('port', 8080);
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');

// 请求链
app.use(express.favicon());
app.use(express.json());
app.use(express.urlencoded());
// TODO: app.use(express.cookieParser('your secret here'));
// TODO: app.use(express.session());
app.use(function (req, res, next) {
    noty.logger.log('debug', 'Request [URL=%s, method=%s]', req.url, req.method);

    next();
});
app.use(express.static(path.join(__dirname, '../public')));
app.use(app.router);

// 开发时
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

// 动态添加路由
fs.readdirSync(path.join(__dirname, './controllers')).forEach(function (file) {
    if ('.js' === file.substr(-3)) {
        var route = require('./controllers/' + file);
        route.controller(app);
    }
});

// 启动服务
http.createServer(app).listen(app.get('port'), function () {
    noty.logger.log('info', 'Noty lisstening on port [%s]', app.get('port'));
});
