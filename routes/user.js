var db = require('../db/config').db;

exports.list = function (req, res) {
    //res.send("respond with a resource");
    res.json({ user: 'tobi' });

    res.links({
        next: 'http://api.example.com/users?page=2',
        last: 'http://api.example.com/users?page=5'
    });
};

