var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {user: req.session.name});
});

router.post('/login', function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  if(email === "sakthipvmj@gmail.com" && password === "sak")
  {
    req.session.email = email;
    req.session.name = "Sakthivel";
    req.session.emp_id = 1;
    res.sendStatus(200); 
  }
  else
  {
    res.sendStatus(404);
  }
});

router.get('/logout', function(req, res, next) {
  delete req.session.email;
  delete req.session.name;
  res.redirect('/');
});

module.exports = router;
