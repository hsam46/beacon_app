var BeaconScanner = require('node-beacon-scanner');
var scanner = new BeaconScanner();
var beaconDataController = require('./beacon_data_controller');

module.exports = {
    //啟動掃描 beacons
    startDiscoverBeacons: function () {

        // Start scanning
        scanner.startScan().then(function () {
            console.log('Started to scan.');
        }).catch(function () {
            console.error(error);
        });
    },
    //停止掃描 beacons
    stopDiscoverBeacons: function () {

        // Stop scanning
        scanner.stopScan().then(function () {
            console.log('Stopped to scan.');
        }).catch(function () {
            console.error(error);
        });
    }
};

// Set an Event handler for becons
scanner.onadvertisement = function (ad) {
    // console.log(JSON.stringify(ad, null, '  '));
    // SocketIO.emitBroadcast(CODE.SERVER_CLIENT_DATA_BEACONS, ad)
    beaconDataController.updateBeaconData(ad);
};