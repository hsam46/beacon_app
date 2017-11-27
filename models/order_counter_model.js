// 點餐資料
module.exports = {
    // 訂單基礎
    OrderBase: function () {
        return {
            type: CODE.OBJECT_ORDER_COUNTER,
            count: 0
        }
    },
    IncrementCount: function() {
        return {
            count: 1
        }
    }
};
