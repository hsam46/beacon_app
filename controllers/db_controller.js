var Database = require('nedb')
    , db = new Database();

var dbHelper = {
    //新增資料
    insert: function (data, cb) {
        db.insert(data, function (err, res) {
            return cb && cb(err, res);
        });
    },
    //更新部分欄位
    update: function (query, data, cb) {
        db.update(query, {$set: data}, {}, function (err, replaceNum) {
            return cb && cb(err, replaceNum);
        });
    },
    //如果沒有結果自動插入
    upsert: function (query, data, cb) {
        db.update(query, data, {upsert: true}, function (err, replaceNum) {
            return cb && cb(err, replaceNum);
        });
    },
    //搜尋
    find: function (query, cb) {
        db.find(query, function (err, res) {
            return (res.length > 0) && cb && cb(err, res);
        })
    },
    //搜尋單項
    findOne: function (query, cb) {
        db.findOne(query, function (err, res) {
            return res && cb && cb(err, res);
        });
    },
    //計算個數
    count: function (query, cb) {
        db.count(query, function (err, count) {
            return cb && cb(err, count);
        });
    },
    //存在與否
    countIf: function (query, cb) {
        db.count(query, function (err, count) {
            return cb && (count > 0) ? cb(err, true) : cb(err, false);
        });
    },
    //刪除
    remove: function (query, cb) {
        db.remove(query, {}, function (err, res) {
            return cb && cb(err, res);
        })
    }
};

module.exports = dbHelper;

/*
// Test Code
// ======================
var a = 5;
qq();

function qq() {

    db.update({planet: 'Pluton'}, {$set: {distance: a}}, {upsert: true}, function (err, rp, d) {
        // A new document { _id: 'id5', planet: 'Pluton', distance: 38 } has been added to the collection
        console.log(a, err, rp, d);
        a--;
        if (a > 0)
            qq();
        else
            db.find({planet: 'Pluton'}, function (err, res) {
                console.log(err, res);
            })
    });
}
// ======================
*/

