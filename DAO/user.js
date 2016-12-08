/**
 * Created by mooner00 on 8/13/2016.
 */
var db = require('./../comm/database');
var md5 = require('md5')

var sql = {
    selectAllUsername:{name:'selectAllUsername',text:"select username from user_info where delete_flag = false"},
    selectAllUser : { name:'selectAllFromUser', text: "select * from user_info where delete_flag = false"},
    selectUserByName  :{name: "selectUserByName", text: "SELECT * FROM user_info where username = $1 AND delete_flag = false" , values: ["default"] },
    selectUserById: {name:'selectUserById',text:"select * from user_info where id = $1 AND delete_flag = false"},
    selectFirstUser : { name: 'selectFirstUser', text:"select * from user_info where id = $1 ",values:[1]},
    deleteUserById: {name:"deleteUserById",text:"DELETE FROM user_info WHERE id = $1",values:[1]},
    insertUser:{name:'insertUser',text:'insert into user_info (username,password,e_id,level,email) VALUES ($1, $2, $3, $4, $5)',
    values:['username','password',2333,2333]},
    updateUserById: {name:"updateUserById",text:"UPDATE user_info SET username = $1, password = $2, e_id = $3, level = $4, email = $5 where id=$6"
        ,values: ["username", "password", 1, 0,"amesIT@example.com",1] },
    selectLastUser: {name: "selectLastUser", text: "SELECT * FROM user_info where delete_flag = false ORDER BY id DESC LIMIT 1"},
    selectEmailByUsername:{name:"selectEmailByUsername", text: "SELECT email,password FROM user_info WHERE username = $1 AND delete_flag = false", values: ["default"]},

    deleteFlagUserById :{name:"deleteFlagUserById", text :"UPDATE user_info SET delete_flag = true where id = $1", values :[0]},
    undoDeleteUserById :{name:"undoDeleteUserById",text:"UPDATE user_info SET delete_flag = false where id = $1",values:[0]}


}

exports.deleteFlagById = function (id,callback){
    return db.queryPresValue(sql["deleteFlagUserById"].text,[id],function(e,o){callback(e,o)})
}

exports.undoDeleteById = function(id,callback){
    return db.queryPresValue(sql["undoDeleteUserById"].text,[id],function(e,o){callback(e,o)});
}

exports.selectAllUsername = function(callback){
    return db.queryPres(sql["selectAllUsername"],function(e,o){callback(e,o)});
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
    sql['insertUser'].values = [dt.username,md5(dt.password),dt.eid,dt.level,dt.email];
    return db.queryPres(sql['insertUser'],function(e,o){callback(e,o)});
}

exports.updateElementById = function(id,dt,callback){
    console.log(dt);
    if (dt.password.length <= 30) dt.password = md5(dt.password)

    sql['updateUserById'].values = [dt.username,dt.password,dt.eid,dt.level,dt.email,id];
    return db.queryPres(sql['updateUserById'],function(e,o){callback(e,o)});
}


exports.selectElementByName = function(username,callback){
    //console.log(1)
    sql['selectUserByName'].values = [username];
    console.log(username);
    db.queryPres(sql["selectUserByName"],function(e,o){callback(e,o);})
}






