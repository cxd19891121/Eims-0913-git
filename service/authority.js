
var fs = require("fs");
var config = require('./../config/appConfig')


exports.authCheck = function(req,callback) {

    if (!req.session.user) {
        var auth = config.auth.noSess;
        callback(auth);
    }

    else if (req.session.user) {

        var level = req.session.user.level;
        if (level == config.auth.user.level) {
            callback(config.auth.user);
        } else if (level == config.auth.admin.level) {
            callback(config.auth.admin);
        }
    }
    else{
        callback(config.auth.noSess);
    }
}



exports.chkAuth = function checkAuthority(request,callback)
{
//    logger.warn('easy')
    if (!request.session)
    {
        var err = 'error: cannot get session';
        console.log('error : can not get session')
        callback(err);
    }
    var currentUser = request.session
    var level = currentUser.user.level;
    var data = fs.readFileSync('authority.conf','utf8')
    //var auth = JSON.stringify(data)
    var auth = JSON.parse(data)
    var error

    var path = "Path test!";

    switch (level)
    {
        case 0:
            path = auth['r'].path
            callback(null,path,level);
            break
        case 1:
            path = auth['rw+'].path
            callback(null,path,level);
            break
        default:
            error = 'Can not find authority'
            callback(error);
            break
    }

}
