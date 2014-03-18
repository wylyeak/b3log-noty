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
 * @file 后台
 * @author <a href="mailto:LLY219@gmail.com">Liyuan Li</a>
 * @version 1.0.0.1, Mar 10, 2014
 * @since 1.0.0
 */
"use strict";

(function () {
    $("#settings input").blur(function () {
        var $it = $(this);

        $.ajax({
            url: '/console/setting?cat=prefs&key=' + $it.attr('name') + '&value=' + $it.val(),
            type: 'PUT',
            success: function () {
                var $tip = $it.next();
                $tip.show();
                $tip.animate({
                    "opacity": 1
                });
                setTimeout(function () {
                    $tip.animate({
                        "opacity": 0
                    }, function () {
                        $tip.hide();
                    });
                }, 2000);
            }
        });
    });

    $("#settings .tip").click(function () {
        var $tip = $(this);
        $tip.animate({
            "opacity": 0
        }, function () {
            $tip.hide();
        });
    });
})();