/**
 * Created by mooner00 on 8/22/2016.
 */

var db = require('./../comm/database');
var sql = {
    selectAllVisa: { name: "selectAllVisa", text: "SELECT * FROM visa_info WHERE delete_flag = false" }, //test only
    selectVisaById:{ name: "selectVisaById", text: "SELECT * FROM visa_info where v_id = $1 AND delete_flag = false", values: [1] },
    selectVisaByEId: {name: "selectVisaByEId", text: "SELECT * FROM visa_info where e_id = $1 AND delete_flag = false", values: [1]},
    deleteTable:{ name:"deleteTable", text:"delete from visa_info" },
    deleteVisaById: {name:"deleteVisaById",text:"DELETE FROM visa_info WHERE v_id = $1",value:[1]},
    deleteVisaByEId: {name:"deleteVisaByEId",text:"DELETE FROM visa_info WHERE e_id = $1",value:[1]},

    insertVisa: {
        name: "insertVisa",
        text: "INSERT INTO visa_info (e_id,type,start_time,end_time,status) VALUES ($1, $2, $3, $4, $5)",
        values: [1,"HIB", '2000-01-01','2000-01-01',null]
    },

    updateVisaById: {
        name: "updateVisaById",
        text: "UPDATE visa_info SET (e_id,type,start_time,end_time,status) = ($1, $2, $3, $4, $5) WHERE v_id = $6",
        values: [1,"HIB", '2000-01-01','2000-01-01',null,0]
    },

    updateVisaByEId: {
        name: "updateVisaByEId",
        text: "UPDATE visa_info SET (type,start_time,end_time,status) = ($1, $2, $3, $4) WHERE e_id = $5",
        values: [ "HIB", '2000-01-01','2000-01-01',null,0]
    },

    dropTable: {name:"dropTable", text:"drop table visa_info"},

    createTable :{
        name:"createVisaTable",
        text: "create table visa_info ("+
        "v_id SERIAL primary key not null ,"+
        "e_id int,"+
        "type text,"+
        "start_time DATE,"+
        "end_time DATE,"+
        "status text" +
        ")",
    },

    deleteFlagVisaById :{name:"deleteFlagVisaById", text :"UPDATE visa_info SET delete_flag = true where v_id = $1", values :[0]},
    undoDeleteVisaById :{name:"undoDeleteVisaById",text:"UPDATE visa_info SET delete_flag = false where v_id = $1",values:[0]},
    deleteFlagVisaByEId: {name:"deleteFlagVisaByEId",text:"UPDATE visa_info SET delete_flag = true WHERE e_id = $1",value:[1]},
    undoDeleteVisaByEId :{name:"undoDeleteVisaByEId",text:"UPDATE visa_info SET delete_flag = false where e_id = $1",values:[0]},

}

exports.deleteFlagById = function (id,callback){
    return db.queryPresValue(sql["deleteFlagVisaById"].text,[id],function(e,o){callback(e,o)})
}
exports.deleteFlagByEId = function(id,callback){
    return db.queryPresValue(sql["deleteFlagVisaByEId"].text,[id],function(e,o){callback(e,o)})
}

exports.undoDeleteById = function(id,callback){
    return db.queryPresValue(sql["undoDeleteVisaById"].text,[id],function(e,o){callback(e,o)});
}
exports.undoDeleteByEId = function(id,callback){
    return db.queryPresValue(sql["undoDeleteVisaByEId"].text,[id],function(e,o){callback(e,o)});
}


exports.selectAll = function (callback) {
    return db.queryPres(sql['selectAllVisa'], function (e, o) {
        callback(e, o)
    })
}

exports.selectElementById = function (id, callback) {
    return db.queryPresValue(sql['selectVisaById'], [id], function (e, o) {
        callback(e, o)
    })
}

exports.selectElementByEId = function (id, callback) {
    return db.queryPresValue(sql['selectVisaByEId'], [id], function (e, o) {
        callback(e, o)
    })
}

exports.deleteElementById = function (id, callback) {
    sql['deleteVisaById'].values = [id];
    return db.queryPres(sql['deleteVisaById'], function (e, o) {
        callback(e, o)
    });
}

exports.deleteElementByEId = function (eid, callback) {
    sql['deleteVisaByEId'].values = [eid];
    return db.queryPres(sql['deleteVisaByEId'], function (e, o) {
        callback(e, o)
    });
}

exports.insertElement = function (data, callback) {
    sql['insertVisa'].values =  [data.eid, data.type, data.sTime, data.eTime,data.status];
    return db.queryPres(sql["insertVisa"], function (e, o) {
        callback(e, o)
    });
}

exports.updateElementById = function (id,data, callback) {
    sql['updateVisaById'].values = [data.eid, data.type, data.sTime, data.eTime,data.status,id]
    return db.queryPres(sql['updateVisaById'], function (e, o) {
        callback(e, o);
    });
}

exports.updateElementByEId = function (id,data, callback) {
    sql['updateVisaByEId'].values = [data.type, data.sTime, data.eTime,data.status,id]
    return db.queryPres(sql['updateVisaByEId'], function (e, o) {
        callback(e, o);
    });
}

