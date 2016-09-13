var mailer = require('nodemailer')

exports.sendMail = function(username,password,server,mailOptions,callback)
{
    var transporter = mailer.createTransport('smtps://' + username + '%40' + server + '.com:' + password + '@smtp.' + server + '.com')
    /*var mailOptions = 
    {
        from: '"Fred Foo 👥" <foo@blurdybloop.com>', // sender address
        to: 'cyancloudcc@gmail.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        //text: 'Hello world 🐴', // plaintext body
        html: '<b>Hello world 🐴</b>' // html body
    }*/
    transporter.sendMail(mailOptions, function(error, info)
    {
        if(error)
        {

            callback(error);
        }
        else{
            callback(null,info);
        }
        //console.log('Message sent: ' + info.response)
    })
}
//exports.sendMail('cyancloudcc','starcraft2','gmail')