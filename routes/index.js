var express = require('express');
var router = express.Router();
var config = require('./../config/appConfig');
var mail = require('./../service/mail');
var logicService = require('./../service/dtLogicService')

router.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    next();
});


/* GET home page. */
router.get('/', function (req, res) {
    logicService.reach(req,function(htmlFile){
        res.sendFile(__dirname  +  htmlFile);
    })
});

router.get('/user',function(req,res){
    logicService.reach(req,function(htmlFile){
        res.sendFile(__dirname  +  htmlFile);
    })
})


router.get('/admin',function(req,res){
    logicService.reach(req,function(htmlFile){
        res.sendFile(__dirname  +  htmlFile);
    })

})

router.post('/',function(req,res){
    logicService.login(req,function(e,htmlName){
       if(e){
           res.send(e);
       }else{
           res.send(htmlName);
       }
    })
})

router.get('/backToIndex',function(req,res){
    logicService.backToIndex(req,function(htmlName){
        res.send(htmlName);
    })

})

router.get('/logout',function(req,res){
    logicService.logout(req,function(htmlName){
        res.send(htmlName);
    })
})


router.post('/forget',function(req,res)
{
    logicService.forget(req,function(o){
        res.send(o);
    })
})

router.post('/email',function(req,res)
{
    logicService.mail(req,function(e,o){
        if(e){
            res.send(e);
        }else{
            res.send(o);
        }
    })

})



/* GET home page. */
router.get('/app/comm.js',function(req,res,next){
    res.sendFile(__dirname + '/app/comm.js')
})

router.get('/app/rule.js',function(req,res,next){
    res.sendFile(__dirname + '/app/rule.js')
})

router.get('/app/controller/userController.js',function(req,res,next){
    res.sendFile(__dirname + '/app/controller/userController.js')
})

router.get('/app/controller/addController.js',function(req,res,next){
    res.sendFile(__dirname + '/app/controller/addController.js')
})

router.get('/app/directive/myDirctive.js',function(req,res,next){
    res.sendFile(__dirname + '/app/directive/myDirctive.js')
})

router.get('/routes/app/app.js',function(req,res,next){
    res.sendFile(__dirname + '/routes/app/app.js')
})

router.get('/app/controller/appController.js',function(req,res,next){
    res.sendFile(__dirname + '/app/controller/appController.js')
})

router.get('/app/controller/editController.js',function(req,res,next){
    res.sendFile(__dirname + '/app/controller/editController.js')
})

router.get('/app/controller/application.js',function(req,res,next){
    res.sendFile(__dirname + '/app/controller/application.js')
})

router.get('/app/controller/search.js',function(req,res,next){
    res.sendFile(__dirname + '/app/controller/search.js')
})

router.get('/app/controller/edit.js',function(req,res,next){
    res.sendFile(__dirname + '/app/controller/edit.js')
})

router.get('/app/controller/addCtrl.js',function(req,res,next){
    res.sendFile(__dirname + '/app/controller/addCtrl.js')
})

router.get('/app/controller/add.js',function(req,res,next){
    res.sendFile(__dirname + '/app/controller/add.js')
})

router.get('/app/service/dataService.js',function(req,res,next){
    res.sendFile(__dirname + '/app/service/dataService.js')
})

router.get('/app/service/configService.js',function(req,res,next){
    res.sendFile(__dirname + '/app/service/configService.js')
})

router.get('/app/controller/ModalInstanceCtrl.js',function(req,res,next){
    res.sendFile(__dirname + '/app/controller/ModalInstanceCtrl.js')
})

router.get('/app/controller/application.js',function(req,res,next){
    res.sendFile(__dirname + '/app/controller/application.js')
})

router.get('/app/controller/search.js',function(req,res,next){
    res.sendFile(__dirname + '/app/controller/search.js')
})

router.get('/app/controller/edit.js',function(req,res,next){
    res.sendFile(__dirname + '/app/controller/edit.js')
})

router.get('/app/controller/addCtrl.js',function(req,res,next){
    res.sendFile(__dirname + '/app/controller/addCtrl.js')
})

router.get('/app/controller/add.js',function(req,res,next){
    res.sendFile(__dirname + '/app/controller/add.js')
})
router.get('/app/controller/addDetailController.js',function(req,res){
    res.sendFile(__dirname + '/app/controller/addDetailController.js');
})

router.get('/app/controller/ModalInstanceCtrl.js',function(req,res,next){
    res.sendFile(__dirname + '/app/controller/ModalInstanceCtrl.js')
})

router.get('/app/service/dataService.js',function(req,res,next){
    res.sendFile(__dirname + '/app/service/dataService.js')
})

router.get('/app/app.js',function(req,res,next){
    res.sendFile(__dirname + '/app/app.js')
})

router.get('/app/partial/login.html',function(req,res,next){
    res.sendFile(__dirname + '/app/partial/login.html')
})

router.get('/app/partial/search.html',function(req,res){
    res.sendFile(__dirname + '/app/partial/search.html')
})

router.get('/app/partial/edit.html',function(req,res){
    res.sendFile(__dirname +'/app/partial/edit.html')
})

router.get('/app/partial/add.html',function(req,res){
    res.sendFile(__dirname + '/app/partial/add.html')
})

router.get('/app/partial/addDetails.html',function(req,res){
    res.sendFile(__dirname + '/app/partial/addDetails.html')
})


//user web page
router.get('/app/partial/user/search_user.html',function(req,res){
    res.sendFile(__dirname + '/app/partial/user/search_user.html')
})
//user router provider
router.get('/app/app_user.js',function(req,res,next){
    res.sendFile(__dirname + '/app/app_user.js')
})


//admin web page
router.get('/app/partial/admin/search_admin.html',function(req,res){
    res.sendFile(__dirname + '/app/partial/admin/search_admin.html')
})
router.get('/app/partial/admin/userConfig.html',function(req,res){
    res.sendFile(__dirname + '/app/partial/admin/userConfig.html')
})

router.get('/app/partial/admin/modify.html',function(req,res){
    res.sendFile(__dirname + '/app/partial/admin/modify.html')
})
//admin router provider
router.get('/app/app_admin.js',function(req,res){
    res.sendFile(__dirname + '/app/app_admin.js')
})


//controller for admin
router.get('/app/controller/modifyController.js',function(req,res){
    res.sendFile(__dirname + '/app/controller/modifyController.js')
})

router.get('/app/controller/userConfigController.js',function(req,res){
    res.sendFile(__dirname + '/app/controller/userConfigController.js')
})

//new css

router.get('/lib/bootstrap/css/bootstrap.css',function(req,res){
    res.sendFile(__dirname + '/lib/bootstrap/css/bootstrap.css')
})

router.get('/lib/bootstrap/css/bootstrap-responsive.css',function(req,res){
    res.sendFile(__dirname + '/lib/bootstrap/css/bootstrap-responsive.css')
})

router.get('/lib/font-awesome/css/font-awesome.css',function(req,res){
    res.sendFile(__dirname + '/lib/font-awesome/css/font-awesome.css')
})

router.get('/stylesheets/theme.css',function(req,res){
    res.sendFile(__dirname + '/stylesheets/theme.css')
})

router.get('/images/furley_bg.png',function(req,res){
    res.sendFile(__dirname + '/images/furley_bg.png')
})

router.get('/lib/*',function(req,res){
    res.sendFile(__dirname + req.path)
})
module.exports = router;
