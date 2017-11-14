var beaconDataController = require('./beacon_data_controller');
var timer;

module.exports = {
  // 啟動資料廣播
  init: function() {
      timer = setInterval(broadcast, 1000);
  }
};

function broadcast() {
    beaconDataController.getBeaconDatLList(function(err, beaconList) {
        SocketIO.emitBroadcast(CODE.SERVER_CLIENT_DATA_BEACONS, {beaconList: beaconList});
    });
}