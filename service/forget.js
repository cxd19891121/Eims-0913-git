var userDAO = require('./../DAO/user');
var msg = require('./../comm/msg');
var mail = require('./../service/mail')
//var nodemailer = require(nodemailer);


exports.forget = function(username,callback)
{
   
    var title = "forget";
    var repMsg = {
        title: title,
        msg: msg.getMsg("fail"),
        data: null
    }
    
    console.log('inservice')
    console.log(username)

    userDAO.selectEmailByUsername(username,function(e,o){
        if(o.rows[0]){
                console.log(o.rows[0].email)
                var email = o.rows[0].email
                var password = o.rows[0].password

                var mailOptions =
                {
                    from: '"Ames It  👥" <Ames_It@gmail.com>', // sender address
                    to: email, // list of receivers
                    subject: 'Your Password', // Subject line
                    //text: 'Hello world 🐴', // plaintext body
                    html: '<b>Hello Sir 🐴 Your Password is ' + password + '</b>' // html body
                }
                mail.sendMail('cyancloudcc','starcraft2','gmail',mailOptions)
                
            } else{
                    repMsg.msg = msg.getMsg("noMatch");
                    repMsg.data = {noMatch : 1};
                    callback(repMsg,o.rows[0]);
            }
    })
}
