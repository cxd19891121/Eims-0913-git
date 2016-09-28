/**
 * Created by mooner00 on 8/22/2016.
 */
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


router.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

//api for website-message:
//get message by id
router.get('/message/:name',function(req,res){
    dtLogicService.getMsgByName(req,function(e,o){

        console.log("get message:", e,o);
        if(e){
            res.send(e)
        }else{
            res.send(o);
        }
    })
})
//send website-message to multi user:
router.post('/message/',function(req,res){
    dtLogicService.sendMsg(req,function(e,o){
        if(e){
            res.send(e);
        }else{
            res.send(o);
        }
    })
})

router.put('/message/:name',function(req,res){
    dtLogicService.updateMsgByName(req,function(e,o){
        if(e){
            res.send(e)
        }else{
            res.send(o);
        }
    })
})

router.delete('/message/all/:name',function(req,res){
    dtLogicService.deleteAllMessage(req,function(e,o){

        if(e){
            res.send(e)
        }else{
            res.send(o)
        }
    })
})

router.get('/all/:id', function (req, res) {
    dtLogicService.getAllById(req,function(e,o){
       res.send(o)
    })
})


router.post('/all/',function(req,res){
    dtLogicService.addAll(req,function(e,o){
        console.log("error",e);
        console.log('obj',o);
        res.send(o);
    })
})

router.put('/all/:id',function(req,res){
    dtLogicService.updateAllById(req,function(e,o){
        console.log(o);
       res.send(o);
    })
})

router.delete('/all/:id',function(req,res){
    dtLogicService.deleteAllById(req,function(e,o){
        res.send(o)
    })
})

router.get('/all',function(req,res){
    dtLogicService.getAllBySql(function(e,o){
        if(e){
            res.send(e);
        }else {
            res.send(o);
        }
    })
})

router.get('/config',function(req,res){
    dtService.getConfig(function(o){
        res.send(o);
    })
})

router.put('/config',function(req,res){
    dtService.writeConfig(req.body['config'],function(e,o){
        if(e){
            res.send(e)
        }else{
            res.send(o);
        }
    });

})




//For test
router.get('/user', function (req, res) {

    dtLogicService.getAllUser(req,function(e,o){
        if(e){
            res.send(e)
        }else{
            res.send(o);
        }
    })
});

router.get('/user/first', function (req, res) {
    dtService.getFirstUser(function (e, o) {
        res.send(o)
    })
})

router.get('/user/last',function(req,res){
    dtService.getLast(userDAO,function(e,o){
        res.send(o);
    })
})

router.get('/user/username/:name',function(req,res){
    var username = req.params['name'];
    userDAO.selectElementByName(username,function(e,o){
        if(e){
            res.send(e)
        }else {
            res.send(o)
        }
    })
})



//emp
router.get('/emp',function(req,res){
    dtService.getAll(empDAO,function(e,o){
        res.send(o);
    })
})

router.get('/emp/last',function(req,res){
    dtService.getLast(empDAO,function(e,o){
        res.send(o);
    })
})

//Education
router.get('/edu',function(req,res){
    dtService.getAll(eduDAO,function(e,o){
        res.send(o);
    })
})

router.get('/order',function(req,res){
    dtService.getAll(orderDAO,function(e,o){
        res.send(o);
    })
})

router.get('/work',function(req,res){
    dtService.getAll(workDAO,function(e,o){
        res.send(o);
    })
})

router.get('/visa',function(req,res){
    dtService.getAll(visaDAO,function(e,o){
        res.send(o);
    })
})

router.get('/work/last',function(req,res){
    dtService.getLast(workDAO,function(e,o){
        res.send(o);
    })
})

router.get('/user/:id', function (req, res) {
    dtService.getUserById(req.params['id'], function (e, o) {
        res.header("Access-Control-Allow-Origin", "*");
        if (e) {
            res.send(e);
        } else {
            res.send(o);
        }
    })
})


router.get('/emp/:id',function(req,res){

    dtService.getElementById(empDAO,req.params['id'],function(e,o){
        sendRep(e,o,res);
    })
})

router.get('/edu/:id',function(req,res){

    dtService.getElementById(eduDAO,req.params['id'],function(e,o){
        sendRep(e,o,res);
    })
})

router.get('/work/:id',function(req,res){
    dtService.getElementById(workDAO,req.params['id'],function(e,o){
        sendRep(e,o,res);
    })
})

router.get('/visa/:id',function(req,res){
    dtService.getElementById(visaDAO,req.params['id'],function(e,o){
        sendRep(e,o,res);
    })
})

router.get('/order/:id',function(req,res){
    dtService.getElementById(orderDAO,req.params['id'],function(e,o){
        sendRep(e,o,res);
    })
})

//new delete: change from deleteById to deleteFlagById
router.delete('/user/:id', function (req, res) {
    dtService.deleteFlagById(userDAO,req.params['id'], function (e, o) {
        sendRep(e, o, res);
    })
})
// undo User Delete
router.delete('/user/undo/:id',function(req,res){
    dtService.undoDeleteById(userDAO,req.params['id'], function (e, o) {
        sendRep(e, o, res);
    })
})

