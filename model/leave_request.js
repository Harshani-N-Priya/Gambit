var mysql_adapter = require('./mysql_adapter')

LeaveRequest = {
  index: function(emp_id, callback) {
    var sql_query = 'select lr.from, lr.to, tol.name as leave_type_name, lr.no_of_days, lr.status, lr.reason, manager.name as manager_name, lr.approved_on from \
                    leave_requests lr INNER JOIN \
                    employee emp ON lr.emp_id = emp.id INNER JOIN \
                    type_of_leave tol INNER JOIN \
                    employee manager ON lr.approved_by = manager.id \
                    where lr.emp_id = ' + emp_id;
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