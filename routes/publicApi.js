var express = require('express');
var router = express.Router();
var dtService = require('./../service/dtService');
var dtLogicService = require('./../service/dtLogicService');
var userDAO = require('./../DAO/user')
var empDAO = require('./../DAO/emp')
var workDAO = require('./../DAO/work')
var eduDAO = require('./../DAO/edu');
var orderDAO = require('./../DAO/order');
var visaDAO = require('./../DAO/visa');
var msgService = require('./../service/messageService');
var config = require('./../config/appConfig');
var publicKey = config.publicKey;


var responseBodyData = {
    authorizationError: {msg:"authorization error, id && key is can not be verify",data:"3997"},
    serverError: {msg:"server error, can not supply data",data:"",errCode:"3999"},
    dataNotSufficientError: {msg:"error, inviliad data type",data:"",errCode:"3998"},
    success:{msg:"Process Success",errCode:"0"}

};


router.all('*',function(req,res,next){
    var id = req.param('id');
    var key = req.param('key');
    if (publicKey.id == id && publicKey.key == key){
        next();
    }else{
        res.json(responseBodyData.authorizationError);
    }
});

router.get('/employees',function(req,res,next){
    var title = req.param('title');
    var employeeId = req.param('empId');
    if (employeeId){
        empDAO.selectElementById(employeeId,function(e,o){
            if(e) {
                res.json(responseBodyData.serverError);
            } else{ 
                // adapter to requirement 
                /*
                */
                var data = o.rows.map((e,i,a) => {
                    return {
                        id: e.emp_id,
                        firstName: e.first_name,
                        lastName: e.last_name,
                        middleName: e.middle_name,
                        wholeName: e.last_name +' ' + e.middle_name + ' ' + e.first_name,
                        email: e.email,
                        homePhone: e.home_phone,
                        cellphone: e.cellphone,
                        address: e.b_add,
                        city: e.b_city,
                        state: e.b_state,
                        zip: e.b_zip,
                    };
                });
                responseBodyData.success.data = data
                res.json(responseBodyData.success.data);
            }
        })
    }else if (title){
        empDAO.selectEmpByTitle(title,function(e,o){
            if(e) {
                res.json(responseBodyData.serverError);
            } else{ 
                // adapter to requirement 
                /*
                */
                var data = o.rows.map((e,i,a) => {
                    return {
                        id: e.emp_id,
                        firstName: e.first_name,
                        lastName: e.last_name,
                        middleName: e.middle_name,
                        wholeName: e.last_name +' ' + e.middle_name + ' ' + e.first_name,
                        email: e.email,
                        homePhone: e.home_phone,
                        cellphone: e.cellphone,
                        address: e.b_add,
                        city: e.b_city,
                        state: e.b_state,
                        zip: e.b_zip,
                    };
                });
                responseBodyData.success.data = data
                res.json(responseBodyData.success.data);
            }
        })
    }else{
        res.json(responseBodyData.dataNotSufficientError);
    }
});














module.exports = router;