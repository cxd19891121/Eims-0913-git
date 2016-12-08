var userDAO = require('./../DAO/user');
var workDAO = require('./../DAO/work');
var empDAO = require('./../DAO/emp');
var eduDAO = require('./../DAO/edu');
var orderDAO = require('./../DAO/order');
var visaDAO = require('./../DAO/visa');
var dtService = require('./../service/dtService');
var repMsgService = require('./../service/repMsgService');
var auth = require('./../service/authority')
var search = require('./../service/sqlBuilder');
var forgetService = require('./../service/forget');
var mail = require('./../service/mail');
var client = require('./../comm/redis');
var validation = require('./../service/validate');
var config = require('./../config/appConfig')
var md5 = require('md5')
var viewRule = require('./../service/viewRule')

var repMsg = {}
var repMsgGroup = {
    user: {},
    emp: {},
    order: {},
    work: {},
    edu: {},
    visa: {},
}
var normalizeMsg = {
    msg: {},
    data: {
        emp: {},
        empErr: {},
        order: {},
        orderErr: {},
        work: {},
        workErr: {},
        edu: {},
        eduErr: {},
        visa: {},
        visaErr: {},
    }
}

// get all the website-message by username.
exports.getMsgByName = function (req, callback) {
    var name = req.params['name'];
    console.log(name);

    client.get(name, function (e, o) {
        console.log(o)
        if (o == null || o == '') {
            callback({errMsg: "0 message"})
        } else {

            callback(null, JSON.parse(o));
        }
    });
}

exports.updateMsgByName = function (req, callback) {
    var msgArr = req.body['message'];
    var name = req.params['name'];

    client.set(name, JSON.stringify(msgArr), function (e, o) {
        callback(e, {msg: o});
    })
}

exports.sendMsg = function (req, callback) {
    var msgMulti = req.body['message'];
    msgMulti.forEach(function (msg, index) {
        // console.log('for each msg: ', msg);
        client.get(msg.to, function (e, o) {
            // console.log("o"+index+ ":",o);
            // console.log("msg"+index +":",msg);
            if (e) {
                callback(e);
                return;

            } else {
                var msgArr = []
                if (o == null || o == "") {
                    msgArr = [];
                } else {

                    msgArr = JSON.parse(o);
                }

                msgArr.push(msg);
                //       console.log('msgArr',msgArr);
                client.set(msg.to, JSON.stringify(msgArr), function (e, o) {
                    if (e) {
                        callback(e);
                        return;
                    }
                })
            }
        })
    })
    callback(null, {msg: 'All messages have been send'});
}

exports.deleteAllMessage = function (req, callback) {
    var name = req.params['name'];
    console.log(name);
    client.set(name, "", function (e, o) {
        callback(e, {msg: o});
    });
}

//check auth and send back the correct client.
exports.reach = function (req, callback) {
    auth.authCheck(req, function (o) {
        callback(o.filePath);
    })
}

//forget function
exports.forget = function (req, callback) {
    var username = req.body.username

    forgetService.forget(username, function (msg, o) {
        if (o) {
            req.session.user = o;
            msg['msg']['success'] = '0'
            console.log(msg)
            callback(msg);
            //    res.jsonp(userObj);
        } else {
            callback(msg);
        }
    })

}

//send email
exports.mail = function (req, callback) {

    var username = req.body.username;
    var pass = req.body.password;
    var server = req.body.server;
    var mailOption = req.body.mailOption;

    mail.sendMail(username, pass, server, mailOption, function (e, o) {
        if (e) {
            callback(e);
        } else {
            callback(null, o);
        }
    })
}

exports.getAllUser = function (req, callback) {
    auth.authCheck(req, function (authObj) {
        var getAllUser = authObj.ops["getAllUser"];
        var getAllUsername = authObj.ops["getAllUsername"];
        if (getAllUser) {
            dtService.getAllUser(function (e, o) {
                callback(e, o);
            })

        } else if (getAllUsername) {
            dtService.getAllUsername(function (e, o) {
                callback(e, o);
            })
        } else {
            var error = {
                msg: "Higher level need for request.",
                type: "level error"
            }
            callback(error);
        }
    })
}


