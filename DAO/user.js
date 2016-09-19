/**
 * Created by mooner00 on 8/13/2016.
 */
var db = require('./../comm/database');

var sql = {
    selectAllUser : { name:'selectAllFromUser', text: "select * from user_info"},
    selectUserByName  :{name: "selectUserByName", text: "SELECT * FROM user_info where username = $1", values: ["default"] },
    selectUserById: {name:'selectUserById',text:"select * from user_info where id = $1 "},
    selectFirstUser : { name: 'selectFirstUser', text:"select * from user_info where id = $1",values:[1]},
    deleteUserById: {name:"deleteUserById",text:"DELETE FROM user_info WHERE id = $1",values:[1]},
    insertUser:{name:'insertUser',text:'insert into user_info (username,password,e_id,level) VALUES ($1, $2, $3, $4)',
    values:['username','password',2333,2333]},
    updateUserById: {name:"updateUserById",text:"UPDATE user_info SET username = $1, password = $2, e_id = $3, level = $4 where id=$5"
        ,values: ["username", "password", 1, 0,1] },
    selectLastUser: {name: "selectLastUser", text: "SELECT * FROM user_info ORDER BY id DESC LIMIT 1"},
    selectEmailByUsername:{name:"selectEmailByUsername", text: "SELECT email,password FROM user_info LEFT JOIN employee_info on user_info.e_id=employee_info.e_id WHERE username=$1", values: ["default"]},
}

exports.selectEmailByUsername = function(username,callback){
    return db.queryPresValue(sql["selectEmailByUsername"].text,[username],function(e,o){callback(e,o)})
}

exports.selectAll = function(callback){
    return db.queryPres(sql['selectAllUser'],function(e,o){callback(e,o)})
}

exports.selectElementById = function(id,callback){
    return db.queryPresValue(sql['selectUserById'],[id],function(e,o){callback(e,o)})
}

exports.selectLast = function(callback){
    return db.queryPres(sql['selectLastUser'],function(e,o){callback(e,o)});
}


exports.selectUserById = function(id,callback){
    return db.queryPresValue(sql['selectUserById'],[id],function(e,o){callback(e,o)})
}

exports.selectFirst = function(callback){
    sql['selectFirstUser'].values = [1];
    return db.queryPres(sql['selectFirstUser'],function(e,o){callback(e,o)});
}

exports.deleteById = function(id,callback){
    sql['deleteUserById'].values =[id];
    return db.queryPres(sql['deleteUserById'],function(e,o){callback(e,o)});
}

exports.deleteElementById = function(id,callback){
    sql['deleteUserById'].values =[id];
    return db.queryPres(sql['deleteUserById'],function(e,o){callback(e,o)});
}

exports.insertElement = function(dt,callback){
    console.log(dt)
    sql['insertUser'].values = [dt.username,dt.password,dt.eid,dt.level];
    return db.queryPres(sql['insertUser'],function(e,o){callback(e,o)});
}

exports.updateElementById = function(id,dt,callback){
    console.log(dt);
    sql['updateUserById'].values = [dt.username,dt.password,dt.eid,dt.level,id];
    return db.queryPres(sql['updateUserById'],function(e,o){callback(e,o)});
}

exports.selectElementByName = function(username,callback){
    sql['selectUserByName'].values = [username];
    console.log(username);
    db.queryPres(sql["selectUserByName"],function(e,o){callback(e,o);})
}






