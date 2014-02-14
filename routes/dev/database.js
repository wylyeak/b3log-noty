
/**
 * @fileoverview 开发时用于数据库的测试。
 * @author Liang Ding <DL88250@gmail.com>
 * @version 1.0.0.0, Feb 14, 2014
 */

var db = require('../../db/config').db;

exports.listDatabases = function (req, res) {
    db.admin.listDatabases(function(err, result){
        if(err) {
            res.send(500, err);
        }

        res.send(result);
    });
};
