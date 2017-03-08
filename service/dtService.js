/**
 * Created by mooner00 on 8/13/2016.
 */


var userDAO = require('./../DAO/user');
var config = require('./../config/appConfig')

module.exports.getAllUser = function(callback){
    userDAO.selectAll(function(e,o){
        callback(e,o);
    })
}
module.exports.getAllUsername = function(callback){
    userDAO.selectAllUsername(function(e,o){callback(e,o)});
}

module.exports.getUserById = function(id,callback){

    userDAO.selectUserById(id,function(e,o){
        callback(e,o);
    })
}

module.exports.deleteFlagById= function(DAO,id,callback){
    DAO.deleteFlagById(id,function(e,o){
        if(e){
            console.log("deleteFlagById error (file: /service/dtService)",e)
        }
        callback(e,o);
    })
}
module.exports.deleteFlagByEId = function(DAO,id,callback){
    DAO.deleteFlagByEId(id,function(e,o){
        if(e){
            console.log("deleteFlagByEId error (file: /service/dtService)",e)
        }

        callback(e,o);
    })
}

module.exports.undoDeleteByEId = function(DAO,id,callback){
    DAO.undoDeleteByEId(id,function(e,o){
        if(e){
            console.log("undoDeleteByEId error (file: /service/dtService)",e)
        }
        callback(e,o);
    })
}

module.exports.undoDeleteById = function(DAO,id,callback){
    DAO.undoDeleteById(id,function(e,o){
        if(e){
            console.log("undoDeleteById error (file: /service/dtService)",e)
        }
        callback(e,o)})
}

module.exports.getFirstUser = function(callback){
    userDAO.selectFirst(function(e,o){
        if(e){
            console.log("getFirstUser error (file: /service/dtService)",e)
        }
        callback(e,o)})
}

exports.deleteUserById = function(id,callback){
    userDAO.deleteById(id,function(e,o){callback(e,o)});

}

exports.insertUser = function(data,callback){
    userDAO.insertElement(data,function(e,o){callback(e,o)})
}

exports.updateUserById  = function(id,data,callback){
    console.log(data);
    userDAO.updateElementById(id,data,function(e,o){callback(e,o)})
}


// for all tables
exports.getAll = function(DAO,callback){
    DAO.selectAll(function(e,o){
        if(e){
            console.log("getAll error (file: /service/dtService)",e)
        }

        callback(e,o);})
}

exports.getElementById = function(DAO,id,callback){
    DAO.selectElementById(id,function(e,o){

        if(e){
            console.log("getElementById error (file: /service/dtService)",e)
        }
        callback(e,o)});
}


exports.deleteElementById = function(DAO,id,callback){
    DAO.deleteElementById(id,function(e,o){
        if(e){
            console.log("deleteElementById error (file: /service/dtService)",e)
        }
        callback(e,o)});
}

exports.addElement = function(DAO,data,callback){
    console.log(data)
    DAO.insertElement(data,function(e,o){
        if(e){
            console.log("addElement error (file: /service/dtService)",e)
        }

        callback(e,o)})
}

exports.updateElementById  = function(DAO,id,data,callback){
    DAO.updateElementById(id,data,function(e,o){
        if(e){
            console.log("updateElementById error (file: /service/dtService)",e)
        }

        callback(e,o)})
}

exports.updateElementByEId  = function(DAO,id,data,callback){
    DAO.updateElementByEId(id,data,function(e,o){
        if(e){
            console.log("updateElementByEId error (file: /service/dtService)",e)
        }

        callback(e,o)})
}


exports.getLast = function(DAO,callback){
    DAO.selectLast(function(e,o){
        if(e){
            console.log("getLast error (file: /service/dtService)",e)
        }

        callback(e,o)});
}

//not available for user
exports.getElementByEId  = function(DAO,eid,callback){
    DAO.selectElementByEId(eid,function(e,o){
        if(e){
            console.log("getElementByEId error (file: /service/dtService)",e)
        }

        callback(e,o)})
}

exports.getConfig = function(callback){
    config.readConfig(function(configObj){
        callback(configObj);
    })
}

exports.writeConfig = function(configObj,callback){
    //console.log('dtService writeConfig',configObj);
    //config.readConfig();
    config.writeConfig(configObj,function(e,o){
        callback(e,o);
    });

}