// delete for Visa : deleteFlag and undoDelete
router.delete('/visa/:id', function (req, res) {
    dtService.deleteFlagById(visaDAO,req.params['id'], function (e, o) {
        sendRep(e, o, res);
    })
})
router.delete('/visa/undo/:id', function (req, res) {
    dtService.undoDeleteById(visaDAO,req.params['id'], function (e, o) {
        sendRep(e, o, res);
    })
})

//delete for Emp: deleteFlagById AND undoDeleteById
router.delete('/emp/:id', function (req, res) {
    dtService.deleteFlagById(empDAO,req.params['id'], function (e, o) {
        sendRep(e, o, res);
    })
})
router.delete('/emp/undo/:id', function (req, res) {
    dtService.undoDeleteById(empDAO,req.params['id'], function (e, o) {
        sendRep(e, o, res);
    })
})

//delete for Work: deleteFlagById AND undoDeleteById
router.delete('/work/:id', function (req, res) {
    dtService.deleteFlagById(workDAO,req.params['id'], function (e, o) {
        sendRep(e, o, res);
    })
})
router.delete('/work/undo/:id', function (req, res) {
    dtService.undoDeleteById(workDAO,req.params['id'], function (e, o) {
        sendRep(e, o, res);
    })
})

//delete for edu : deleteById && undoDeleteById
router.delete('/edu/:id', function (req, res) {
    dtService.deleteFlagById(eduDAO,req.params['id'], function (e, o) {
        sendRep(e, o, res);
    })
})
router.delete('/edu/undo/:id', function (req, res) {
    dtService.undoDeleteById(eduDAO,req.params['id'], function (e, o) {
        sendRep(e, o, res);
    })
})

//delete for order: deleteById && undoDeleteById
router.delete('/order/:id', function (req, res) {
    dtService.deleteFlagById(orderDAO,req.params['id'], function (e, o) {
        sendRep(e, o, res);
    })
})
router.delete('/order/undo/:id',function(req,res){
    dtService.undoDeleteById(orderDAO,req.params['id'], function (e, o) {
        sendRep(e, o, res);
    })
})



router.post('/user', function (req, res) {
    dtService.addElement(userDAO,req.body['user'],function(e,o){
        sendRep(e,o,res);
    })
})


router.post('/order',function(req,res){
    dtService.addElement(orderDAO,req.body['order'],function(e,o){
        sendRep(e,o,res);
    })
})

router.post('/work',function(req,res){
    dtService.addElement(workDAO,req.body['work'],function(e,o){
        sendRep(e,o,res);
    })
})
router.post('/visa',function(req,res){
    dtService.addElement(visaDAO,req.body['visa'],function(e,o){
        sendRep(e,o,res);
    })
})


router.put('/user/:id', function (req, res) {
    dtService.updateUserById(req.params['id'], req.body['user'], function (e, o) {
        console.log('error:',e)
        console.log('obj:',o);
        sendRep(e, o, res);
    })
})
router.put('/visa/:id', function (req, res) {
    dtService.updateElementById(visaDAO,req.params['id'], req.body['visa'], function (e, o) {
        sendRep(e, o, res);
    })
})
router.put('/work/:id', function (req, res) {
    dtService.updateElementById(workDAO,req.params['id'], req.body['work'], function (e, o) {
        sendRep(e, o, res);
    })
})
router.put('/emp/:id', function (req, res) {
    dtService.updateElementById(empDAO,req.params['id'], req.body['emp'], function (e, o) {
        sendRep(e, o, res);
    })
})
router.put('/edu/:id', function (req, res) {
    dtService.updateElementById(eduDAO,req.params['id'], req.body['edu'], function (e, o) {
        sendRep(e, o, res);
    })
})
router.put('/order/:id', function (req, res) {
    dtService.updateElementById(orderDAO,req.params['id'], req.body['order'], function (e, o) {
        sendRep(e, o, res);
    })
})




router.get('/edu/EId/:eid',function(req,res){
    dtService.getElementByEId(eduDAO,req.params['eid'],function(e,o){
        sendRep(e,o,res);
    })
})
router.get('/order/EId/:eid',function(req,res){
    dtService.getElementByEId(orderDAO,req.params['eid'],function(e,o){
        sendRep(e,o,res);
    })
})
router.get('/visa/EId/:eid',function(req,res){
    dtService.getElementByEId(visaDAO,req.params['eid'],function(e,o){
        sendRep(e,o,res);
    })
})
router.get('/work/EId/:eid',function(req,res){
    dtService.getElementByEId(workDAO,req.params['eid'],function(e,o){
        sendRep(e,o,res);
    })
})



var sendRep = function (e, o, res) {
    if (e) {
        res.send(e);
    }
    res.send(o);
}


module.exports = router;
