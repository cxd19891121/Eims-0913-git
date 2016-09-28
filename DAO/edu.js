
var db = require('./../comm/database');
var sql = {
    selectAllEdu: {name: "selectAllEdu", text: "SELECT * FROM education_info where delete_flag = false"}, //test only
    selectEduById: {name: "selectEduById", text: "SELECT * FROM education_info where ed_id = $1 AND delete_flag = false", values: [1]},
    selectEduByEId: {name: "selectEduByEId", text: "SELECT * FROM education_info where e_id = $1 AND delete_flag = false", values: [1]},
    deleteEduById: {name:"deleteEduById",text:"DELETE FROM education_info WHERE ed_id = $1",value:[1]},
    deleteEduByEId: {name:"deleteEduByEId",text:"DELETE FROM education_info WHERE e_id = $1",value:[1]},

    insertEdu: {
        name: "insertEdu",
        text: "INSERT INTO education_info (e_id,degree,major,university) VALUES ($1, $2, $3, $4)",
        values: [ 1, "bachelor", "cs", "ISU"]
    },

    updateEduById: {
        name: "updateEduById",
        text: "UPDATE education_info SET (e_id,degree,major,university) = ($1, $2, $3, $4) WHERE ed_id = $5",
        values: [ 1, "bachelor", "cs", "ISU",1]
    },

    updateEduByEId: {
        name: "updateEduByEId",
        text: "UPDATE education_info SET (degree,major,university) = ($1, $2, $3) WHERE e_id = $4",
        values: [ "bachelor", "cs", "ISU",1]
    },

    selectLastEdu: {name: "selectLastEdu", text: "SELECT * FROM education_info WHERE delete_flag = false ORDER BY ed_id DESC LIMIT 1"},

    deleteFlagEduById :{name:"deleteFlagEduById", text :"UPDATE education_info SET delete_flag = true where ed_id = $1", values :[0]},
    undoDeleteEduById :{name:"undoDeleteEduById",text:"UPDATE education_info SET delete_flag = false where ed_id = $1",values:[0]},
    deleteFlagEduByEId: {name:"deleteFlagEduByEId",text:"UPDATE education_info SET delete_flag = true WHERE e_id = $1",value:[1]},
    undoDeleteEduByEId :{name:"undoDeleteEduByEId",text:"UPDATE education_info SET delete_flag = false where e_id = $1",values:[0]},

}

exports.deleteFlagById = function (id,callback){
    return db.queryPresValue(sql["deleteFlagEduById"].text,[id],function(e,o){callback(e,o)})
}
exports.deleteFlagByEId = function(id,callback){
    return db.queryPresValue(sql["deleteFlagEduByEId"].text,[id],function(e,o){callback(e,o)})
}

exports.undoDeleteById = function(id,callback){
    return db.queryPresValue(sql["undoDeleteEduById"].text,[id],function(e,o){callback(e,o)});
}
exports.undoDeleteByEId = function(id,callback){
    return db.queryPresValue(sql["undoDeleteEduByEId"].text,[id],function(e,o){callback(e,o)});
}



exports.selectAll = function (callback) {
    return db.queryPres(sql['selectAllEdu'], function (e, o) {
        callback(e, o)
    })
}

exports.selectElementById = function (id, callback) {
    return db.queryPresValue(sql['selectEduById'], [id], function (e, o) {
        callback(e, o)
    })
}

exports.selectElementByEId = function (id, callback) {
    return db.queryPresValue(sql['selectEduByEId'], [id], function (e, o) {
        callback(e, o)
    })
}
exports.selectLast = function(callback){
    return db.queryPres(sql['selectLastEdu'],function(e,o){callback(e,o)});
}


exports.deleteElementById = function (id, callback) {
    sql['deleteEduById'].values = [id];
    return db.queryPres(sql['deleteEduById'], function (e, o) {
        callback(e, o)
    });
}

exports.deleteElementByEId = function (eid, callback) {
    sql['deleteEduByEId'].values = [eid];
    return db.queryPres(sql['deleteEduByEId'], function (e, o) {
        callback(e, o)
    });
}

exports.insertElement = function (data, callback) {
    sql['insertEdu'].values =  [data.eid, data.degree, data.major, data.uni];
    return db.queryPres(sql["insertEdu"], function (e, o) {
        callback(e, o)
    });
}


exports.updateElementById = function (id,data, callback) {
    sql['updateEduById'].values =  [ data.eid, data.degree, data.major, data.uni,id];
    return db.queryPres(sql['updateEduById'], function (e, o) {
        callback(e, o);
    });
}
exports.updateElementByEId = function(id,data,callback){
    sql['updateEduByEId'].values =  [ data.degree, data.major, data.uni,id];
    return db.queryPres(sql['updateEduByEId'], function (e, o) {
        callback(e, o);
    });
}
