/**
 * Created by User on 2017/9/30.
 */
app
    .controller('tableService', function ($scope, $rootScope, initFactory, socketFactory, connectFactory) {

        // 啟用
        $scope.activeBeacon = function (beaconItem) {

            var send = {
                address: beaconItem.address
            };

            socketFactory.emit(CODE.CLIENT_SERVER_SET_BEACON_ACTIVE, send);

        };

        // 停用
        $scope.inactiveBeacon = function (beaconItem) {

            var send = {
                address: beaconItem.address
            };

            socketFactory.emit(CODE.CLIENT_SERVER_SET_BEACON_INACTIVE, send);
        };

        // 刪除
        $scope.deleteBeacon = function(beaconItem) {

            var send = {
                address: beaconItem.address
            };

            socketFactory.emit(CODE.CLIENT_SERVER_SET_BEACON_DELETE, send);
        };

        // 篩選
        $scope.filterItem = function(arg) {
            $rootScope.init.filterOption = arg;

            $rootScope.beaconListFilter = $rootScope.beaconList.filter(function (beaconItem) {
                return (beaconItem.isUse === $rootScope.init.filterOption || $rootScope.init.filterOption === -1)
            });
        };

        // 顏色標示
        $scope.getBeaconInfoColor = function (distance, updateTime) {

            if (Date.now() - updateTime >= 10000)
                return 'active';

            if (distance <= 2.5)
                return 'info';
        };

        //啟用顏色標示
        $scope.getActiveStateStyle = function(state) {
          if(state)
              return 'highlightext';
        };
    });