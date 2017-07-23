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
      user: req.session.name,
      is_manager: req.session.is_manager
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

router.get('/new', function(req, res, next) {
  if (isAuthenticated(req.session)) {
    base_params = {
      user: req.session.name,
      is_manager: req.session.is_manager
    };
    model.loadLeaveTypes(function(leave_types){
      base_params['leave_types'] = leave_types;
      res.render('leave_requests/new', base_params);
    });
  } else {
    res.redirect('/');
  }
});

router.post('/new', function(req, res, next) {
  if (isAuthenticated(req.session)) {
    base_params = {
      user: req.session.name,
      is_manager: req.session.is_manager
    };
    var no_of_days = req.body.dates.split(',').length
    params = {
      emp_id: req.session.emp_id,
      from: req.body.dates,
      type_of_leave_id: req.body.leaveType,
      no_of_days: no_of_days,
      reason: req.body.reason
    };
    model.createLeaveRequest(params, function(OkPacket){
      if(OkPacket.affectedRows == 1){
        base_params['message'] = 'successfully created';
        res.redirect('/leave_requests');
      }
      else
      {
        base_params['error_message'] = 'successfully created';
        res.render('leave_requests/new', base_params);
      }
    });
  } else {
    res.redirect('/');
  }
});

module.exports = router;