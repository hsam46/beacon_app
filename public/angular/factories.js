/**
 * Created by User on 2017/9/30.
 */
app
//資料初始
    .factory('initFactory', function ($rootScope) {

        //初始
        $rootScope.init = {
            filterOption: -1
        };

        //Beacons
        $rootScope.beaconList = [];
        $rootScope.beaconListFilter = [];

        return {
            clearBeacons: function () {

                $rootScope.beaconList.length = 0;
            }
        };
    })

    //連接 Server
    .factory('connectFactory', function ($rootScope, socketFactory, initFactory, localStorageFactory) {

        socketFactory.on('connect', function () {
            console.log('連線成功')
        });

        // 資料接收
        socketFactory.on(CODE.SERVER_CLIENT_UPDATE, function (receive) {

            switch (receive.code) {
                case CODE.SERVER_CLIENT_DATA_BEACONS:

                    $rootScope.beaconList = receive.data.beaconList;

                    $rootScope.beaconListFilter = $rootScope.beaconList.filter(function (beaconItem) {
                        return (beaconItem.isUse === $rootScope.init.filterOption || $rootScope.init.filterOption === -1)
                    });
                    break;
                default:
                    break;
            }
        });

        return {};
    })

    // Local Storage Helper
    .factory('localStorageFactory', function ($rootScope) {

        return {
            create: function (key, value) {

                var val = value || 0;
                if (!localStorage.getItem(key))
                    localStorage.setItem(key, val);
            },
            set: function (key, value) {
                localStorage.setItem(key, value);
            },
            get: function (key) {
                return localStorage.getItem(key);
            }
        }
    })

    // Socket Helper
    .factory('socketFactory', function ($rootScope) {

        var socket = io.connect(baseUrl);

        return {
            on: function (eventName, callback) {

                socket.on(eventName, function () {

                    var args = arguments;

                    $rootScope.$apply(function () {
                        callback.apply(socket, args);
                    })
                })
            },
            emit: function (eventName, data, callback) {

                var send = {
                    code: eventName,
                    data: data
                };

                socket.emit(CODE.CLIENT_SERVER_REQUEST, send, function () {

                    var args = arguments;

                    $rootScope.$apply(function () {
                        if (callback) {
                            callback.apply(socket, args);
                        }
                    })
                });
            }
        }
    });