var pg = require('pg');
var appConfig = require('./../config/appConfig');

pg.defaults.ssl = true;

var dbConfig = appConfig.database;

var pool = new pg.Pool(dbConfig);

module.exports.query = function (text, value, callback) {
    return pool.query(text, value, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(null, result);
        }
    })
}

module.exports.queryPres= function (preStm, callback) {
    return pool.query(preStm, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(null, result);
        }
    })
}

module.exports.queryPresValue = function(preStm,value,callback){
    return pool.query(preStm, value,function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(null, result);
        }
    })
}






