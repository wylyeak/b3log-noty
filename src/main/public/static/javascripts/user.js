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
 * @file 用户
 * @author <a href="mailto:LLY219@gmail.com">Liyuan Li</a>
 * @version 1.0.0.1, Apr 25, 2014
 * @since 1.0.0
 */
"use strict";

(function () {
    // 登录
    $("button.button.orange").click(function () {
        $.post("login", {
            userNameOrEmail: $("#userNameOrEmail").val().toLowerCase(),
            passwordHash: hex_md5($("#passwordHash").val())
        }, function (data) {
            if (data.sc) {
                window.location.href = "/console";
            } else {
                alert(data.msg);
            }
        });
    });
})();