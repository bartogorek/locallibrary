var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users', { comment: 'My first comment'});
});

router.get('/cool', function(req, res, next) {
  res.send('youre so cool');
});

module.exports = router;
