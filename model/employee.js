var mysql_adapter = require('./mysql_adapter');

Employee = {
  get: function(email, password, callback) {
    var sql_query = "select * from employee where email = '" + email + "' AND password = '" + password + "'";
    Employee.execute(sql_query, callback);
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

module.exports = Employee