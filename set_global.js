module.exports = {
    init: function () {
        global.CODE = require('./config/code');
        global.Config = require('./config/config');
        global.SocketIO = require('./socketio');
        global.LocalAddress = require('ip').address();
    }
};