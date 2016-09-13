/**
 * Created by mooner00 on 7/14/2016.
 */

var msg={
    info:{ code: 100, text: "Test only"},
    success : {code: 200, text:"OK"},
    noMatch: { code: 400, text:"No matches found for this user" },
    invalidInput: {code:401 ,text:"invalid input for username or password"},
    requestErr: { code:402 , text:"Error in request body"},
    connErr : { code : 500, text:"Connection Error"},
    poolErr: {code:501,text:"error fetching client from pool"},
    fail :{ code: 600, text:"fail to add"},
    noInput:{code: 601, text:"no input add"},
}



exports.msgGen = function(title, msgName){
    var output = title+ ": "+ msg[msgName].code + " " + msg[msgName].text;
    return output
    
}
exports.getMsg = function(msgName){
    return msg[msgName];
}
