/**
 * Created by mooner00 on 8/22/2016.
 */
var db = require('./../comm/database');
var sql = {
    selectAllEmp : {name: "selectAllEmp", text: "SELECT * FROM employee_info where delete_flag = false"}, //test only
    selectEmpById:{ name:"selectEmpById",text:"SELECT * FROM employee_info where emp_id = $1 AND delete_flag = false"},
    selectEmpByEId:{ name:"selectEmpByEId",text:"SELECT * FROM employee_info where emp_id = $1 AND delete_flag = false"},
    selectLastEmp :{name: "selectLastEmp", text: "SELECT * FROM employee_info where delete_flag = false ORDER BY emp_id DESC LIMIT 1 "},
    insertEmp: {
        name: "insertEmp",
        text: "INSERT INTO employee_info (first_name,last_name,middle_name,DOB,SSN,marital_status, job_title," +
        "job_level," +
        "salary, " +
        "home_phone," +
        "cellphone," +
        "email," +
        "termn_date," +
        "termn_reason," +
        "p_add," +
        "p_city," +
        "p_state," +
        "p_zip," +
        "p_country," +
        "b_add," +
        "b_city," +
        "b_state," +
        "b_zip," +
        "b_country," +
        "health_ins," +
        "regional_subsides," +
        "reimbursement," +
        "payrise_percentage," +
        "progress)"+
        "VALUES ($1, $2, $3, $4, $5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29)",
        values: ["testname","testF",null,'1999-9-9', 0,false, "test_title","test_level",8,1111,2222,"test@gmail.com",'2001-01-01',"test" +
        " reason","666 p street","ames","IA",50010,"USA","233 B road", "beijing","beijing",100000,"China","test healthIns","test rs","test rs",10,0]
    },

    deleteEmpById: {name:"deleteEmpById",text:"DELETE FROM employee_info WHERE emp_id = $1",value:[1]},
    updateEmpById: {name:"updateEmpById",text:"UPDATE employee_info SET first_name = $1, last_name = $2, middle_name = $3, DOB = $4," +
    "SSN = $5, marital_status = $6," +
    "job_title = $7," +
    "job_level = $8," +
    "salary = $9," +
    "home_phone = $10," +
    "cellphone = $11," +
    "email = $12," +
    "termn_date = $13," +
    "termn_reason = $14," +
    "p_add = $15," +
    "p_city = $16," +
    "p_state = $17," +
    "p_zip = $18," +
    "p_country = $19," +
    "b_add = $20," +
    "b_city = $21," +
    "b_state = $22," +
    "b_zip = $23," +
    "b_country = $24," +
    "health_ins = $25," +
    "regional_subsides = $26," +
    "reimbursement = $27," +
    "payrise_percentage = $28, "+
    "progress = $29"+
    "where emp_id = $30",},

    deleteFlagEmpById :{name:"deleteFlagUserById", text :"UPDATE employee_info SET delete_flag = true where emp_id = $1", values :[0]},
    undoDeleteEmpById :{name:"undoDeleteUserById",text:"UPDATE employee_info SET delete_flag = false where emp_id = $1",values:[0]},
    selectEmpByTitle:{ name:"selectEmpByTitle",text:"SELECT * FROM employee_info where job_title = $1 AND delete_flag = false"},


}

exports.deleteFlagById = function (id,callback){
    return db.queryPresValue(sql["deleteFlagEmpById"].text,[id],function(e,o){callback(e,o)})
}

exports.undoDeleteById = function(id,callback){
    return db.queryPresValue(sql["undoDeleteEmpById"].text,[id],function(e,o){callback(e,o)});
}



exports.selectAll = function (callback) {
    return db.queryPres(sql['selectAllEmp'], function (e, o) {

        if(e){console.log("selectAll error (file: /DAO/emp.js)",e)}
        callback(e, o)
    })
}

exports.selectElementById = function (id, callback) {
    return db.queryPresValue(sql['selectEmpById'], [id], function (e, o) {
        if(e){console.log("selectElementById error (file: /DAO/emp.js)",e)}
        callback(e, o)
    })
}

exports.selectElementByEId = function (id, callback) {
    return db.queryPresValue(sql['selectEmpById'], [id], function (e, o) {
        if(e){console.log("selectElementByEId error (file: /DAO/emp.js)",e)}
        callback(e, o)
    })
}

exports.selectEmpByTitle = function (title, callback){
    return db.queryPresValue(sql['selectEmpByTitle'],[title],function(e, o){
        if(e){console.log("selectEmpByTitle error (file: /DAO/emp.js)",e)}
        callback(e, o)
    })
}

exports.selectLast = function(callback){
    return db.queryPres(sql['selectLastEmp'],function(e,o){
        if(e){console.log("selectLast error (file: /DAO/emp.js)",e)}
        callback(e,o)
    });
}


exports.deleteElementById = function (id, callback) {
    sql['deleteEmpById'].values = [id];
    return db.queryPres(sql['deleteEmpById'], function (e, o) {
        callback(e, o)
    });
}

exports.insertElement = function (data, callback) {
    sql['insertEmp'].values = [ data.fName, data.lName,data.mName,data.DOB,data.SSN,data.mStatus,data.jTitle,data.jLevel,data.salary,data.hPhone,data.cPhone,data.email,data.tDate,data.tReason,
        data.pAdd,data.pCity,data.pState,data.pZip,data.pCountry,data.bAdd,data.bCity,data.bState,data.bZip,data.bCountry,data.hInsurance,data.rSubside,data.reimbursement,data.rPercent,data.progress];
    return db.queryPres(sql['insertEmp'], function (e, o) {

        if(e){console.log("insertElement error (file: /DAO/emp.js)",e)}
        callback(e, o)
    });
}

exports.updateElementById = function (id,data, callback) {
    sql['updateEmpById'].values =  [ data.fName, data.lName,data.mName,data.DOB,data.SSN,data.mStatus,data.jTitle,data.jLevel,data.salary,data.hPhone,data.cPhone,data.email,data.tDate,data.tReason,
        data.pAdd,data.pCity,data.pState,data.pZip,data.pCountry,data.bAdd,data.bCity,data.bState,data.bZip,data.bCountry,data.hInsurance,data.rSubside,
        data.reimbursement,data.rPercent,data.progress,id];
    return db.queryPres(sql['updateEmpById'], function (e, o) {

        if(e){console.log("updateElementById error (file: /DAO/emp.js)",e)}
        callback(e, o)
    });
}











