var dbController = require('./db_controller');
var BeaconModel = require('../models/beacon_model');
var OrderCounterModel = require('../models/order_counter_model');

var helper = {
    init: function () {

        dbController.insert(OrderCounterModel.OrderBase());
    },
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

        this.getOrderItemByType(state, function (err, count) {

            dbController.update({address: address}, {isUse: state, serial: count}, function (err, res) {
                return cb && cb(err, res);
            });
        });
    },
    // 移除 Beacon
    delBeaconItemByAddress: function (address, cb) {

        dbController.remove({address: address}, function (err, res) {
            return cb && cb(err, res);
        });
    },
    // 取得序號
    getOrderItemByType: function (state, cb) {

        if(!state)
            return cb && cb(null, 0);

        dbController.incFieldVal({type: CODE.OBJECT_ORDER_COUNTER}, OrderCounterModel.IncrementCount(), function (err, res) {
            return cb && cb(err, res.count);
        });
    }
};

module.exports = helper;