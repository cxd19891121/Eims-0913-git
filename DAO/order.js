/**
 * Created by mooner00 on 8/22/2016.
 */

var db = require('./../comm/database');
var sql = {
    selectAllOrder: { name: "selectAllOrder", text: "SELECT * FROM order_info WHERE delete_flag = false"  }, //test only
    selectOrderById:{ name: "selectOrderById", text: "SELECT * FROM order_info WHERE o_id = $1 AND delete_flag = false", values: [1] },
    selectOrderByEId: {name: "selectAllByEId", text: "SELECT * FROM order_info WHERE e_id = $1 AND delete_flag = false", values: [1]},


    //need code
    insertOrder: {
        name: "insertOrder",
        text: "INSERT INTO order_info (" +
        "e_id," +
        "location," +
        "company_name," +
        "order_description," +
        "type," +
        "title," +
        "o_start_time," +
        "o_end_time," +
        "owner," +
        "extension_time" +
        ") VALUES ($1, $2, $3, $4, $5,$6,$7,$8,$9,$10)",
        values: [1, "SAN JOSE","linked-in","some description","java","java programmer",'2000-01-01','2001-01-01',"logan", null]
    },

    updateOrderById: {
        name: "updateOrderById",
        text: "UPDATE order_info SET(" +
        "e_id," +
        "location," +
        "company_name," +
        "order_description," +
        "type," +
        "title," +
        "o_start_time," +
        "o_end_time," +
        "owner," +
        "extension_time" +
        ") = ($1, $2, $3, $4, $5,$6,$7,$8,$9,$10) WHERE o_id = $11",
        values: [1, "SAN JOSE","linked-in","some description","java","java programmer",'2000-01-01','2001-01-01',"logan", null,1]
    },

    updateOrderByEId: {
        name: "updateOrderByEId",
        text: "UPDATE order_info SET(" +
        "location," +
        "company_name," +
        "order_description," +
        "type," +
        "title," +
        "o_start_time," +
        "o_end_time," +
        "owner," +
        "extension_time" +
        ") = ($1, $2, $3, $4, $5,$6,$7,$8,$9) WHERE e_id = $10",
        values: [1, "SAN JOSE","linked-in","some description","java","java programmer",'2000-01-01','2001-01-01',"logan", null,1]
    },
    deleteOrderById: {name:"deleteOrderById",text:"DELETE FROM order_info WHERE o_id = $1",value:[1]},
    deleteOrderByEId: {name:"deleteOrderByEId",text:"DELETE FROM order_info WHERE e_id = $1",value:[1]},

    dropTable: {name:"dropOrderTable", text:"drop table order_info"},
    // * 11 cols: o_id, e_id, location,company_name, description, type, title, start_time, end_time, owner, extension_time
    createTable: {name:"createOrderTable",text:"create table order_info (" +
    "o_id SERIAL primary key not null," +
    "e_id int not null," +
    "location text," +
    "company_name text," +
    "order_description text," +
    "type text," +
    "title text," +
    "o_start_time date," +
    "o_end_time date," +
    "owner text," +
    "extension_time text" +
    ")"},


    deleteFlagOrderById :{name:"deleteFlagOrderById", text :"UPDATE order_info SET delete_flag = true where o_id = $1", values :[0]},
    undoDeleteOrderById :{name:"undoDeleteOrderById",text:"UPDATE order_info SET delete_flag = false where o_id = $1",values:[0]},
    deleteFlagOrderByEId: {name:"deleteFlagOrderByEId",text:"UPDATE order_info SET delete_flag = true WHERE e_id = $1",value:[1]},

}

exports.deleteFlagById = function (id,callback){
    return db.queryPresValue(sql["deleteFlagOrderById"].text,[id],function(e,o){callback(e,o)})
}
exports.deleteFlagByEId = function(id,callback){
    return db.queryPresValue(sql["deleteFlagOrderByEId"].text,[id],function(e,o){callback(e,o)})
}

exports.undoDeleteById = function(id,callback){
    return db.queryPresValue(sql["undoDeleteOrderById"].text,[id],function(e,o){callback(e,o)});
}




exports.selectAll = function (callback) {
    return db.queryPres(sql['selectAllOrder'], function (e, o) {
        callback(e, o)
    })
}

exports.selectElementById = function (id, callback) {
    return db.queryPresValue(sql['selectOrderById'], [id], function (e, o) {
        callback(e, o)
    })
}

exports.selectElementByEId = function (id, callback) {
    return db.queryPresValue(sql['selectOrderByEId'], [id], function (e, o) {
        callback(e, o)
    })
}

exports.deleteElementById = function (id, callback) {
    sql['deleteOrderById'].values = [id];
    return db.queryPres(sql['deleteOrderById'], function (e, o) {
        callback(e, o)
    });
}

exports.deleteElementByEId = function (eid, callback) {
    sql['deleteOrderByEId'].values = [eid];
    return db.queryPres(sql['deleteOrderByEId'], function (e, o) {
        callback(e, o)
    });
}

exports.insertElement = function (data, callback) {
    sql['insertOrder'].values =  [ data.eid, data.jLocation, data.company, data.des,data.type, data.title,data.sTime,data.eTime,data.owner,data.ext];
    return db.queryPres(sql["insertOrder"], function (e, o) {
        callback(e, o)
    });
}

exports.updateElementById = function (id,data, callback) {
    sql['updateOrderById'].values = [ data.eid, data.jLocation, data.company, data.des,data.type,data.title,data.sTime,data.eTime,data.owner,data.ext,id]
    return db.queryPres(sql['updateOrderById'], function (e, o) {
        callback(e, o);
    });
}

exports.updateElementByEId = function (id,data, callback) {
    sql['updateOrderByEId'].values = [ data.jLocation, data.company, data.des,data.type,data.title,data.sTime,data.eTime,data.owner,data.ext,id]
    return db.queryPres(sql['updateOrderByEId'], function (e, o) {
        callback(e, o);
    });
}

