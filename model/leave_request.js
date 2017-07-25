var mysql_adapter = require('./mysql_adapter')

LeaveRequest = {
  index: function(emp_id, callback) {
    var sql_query = 'select lr.id, lr.from, tol.name as leave_type_name, lr.no_of_days, lr.status, lr.reason, lr.approved_on from \
                    leave_requests lr INNER JOIN \
                    employee emp ON lr.emp_id = emp.id INNER JOIN \
                    type_of_leave tol ON lr.type_of_leave_id = tol.id \
                    where lr.emp_id = ' + emp_id + ' ORDER BY lr.id DESC';
    LeaveRequest.execute(sql_query, callback);
  },
  loadLeaveTypes: function(callback) {
    var sql_query = 'select * from type_of_leave';
    LeaveRequest.execute(sql_query, callback);
  },
  createLeaveRequest: function(params, callback) {
    var sql_query = "INSERT INTO `leave_requests` (`emp_id`, `from`, `type_of_leave_id`, `no_of_days`, `reason`) \
                     VALUES \
                      ( " + params.emp_id + 
                        ",'" + params.from + 
                        "'," + params.type_of_leave_id +
                        "," + params.no_of_days +
                        ",'" + params.reason +
                      "')";
    LeaveRequest.execute(sql_query, callback);
  },
  updateLeaveRequest: function(params, callback) {
    var sql_query = "UPDATE leave_requests SET `from` ='" + params.from + "', `type_of_leave_id` =" + params.type_of_leave_id+ ", `no_of_days`="+params.no_of_days+", `reason` = '" + params.reason + "' WHERE id = " + params.leave_request_id + " AND emp_id = " +  params.emp_id;
    LeaveRequest.execute(sql_query, callback);
  },
  getRequestsForManager: function(emp_id, callback) {
    var sql_query = 'select emp.name, lr.id, lr.from, tol.name as leave_type_name, lr.no_of_days, lr.status, lr.reason, lr.approved_on from \
                    leave_requests lr INNER JOIN \
                    employee emp ON lr.emp_id = emp.id INNER JOIN \
                    type_of_leave tol ON lr.type_of_leave_id = tol.id \
                    where lr.emp_id IN (select id from employee where manager_id = ' + emp_id + ') ORDER BY lr.id DESC';
    LeaveRequest.execute(sql_query, callback);
  },
  updateStatus: function(leave_request_id, status, callback) {
    var sql_query = "UPDATE leave_requests SET status='" + status + "' WHERE id = " + leave_request_id;
    LeaveRequest.execute(sql_query, callback);
  },
  cancelRequest: function(leave_request_id, emp_id, status, callback) {
    var sql_query = "UPDATE leave_requests SET status='" + status + "' WHERE id = " + leave_request_id + " AND emp_id = " +  emp_id;
    LeaveRequest.execute(sql_query, callback);
  },
  loadLeaveRequest: function(leave_request_id, emp_id, callback) {
    var sql_query = "SELECT * FROM leave_requests WHERE id = " + leave_request_id + " AND emp_id = " + emp_id;
    LeaveRequest.execute(sql_query, callback);
  },
  getTotalLeaveDays: function(leave_type_id, emp_id, callback) {
    var sql_query = "select days from eligibility where `leave_type_id` = " + leave_type_id + " AND category_id IN (select category_id from employee where id = " + emp_id + ")";
    LeaveRequest.execute(sql_query, callback);
  },
  getTotalLeavesTaken: function(leave_type_id, emp_id, callback) {
    var sql_query = "select `from` from leave_requests where `type_of_leave_id` = " + leave_type_id + " AND emp_id = " + emp_id + " AND status = 'approved'";
    LeaveRequest.execute(sql_query, callback);
  },
  execute: function(sql_query, callback) {
    console.log(sql_query);
    mysql_adapter.executeQuery(sql_query, function(result){
      if(result.error){
        console.log("Logging MySQL error", result.error);
      }
      callback(result.rows);
    });
  }
}

module.exports = LeaveRequest