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
            if(e) res.json({msg:"server error, can not supply data"});
            else res.json({data:o.rows});
        })
    }else{
        res.json({msg:"authorization error, id && key is can not be verify"})
    }
});














module.exports = router;