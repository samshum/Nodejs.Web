var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Sam Express' });
});

router.get('/home', function(req, res, next){
  res.end('HOME!');
});

module.exports = router;
