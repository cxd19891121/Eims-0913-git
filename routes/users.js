var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/all',function(req,res){
  dtService.getAllUser(function(e,o){
    res.send(o);
  })
});
router.get('/first',function(req,res){
  dtService.getFirst(function(e,o){
    res.send(o)
  })
})

router.get('/:id',function(req,res){
  dtService.getUserById(req.params['id'],function(e,o){
    if(e){
      res.send(e);
    }
    res.send(o);})
})

router.delete('/:id',function(req,res){
  dtService.deleteById(req.params['id'],function(e,o){
    sendRep(e,o,res);
  })
})

router.post('/',function(req,res){
  dtService.insertElement(req.body['user'],function(e,o){
    sendRep(e,o,res);
  })
})

router.put('/:id',function(req,res){
  dtService.updateElementById(req.params['id'],req.body['user'],function(e,o){
    sendRep(e,o,res);
  })
})


module.exports = router;