//login service: check validation of username and password, check the authority, send the right html file back.
exports.login = function (req, callback) {
    var username = req.body['username'];
    var password = req.body['password'];

    userDAO.selectElementByName(username, function (e, o) {
        //console.log(o.rows[0].password)
        //console.log(md5(password) == o.rows[0].password)
        if (e) {
            // case 1: fail to connect to database: callback a error msg with the 'err' object.
            repMsg = {error: e, msg: 'fail to GET access to LOGIN system'};
            callback(repMsg);
        }
        // case 2: connect database but there is no such a username: callback a error msg without any data.
        else if (o.rows.length <= 0) {
            repMsg = {error: 'invalid username', msg: 'invalid username'};
            callback(repMsg);
        }
        
        //case 4: correct username and password:
        // 1> put the user into the new session.
        // 2> send the right html file back to front-end
        else if (o.rows[0].password == password) {

            req.session.user = o.rows[0];
          //  console.log("login",req.session.user.level);
            auth.authCheck(req, function (authObj) {
                callback(null, authObj.filePath);
            })
        }
        else if (o.rows[0].password == md5(password))
        {
            req.session.user = o.rows[0];
          //  console.log("login",req.session.user.level);
            auth.authCheck(req, function (authObj) {
           

                callback(null, authObj.filePath);
            })
        }
        //case 3: find user but password do not match: callback a error msg without any data.
        else if (o.rows[0].password != password) {
            repMsg = {error: 'invalid password', msg: 'invalid password'}
            callback(repMsg);
        }
        else {
            callback({error: "error", msg: 'unknown error'});
        }
        ;
    })
}

//logout: clear session.
exports.logout = function (req, callback) {

    req.session.user = null;
    auth.authCheck(req, function (authObj) {
        callback(authObj.fileName);
    })
}

//refresh all the file.
exports.backToIndex = function (req, callback) {
    auth.authCheck(req, function (authObj) {
        callback(authObj.fileName);
    })
}

//get all data into an array.
//


exports.getAllBySql = function (req,callback) {


    auth.authCheck(req, function (authObj) {
        
        if (authObj.ops['search']) {
            search.getAll(function (e, o) {

                //Filter : verify the "show salary"
                //Hide salary if need.
                //var keyArr = []
                console.log()
                var keyArr = viewRule.rule.putData([],authObj.ops)
                if(keyArr.length != 0){
                    o.rows.forEach(function(info){
                        keyArr.map(function(e){
                            info[e] = "****"
                        })
                    })
                }
                callback(e,o);


            })
        } else {
            var error = {
                msg: "Higher level need for request.",
                type: "level error"
            }
            callback(error);
        }
    })
}

//get all data into an object
exports.getAllTable = function (callback) {

    auth.authCheck(req, function (authObj) {
        if (authObj.ops['search']) {

            dtService.getAll(userDAO, function (e, o) {
                repMsgService.buildGetAllMsg(repMsgGroup.user, 'user_info', e, o);

                dtService.getAll(empDAO, function (e, o) {
                    repMsgService.buildGetAllMsg(repMsgGroup.emp, 'emp_info', e, o);
                    dtService.getAll(workDAO, function (e, o) {
                        repMsgService.buildGetAllMsg(repMsgGroup.work, 'work_info', e, o);

                        dtService.getAll(visaDAO, function (e, o) {
                            repMsgService.buildGetAllMsg(repMsgGroup.visa, 'visa_info', e, o);

                            dtService.getAll(orderDAO, function (e, o) {
                                repMsgService.buildGetAllMsg(repMsgGroup.order, 'order_info', e, o);

                                dtService.getAll(eduDAO, function (e, o) {
                                    repMsgService.buildGetAllMsg(repMsgGroup.edu, 'education_info', e, o);
                                    callback(repMsgGroup);
                                })
                            })
                        })
                    })
                })
            })

        } else {
            var error = {
                msg: "Higher level need for request.",
                type: "level error"
            }
            callback(error);
        }
    })


}

