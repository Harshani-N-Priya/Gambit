var express = require('express');
var router = express.Router();
var model = require('./../model/employee')

/* GET home page. */
router.get('/', function(req, res, next) {
  base_params = {
    user: req.session.name,
    is_manager: req.session.is_manager
  };
  res.render('index', base_params);
});

router.post('/login', function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  model.get(email, password, function(employees){
    employee = employees[0];
    if(employee){
      req.session.email = employee.email;
      req.session.name = employee.name;
      req.session.emp_id = employee.id;
      req.session.is_manager = employee.is_manager;
      res.sendStatus(200); 
    }
    else
    {
      res.sendStatus(404);
    }
  });
});

router.get('/logout', function(req, res, next) {
  delete req.session.email;
  delete req.session.name;
  res.redirect('/');
});

module.exports = router;
