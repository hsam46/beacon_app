// Becon 資料表
module.exports = {
    //基礎資料
    BeaconBase: function (obj) {
        return {
            // _id: obj.id,
            type: CODE.OBJECT_BEACON,
            address: obj.address,
            name: obj.localName || 'none',
            serial: 0,
            rssi: obj.rssi,
            distance: calculateDistance(obj.rssi),
            isUse: 0,
            isExpired: 0,
            updateTime: Date.now()
        }
    },
    //資料更新
    BeaconUpdate: function (obj) {
        return {
            name: obj.localName || 'none',
            rssi: obj.rssi,
            distance: calculateDistance(obj.rssi),
            updateTime: Date.now()
        }
    }
};

// 計算 Beacon 距離
function calculateDistance(rssi) {

    var txPower = -59; //hard coded power value. Usually ranges between -59 to -65

    if (rssi == 0) {
        return -1.0;
    }

    var ratio = rssi * 1.0 / txPower;
    if (ratio < 1.0)
        return Math.round(Math.pow(ratio, 10) * 100) / 100;
    else
        return Math.round(((0.89976) * Math.pow(ratio, 7.7095) + 0.111) * 100) / 100;

}