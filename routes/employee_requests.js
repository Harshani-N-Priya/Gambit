var express = require('express');
var router = express.Router();
var model = require('./../model/leave_request')
var presenter = require('./../presenter/leave_request_presenter')

function isAuthenticated(session) {
  return session.email;
}

/* GET home page. */
router.get('/', function(req, res, next) {
  if (isAuthenticated(req.session)) {
    base_params = {
      user: req.session.name,
      is_manager: req.session.is_manager
    };
    model.getRequestsForManager(req.session.emp_id, function(leave_requests){
      presented_leave_requests = presenter.index(leave_requests);
      base_params['leave_requests'] = presented_leave_requests;
      res.render('employee_requests/index', base_params);
    });
  } else {
    res.redirect('/');
  }
});

router.post('/accept', function(req, res, next){
  if (isAuthenticated(req.session)) {
    base_params = {
      user: req.session.name,
      is_manager: req.session.is_manager
    };
    var leave_request_id = req.body.leave_request_id;
    if(req.session.is_manager == 1){
      model.updateStatus(leave_request_id, 'approved', function(OkPacket){
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

router.post('/reject', function(req, res, next){
  if (isAuthenticated(req.session)) {
    base_params = {
      user: req.session.name,
      is_manager: req.session.is_manager
    };
    var leave_request_id = req.body.leave_request_id;
    if(req.session.is_manager == 1){
      model.updateStatus(leave_request_id, 'rejected', function(OkPacket){
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

module.exports = router;