//insert the data into all tables.
exports.addAll = function (req, callback) {

    // check the authority
    auth.authCheck(req, function (authObj) {
        if (authObj.ops["addEmp"] == undefined || !authObj.ops["addEmp"]) {
            var error = {
                msg: "Higher level need for request.",
                type: "level error"
            }
            callback(error);
        } else {
            validation.empValidate(req.body['emp']);
            //add emp edu visa work order
            dtService.addElement(empDAO, req.body['emp'], function (e, o) {
                repMsgService.buildAddMsg(repMsgGroup.emp, 'emp_info', e, o);
                if (e) {
                    callback(repMsgGroup);
                } else {
                    dtService.getLast(empDAO, function (e, o) {
                        var empId = o.rows[0].emp_id;
                        req.body['emp'].eid = empId;
                        req.body['work'].eid = empId;
                        req.body['edu'].eid = empId;
                        req.body['order'].eid = empId;
                        req.body['visa'].eid = empId;

                        req.body['emp'].delete_flag = false;
                        req.body['work'].delete_flag = false;
                        req.body['edu'].delete_flag = false;
                        req.body['order'].delete_flag = false;
                        req.body['visa'].delete_flag = false;

                        validation.eduValidate(req.body['edu']);
                        validation.workValidate(req.body['work']);
                        validation.orderValidate(req.body['order']);
                        validation.visaValidate(req.body['visa']);
                        //console.log('empId', empId);

                        console.log()

                        dtService.addElement(workDAO, req.body['work'], function (e, o) {
                            repMsgService.buildAddMsg(repMsgGroup.work, 'work_info', e, o)

                            dtService.addElement(eduDAO, req.body['edu'], function (e, o) {
                                repMsgService.buildAddMsg(repMsgGroup.edu, 'edu_info', e, o)

                                dtService.addElement(orderDAO, req.body['order'], function (e, o) {
                                    repMsgService.buildAddMsg(repMsgGroup.order, 'order_info', e, o)

                                    dtService.addElement(visaDAO, req.body['visa'], function (e, o) {
                                        repMsgService.buildAddMsg(repMsgGroup.visa, 'visa_info', e, o)
                                        callback(null, repMsgGroup);
                                    })
                                })
                            });
                        })
                    })
                }
            })


        }
    })


    // })
}

//getAllById: get one personal's all information by searching the employee id.
exports.getAllById = function (req, callback) {
    var id = req.params['id'];

    auth.authCheck(req, function (authObj) {
        if (authObj.ops["search"] == undefined || !authObj.ops["search"] ) {
            var error = {
                msg: "Higher level need for request.",
                type: "level error"
            }
            callback(error);
        } else {
            dtService.getElementById(empDAO, id, function (e, o) {
                repMsgService.buildGetMsg(repMsgGroup.emp, 'emp_info', e, o);

                dtService.getElementByEId(workDAO, id, function (e, o) {
                    repMsgService.buildGetMsg(repMsgGroup.work, 'work_info', e, o);

                    dtService.getElementByEId(visaDAO, id, function (e, o) {
                        repMsgService.buildGetMsg(repMsgGroup.visa, 'visa_info', e, o);

                        dtService.getElementByEId(orderDAO, id, function (e, o) {
                            repMsgService.buildGetMsg(repMsgGroup.order, 'order_info', e, o);

                            dtService.getElementByEId(eduDAO, id, function (e, o) {
                                repMsgService.buildGetMsg(repMsgGroup.edu, 'education_info', e, o);

                                callback(null, repMsgGroup);
                            })
                        })
                    })
                })
            })
        }
    })
}

