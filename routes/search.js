/**
 * Created by mooner00 on 8/23/2016.
 */
/**
 * Created by mooner00 on 7/20/2016.
 */
var express = require('express');
var router = express.Router();
var search = require('./../service/sqlBuilder');

router.get('/', function (req, res) {
        res.send("This is for the test. req :  searchObject.first_name = request.body.first_name " +
            "searchObject.e_id = request.body.e_id " +
            "searchObject.jobTitle = request.body.jobTitle " +
            "searchObject.visaStatus = request.body.visaStatus " +
            "searchObject.major = request.body.major" +
            "searchObject.orderStatus = request.body.orderStatus" +
            "searchObject.education = request.body.education" +
            "searchObject.level = request.body.level")
//    next();
    }
);

router.post('/', function (req, res) {

    search.search(req,res,function(e,o){

        if(e){
            res.send(e);
        }else{
            res.send(o.rows);
        }
    });
})

router.post('/name',function(req,res){
    search.searchByName(req,res,function(e,o){
        if(e){
            res.send(e);
        }else{

            res.send(o.rows);
        }
    })

})



module.exports = router;