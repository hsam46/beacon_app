var io;

module.exports = {

    //初始化
    init: function (server) {

        io = require('socket.io')(server);
        require('./controllers/beacon_discover_controller').startDiscoverBeacons();
        require('./controllers/real_time_broacast_controller').init();

        io.on('connection', function (socket) {
            console.log('Socket 連線成功');

            socket.on(CODE.CLIENT_SERVER_REQUEST, function(receive) {
                require('./controllers/user_action_controller').handle(receive, socket);
            });
        });
    },
    // 發送至單一用戶
    emitUser: function (event, data, id) {

        emit(CODE.SERVER_CLIENT_UPDATE, sendFormat(event, data), id);
    },
    // 發送廣播
    emitBroadcast: function (event, data) {

        emit(CODE.SERVER_CLIENT_UPDATE, sendFormat(event, data));
    }
};
// Socket 發送資料
function emit(event, data, id) {

    if (!io || !event || !data) return;

    if (id)
        io.to(id).emit(event, data);

    if (!id)
        io.emit(event, data);
}

// 發送資料格式轉換
function sendFormat(event, data) {
    return {
        code: event || 0,
        data: data || {}
    }
}