//update individual's all information by search the employee id.
exports.updateAllById = function (req, callback) {
    console.log(req.body);
    var id = req.params['id'];
    req.body['emp'].emp_id = id;
    validation.empValidate(req.body['emp']);
    validation.eduValidate(req.body['edu']);
    validation.workValidate(req.body['work']);
    validation.orderValidate(req.body['order']);
    validation.visaValidate(req.body['visa']);

    //check the authority
    auth.authCheck(req, function (authObj) {
       if (authObj.ops["editEmp"] == undefined || !authObj.ops["editEmp"]) {
            var error = {
                msg: "Higher level need for request.",
                type: "level error"
            }
            callback(error);
        } else {

            //update emp, work, edu, order, visa
            dtService.updateElementById(empDAO, id, req.body['emp'], function (e, o) {
                repMsgService.buildUpdateMsg(repMsgGroup.emp, 'emp_info', e, o);

                dtService.updateElementByEId(workDAO, id, req.body['work'], function (e, o) {
                    repMsgService.buildUpdateMsg(repMsgGroup.work, 'work_info', e, o);

                    dtService.updateElementByEId(visaDAO, id, req.body['visa'], function (e, o) {
                        repMsgService.buildUpdateMsg(repMsgGroup.visa, 'visa_info', e, o);

                        dtService.updateElementByEId(orderDAO, id, req.body['order'], function (e, o) {
                            repMsgService.buildUpdateMsg(repMsgGroup.order, 'order_info', e, o);

                            dtService.updateElementByEId(eduDAO, id, req.body['edu'], function (e, o) {
                                repMsgService.buildUpdateMsg(repMsgGroup.edu, 'education_info', e, o);
                                console.log("return msg:", repMsgGroup);
                                callback(null, repMsgGroup);
                            })
                        })
                    })
                })
            })
        }
    })
}

//delete all by id: given emp_id and delete all the information about this person. (this function have not implemented by our system)
exports.deleteAllById = function (req, callback) {
    var id = req.params['id'];

    //check authority
    auth.authCheck(req, function (authObj) {
        if (authObj.ops["delEmp"] == undefined || !authObj.ops["delEmp"]) {
            var error = {
                msg: "Higher level need for request.",
                type: "level error"
            }
            callback(error);

        } else {
            repMsgGroupRefresh();
            dtService.deleteFlagById(empDAO, id, function (e, o) {
                repMsgService.buildDeleteMsg(repMsgGroup.emp, 'emp_info', e, o);

                dtService.deleteFlagByEId(workDAO, id, function (e, o) {
                    repMsgService.buildDeleteMsg(repMsgGroup.work, 'work_info', e, o);

                    dtService.deleteFlagByEId(visaDAO, id, function (e, o) {
                        repMsgService.buildDeleteMsg(repMsgGroup.visa, 'visa_info', e, o);

                        dtService.deleteFlagByEId(orderDAO, id, function (e, o) {
                            repMsgService.buildDeleteMsg(repMsgGroup.order, 'order_info', e, o);

                            dtService.deleteFlagByEId(eduDAO, id, function (e, o) {
                                repMsgService.buildDeleteMsg(repMsgGroup.edu, 'education_info', e, o);
                                callback(null, repMsgGroup);
                            })
                        })
                    })
                })
            })
        }

    })
}


//UndoDeleteAllById
exports.undoDeleteAllById = function (req,id, callback) {


    //check authority
    auth.authCheck(req, function (authObj) {
        if (authObj.ops["recEmp"] == undefined || !authObj.ops["recEmp"]) {
            var error = {
                msg: "Higher level need for request.",
                type: "level error"
            }
            callback(error);

        } else {
            repMsgGroupRefresh();
            dtService.undoDeleteById(empDAO, id, function (e, o) {
                repMsgService.buildUndoDeleteMsg(repMsgGroup.emp, 'emp_info', e, o);

                dtService.undoDeleteByEId(workDAO, id, function (e, o) {
                    repMsgService.buildUndoDeleteMsg(repMsgGroup.work, 'work_info', e, o);

                    dtService.undoDeleteByEId(visaDAO, id, function (e, o) {
                        repMsgService.buildUndoDeleteMsg(repMsgGroup.visa, 'visa_info', e, o);

                        dtService.undoDeleteByEId(orderDAO, id, function (e, o) {
                            repMsgService.buildUndoDeleteMsg(repMsgGroup.order, 'order_info', e, o);

                            dtService.undoDeleteByEId(eduDAO, id, function (e, o) {
                                repMsgService.buildUndoDeleteMsg(repMsgGroup.edu, 'education_info', e, o);
                                callback(null, repMsgGroup);
                            })
                        })
                    })
                })
            })
        }

    })
}

function repMsgGroupRefresh() {
    repMsgGroup = {
        user: {},
        emp: {},
        order: {},
        work: {},
        edu: {},
        visa: {},
    }

}
