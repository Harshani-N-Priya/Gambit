var express = require('express');
var router = express.Router();
var model = require('./../model/leave_request')
var presenter = require('./../presenter/leave_request_presenter')
var _ = require('underscore');

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

router.get('/:leave_request_id/edit', function(req, res, next) {
  if (isAuthenticated(req.session)) {
    base_params = {
      user: req.session.name,
      is_manager: req.session.is_manager
    };
    model.loadLeaveTypes(function(leave_types){
      base_params['leave_types'] = leave_types;
      model.loadLeaveRequest(req.params.leave_request_id, req.session.emp_id, function(leave_request){
        if(leave_request){
          base_params["leave_request"] = leave_request[0];
          console.log(base_params);
          res.render('leave_requests/edit', base_params);
        }
        else
        {
          res.redirect('/leave_requests');
        }
      });
    });
  } else {
    res.redirect('/');
  }
});

router.post('/:leave_request_id/edit', function(req, res, next) {
  if (isAuthenticated(req.session)) {
    base_params = {
      user: req.session.name,
      is_manager: req.session.is_manager
    };
    var no_of_days = req.body.dates.split(',').length
    params = {
      leave_request_id: req.params.leave_request_id,
      emp_id: req.session.emp_id,
      from: req.body.dates,
      type_of_leave_id: req.body.leaveType,
      no_of_days: no_of_days,
      reason: req.body.reason
    };
    model.updateLeaveRequest(params, function(OkPacket){
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

router.post('/cancel', function(req, res, next){
  if (isAuthenticated(req.session)) {
    base_params = {
      user: req.session.name,
      is_manager: req.session.is_manager
    };
    var leave_request_id = req.body.leave_request_id;
    if(req.session.is_manager == 0){
      model.cancelRequest(leave_request_id, req.session.emp_id, 'cancelled', function(OkPacket){
        if(OkPacket.affectedRows == 1){
          res.sendStatus(200);
        }
        else
        {
          res.sendStatus(404);
        }
      });
    }
    else
    {
      res.sendStatus(404);
    }
  }
});

router.get('/remaining_days', function(req, res, next){
  if (isAuthenticated(req.session)) {
    base_params = {
      user: req.session.name,
      is_manager: req.session.is_manager
    };
    var leave_type_id = req.query.leave_type_id;
    var date = new Date();
    var currentYear = date.getFullYear();
    var emp_id = req.session.emp_id;
    model.getTotalLeaveDays(leave_type_id, emp_id, function(total_days){
      if(total_days) {
        total_days = total_days[0].days;
        model.getTotalLeavesTaken(leave_type_id, emp_id, function(leave_requests){
          leave_days = _.flatten(_.map(leave_requests, function(leave_request_dates){
            return _.map(leave_request_dates.from.replace(/\s/g, '').split(','), function(date){
              if(date.split('/')[2] == currentYear){
                return date;
              };
            });
          }));
          remaining_days = total_days - leave_days.length;
          res.send({remaining_days: remaining_days});
        });
      }
      else {
        res.sendStatus(404);
      }
    })
  }
  else
  {
    res.redirect('/');
  }
});

module.exports = router;