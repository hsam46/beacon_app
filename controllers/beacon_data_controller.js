var dbController = require('./db_controller');
var BeaconModel = require('../models/beacon_model');

var helper = {
    //更新 beacon 資料
    updateBeaconData: function (data) {

        var query = {
            address: data.address
        };

        dbController.countIf(query, function (err, isExist) {

            if (isExist)
                dbController.update(query, BeaconModel.BeaconUpdate(data));
            else
                dbController.insert(BeaconModel.BeaconBase(data));
        });
    },
    // 取得所有 Beacon 資料
    getBeaconDatLList: function (cb) {

        dbController.find({type: CODE.OBJECT_BEACON}, function (err, beaconList) {
            return cb && cb(err, beaconList);
        });
    },
    // 取得 Beacon 項目
    getBeaconItemByAddress: function (address, cb) {

        dbController.findOne({address: address}, function (err, beaconItem) {
            return cb && cb(err, beaconItem);
        });
    },
    // 設定 Beacon 使用狀態
    setBeaconItemUseStateByAddress: function (address, state, cb) {

        dbController.update({address: address}, {isUse: state}, function (err, res) {
            return cb && cb(err, res);
        });
    },
    // 移除 Beacon
    delBeaconItemByAddress: function(address, cb) {

        dbController.remove({address: address}, function(err, res) {
           return cb && cb(err, res);
        });
    }
};

module.exports = helper;