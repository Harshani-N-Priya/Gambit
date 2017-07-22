var express = require('express');
var router = express.Router();
var model = require('./../model/leave_request')
var presenter = require('./../presenter/leave_request_presenter')

function isAuthenticated(session) {
  return session.email;
}

router.get('/', function(req, res, next) {
  if (isAuthenticated(req.session)) {
    base_params = {
      user: req.session.name
    };
    model.index(req.session.emp_id, function(leave_requests){
      presented_leave_requests = presenter.index(leave_requests);
      base_params['leave_requests'] = presented_leave_requests;
      res.render('leave_requests/index', base_params);
    });
  } else {
    res.redirect('/');
  }
});

module.exports = router;