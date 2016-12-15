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

router.get('/employee',function(req,res){
    var id = req.param('id');
    console.log(publicKey.id)
    var key = req.param('key');
    if (publicKey.id == id && publicKey.key == key){
        empDAO.selectAll(function(e,o){
            if(e) {
                res.json({msg:"server error, can not supply data"});
            } else{ 
                // adapter to requirement 
                /*
                */
                var data = o.rows.map((e,i,a) => {
                    return {
                        firstName: e.first_name,
                        lastName: e.last_name,
                        wholeName: e.last_name + ' ' + e.first_name,
                        email: e.email,
                        homePhone: e.home_phone,
                        cellphone: e.cellphone,
                        address: e.p_add,
                        city: e.p_city,
                        state: e.p_state,
                        zip: e.p_zip
                    };
                });
                res.json({data: data});
            }
        })
    }else{
        res.json({msg:"authorization error, id && key is can not be verify"})
    }
});














module.exports = router;