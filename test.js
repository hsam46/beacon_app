// const BeaconScanner = require('node-beacon-scanner');
// const scanner = new BeaconScanner();
//
// // Set an Event handler for becons
// scanner.onadvertisement = function(ad) {
//     console.log(JSON.stringify(ad, null, '  '));
// };
//
// // Start scanning
// scanner.startScan().then(function() {
//     console.log('Started to scan.')  ;
// }).catch(function() {
//     console.error(error);
// });

// var noble = require('noble');
//
//
// noble.on('stateChange', function(state) {
//
//     if(state === 'powerOn') {
//         noble.startScanning([], false);
//     } else {
//         noble.stopScanning();
//         noble.startScanning([], false);
//     }
// });
//
// noble.on("discover", function(peripheral) {
//
//     var macAddress = peripheral.uuid;
//     var rss = peripheral.rssi;
//     var localName = peripheral.advertisement.localName;
//     console.log('found device: ', macAddress, ' ', localName, ' ', rss);
// });

const beaconDiscover = require('./controllers/beacon_discover_controller');

beaconDiscover.startDiscoverBeacons();