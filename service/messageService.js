/**
 * Created by mooner00 on 9/29/2016.
 */

//messageService is build to deal with website message:
//1. getMsgByName : get all msg by username.
//2. updateMsgByName :  update msg, can be used for delete.
//3. sendMsg :  send Msg to multiple users

var client = require('./../comm/redis');

// get all the website-message by username.
exports.getMsgByName = function(req,callback){
    var name = req.params['name'];
   // console.log(name);

    client.get(name,function(e,o){
       // console.log(o)
        if(o == null || o == ''){
            callback({errMsg: "0 message"})
        }else {

            var allMsg = JSON.parse(o);
            var result = [];

            allMsg.forEach(function(msg){
                if(msg.hasOwnProperty("delete") || msg.delete == undefined){
                    if (!msg.delete) {
                        result.push(msg);
                    }
                }else{
                    msg.delete = false;
                    result.push(msg);
                }
            })

            callback(null, result);
        }
    });
}

exports.updateMsgByName = function(req,callback){
    var msgArr = req.body['message'];
    var name = req.params['name'];
    //console.log('update msg', msgArr);
    client.set(name,JSON.stringify(msgArr),function(e,o){
        callback(e,{msg: o});
    })
}


exports.sendMsg = function(req,callback){
    var msgMulti = req.body['message'];


    msgMulti.forEach(function(msg,index){
        // console.log('for each msg: ', msg);
        client.get(msg.to,function(e,o){
            // console.log("o"+index+ ":",o);
            // console.log("msg"+index +":",msg);

            if(e){
                callback(e);
                return;

            }else{
                var msgArr = []
                if(o == null || o == "") {
                    msgArr = [];
                }else{
                    msgArr = JSON.parse(o);
                }

                msgArr.push(msg);
                //       console.log('msgArr',msgArr);
                client.set(msg.to,JSON.stringify(msgArr),function(e,o){
                    if(e){
                        callback(e);
                        return;
                    }
                })
            }
        })
    })
    callback(null,{msg: 'All messages have been send'});
}

exports.deleteAllMessage = function(req,callback){

    var name = req.params['name'];
    //console.log(name);
    client.set(name,"",function(e,o){
        callback(e,{msg:o});
    });

}
