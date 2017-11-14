var beaconDataController = require('./beacon_data_controller');
var helper = {};

module.exports = {

    handle: function(receive, socket) {

    if (helper[receive.code] !== undefined)
        helper[receive.code](receive.data);
    }
};


helper[CODE.CLIENT_SERVER_SET_BEACON_ACTIVE] = function (data) {
    beaconDataController.setBeaconItemUseStateByAddress(data.address || 0, 1);
};

helper[CODE.CLIENT_SERVER_SET_BEACON_INACTIVE] = function (data) {
    beaconDataController.setBeaconItemUseStateByAddress(data.address || 0, 0);
};

helper[CODE.CLIENT_SERVER_SET_BEACON_DELETE] = function (data) {
    beaconDataController.delBeaconItemByAddress(data.address);
};