var express = require('express');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});
router.get('/about/*',function(req,res){
  var error='error content not find ';
  res.status(500).render('error',{error})
});
module.exports = router;
