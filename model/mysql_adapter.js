var mysql = require('mysql');
var mySQLConfiguration = require('./../config/database.json').mysql;

var connection = mysql.createConnection({
  host: mySQLConfiguration.host,
  user: mySQLConfiguration.user,
  password: mySQLConfiguration.password,
  database: mySQLConfiguration.database
});

module.exports = {
  executeQuery: function(sql_query, callback) {
    result = {}
    connection.query(sql_query, function(err, rows, fields) {
      if (err) {
        result['error'] = err;
      }
      else
      {
        result['rows'] = rows;
      }
      callback(result);
    });
  }
}