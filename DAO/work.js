/**
 * Created by mooner00 on 8/19/2016.
 */

var db = require('./../comm/database');

var data = {
    tableName: 'work_info',
    wid: {name: 'wid', key: 'w_id', type: 'int', value: 2333},
    eid: {name: 'eid', key: 'e_id', type: 'int', value: 2333},
    des: {name: 'description', key: 'description', type: 'text', value: 'def des'},
    sTime: {name: 'Start Time', key: 'start_time', type: 'date', value: '2000-01-01'},
    eTime: {name: 'End Time', key: 'end_time', type: 'date', value: '2001-01-01'},
    type: {name: 'type', key: 'type', type: 'text', value: 'def type'},
    title: {name: 'title', key: 'title', type: 'text', value: 'def title'},
    location: {name: 'location', key: 'location', type: 'text', value: 'def location'},
}

var sample = {
    wid: 233,
    eid: 233,
    des: 'def des',
    sTime: '2000-01-01',
    eTime: '2001-01-01',
    type: 'def type',
    title: 'def title',
    location: 'def location'
}

var sql = {
    selectAllWork: {name: "selectAllWork", text: "SELECT * FROM work_info WHERE delete_flag = false"},
    selectWorkById: {name: "selectWorkById", text: "SELECT * FROM work_info where w_id = $1 AND delete_flag = false", values: [1]},
    selectWorkByEId: {name: "selectWorkByEId", text: "SELECT * FROM work_info where e_id = $1 AND delete_flag = false", values: [1]},
    selectLastWork: {name: 'selectLastWork',text :"SELECT * FROM work_info AND delete_flag = false ORDER BY w_id DESC LIMIT 1"},
    deleteWorkById: {name: "deleteWorkById", text: "DELETE FROM work_info WHERE w_id = $1", values: [1]},
    deleteWorkByEId: {name: "deleteWorkByEId", text: "DELETE FROM work_info WHERE e_id = $1", values: [1]},

    insertWork: {
        name: 'insertWork', text: "INSERT INTO work_info (" +
        "e_id," +
        "description," +
        "w_start_time," +
        "w_end_time," +
        "type," +
        "title," +
        "location" +
        ") VALUES ($1, $2, $3, $4, $5,$6,$7)",
        values: [1, "some description", '2000-01-01', '2000-01-01', "java", "java programmer", "oversea"]
    },
    updateWorkById: {
        name: "updateWorkById",text:"UPDATE work_info SET e_id = $1, description = $2, w_start_time = $3, w_end_time = $4, type = $5, title = $6," +
        "location = $7 where w_id= $8"
        ,values: [1, "some description", '2000-01-01', '2000-01-01', "java", "java programmer", "oversea",1]
    },

    updateWorkByEId: {
        name: "updateWorkByEId",text:"UPDATE work_info SET description = $1, w_start_time = $2, w_end_time = $3, type = $4, title = $5," +
        "location = $6 where w_id= $7"
        ,values: [ "some description", '2000-01-01', '2000-01-01', "java", "java programmer", "oversea",1]
    },

    deleteFlagWorkById :{name:"deleteFlagWorkById", text :"UPDATE work_info SET delete_flag = true where w_id = $1", values :[0]},
    undoDeleteWorkById :{name:"undoDeleteWorkById",text:"UPDATE work_info SET delete_flag = false where w_id = $1",values:[0]},
    deleteFlagWorkByEId: {name:"deleteFlagWorkByEId",text:"UPDATE work_info SET delete_flag = true WHERE e_id = $1",value:[1]},
}

exports.deleteFlagById = function (id,callback){
    return db.queryPresValue(sql["deleteFlagWorkById"].text,[id],function(e,o){callback(e,o)})
}
exports.deleteFlagByEId = function(id,callback){
    return db.queryPresValue(sql["deleteFlagWorkByEId"].text,[id],function(e,o){callback(e,o)})
}

exports.undoDeleteById = function(id,callback){
    return db.queryPresValue(sql["undoDeleteWorkById"].text,[id],function(e,o){callback(e,o)});
}
//

exports.selectAll = function (callback) {
    return db.queryPres(sql['selectAllWork'], function (e, o) {
        callback(e, o)
    })
}

exports.selectLast = function (callback){
    return db.queryPres(sql['selectLastWork'],function(e,o){callback(e,o)});
}

exports.selectElementById = function (id, callback) {
    return db.queryPresValue(sql['selectWorkById'], [id], function (e, o) {
        callback(e, o)
    })
}

exports.selectElementByEId = function(id, callback){
    return db.queryPresValue(sql['selectWorkByEId'],[id],function(e,o){
        callback(e,o);
    })
}

exports.deleteElementById = function (id, callback) {
    sql['deleteWorkById'].values = [id];
    return db.queryPres(sql['deleteWorkById'], function (e, o) {
        callback(e, o)
    });
}

exports.deleteElementByEId = function (eid, callback) {
    sql['deleteWorkByEId'].values = [eid];
    return db.queryPres(sql['deleteWorkByEId'], function (e, o) {
        callback(e, o)
    });
}

exports.insertElement = function (data, callback) {
    sql['insertWork'].values = [ data.eid, data.des,data.sTime,data.eTime,data.type,data.title,data.location];
    return db.queryPres(sql['insertWork'], function (e, o) {
        callback(e, o)
    });
}

exports.updateElementById = function (id, data, callback) {
    sql['updateWorkById'].values = [ data.eid, data.des,data.sTime,data.eTime,data.type,data.title,data.location, id];
    return db.queryPres(sql['updateWorkById'], function (e, o) {
        callback(e, o)
    });
}

exports.updateElementByEId = function (id, data, callback) {
    sql['updateWorkByEId'].values = [ data.des,data.sTime,data.eTime,data.type,data.title,data.location, id];
    return db.queryPres(sql['updateWorkByEId'], function (e, o) {
        callback(e, o)
    });
}






