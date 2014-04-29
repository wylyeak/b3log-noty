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
 * @version 1.1.0.2, Apr 29, 2014
 * @since 1.0.0
 */

"use strict";

var fs = require('fs');
var http = require('http');
var path = require('path');
var express = require('express');
var I18n = require('i18n-2');
var noty = require('./noty');
var logger = noty('logger');
var conf = noty('conf');
var util = noty('_');

var app = express();

// 环境准备
// 国际化配置
var i18nConf = {
    directory: path.join(__dirname, conf.i18n.directory),
    extension: conf.i18n.extension,
    locales: conf.i18n.locales
};
I18n.expressBind(app, i18nConf); // 国际化工具绑定请求

app.set('port', 8080);
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');

// 请求链
app.use(require('static-favicon')(__dirname + '/../public/static/images/favicon.ico'));
app.use(require('body-parser')());
app.use(require('cookie-parser')());
app.use(require('express-session')({ secret: 'noty console', cookie: { maxAge: 60000 }}));
app.use(function (req, res, next) {
    if (req.path.indexOf('/static') > -1) { // 如果请求静态资源
        // 则直接交给 Express 处理
        next();

        return;
    }

    // logger.log('debug', 'Request [URL=%s, method=%s]', req.url, req.method);

    switch (util.getInited()) {
        case 2: // 整个初始化过程已经完毕
            next(); // 推进请求处理

            break;
        case 1: // 完成初始化数据库（步骤 1）
            if ('/init/noty' === req.path) {
                next();

                break;
            }

            res.redirect('/init/noty'); // 重定向到初始化应用（步骤 2）

            break;
        case 0: // 这两种情况都是还未初始化数据库
        case -1:
            if ('/init/mongo' === req.path) {
                next();

                break;
            }

            res.redirect('/init/mongo');

            break;
    }


});
app.use(express.static(path.join(__dirname, '../public')));

// 开发环境
if ('development' == app.get('env')) {
    app.use(function errorHandler(err, req, res, next) {
            res.status(500);
            res.render('error', { error: err });
        }
    );

    app.get('/dev/reset', function (req, res) {
        var Option = require('./models/option');

        Option.initAg();

        res.redirect('/');
    });


}

// 生产环境
if ('production' == app.get('env')) {

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
    logger.log('info', 'Noty lisstening on port [%s]', app.get('port'));
});
