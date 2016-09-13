/**
 * Created by mooner00 on 7/12/2016.
 */
var userDAO = require('./../DAO/user');
var msg = require('./../comm/msg');
exports.login = function(name, pass, callback){
    var title = "login";
    var repMsg = {
        title: title,
        msg: msg.getMsg("fail"),
        data: null
    }
    userDAO.selectElementByName(name,function(e,o){
       // callback(null,msg.msgGen("login","success"),o);
        var title = "login";
      //  console.log(o.rows[0],e);
        if(!o.rows[0]){
            repMsg.msg = msg.getMsg("noMatch");
            repMsg.data = null;
            callback(repMsg,null);
        } else{
            if(o.rows[0].password != pass){
                repMsg.msg = msg.getMsg("noMatch");
                repMsg.data = null;
                callback(repMsg,null);
            }else{
                repMsg.msg = msg.getMsg("success");
                //console.log(o.rows[0])
                repMsg.data = o.rows[0];
                callback(repMsg,o.rows[0]);
            }

        }
    })
    
}
