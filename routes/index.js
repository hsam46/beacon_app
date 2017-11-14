var CODE = require('../config/code');
var express = require('express');
var router = express.Router();

//取得 Socket 通訊事件 Code
router.get('/javascripts/code.js', function (req, res) {
    res.send('var CODE = ' + JSON.stringify(CODE));
});

/* GET home page. */
router.get('/', function (req, res, next) {
    var data = {
        title: 'Mostbugs',
        baseUrl: LocalAddress + ':' + Config.PORT
    };

    res.render('index', data);
});

module.exports = router;
