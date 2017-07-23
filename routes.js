module.exports = function(app) {
	var index = require('./routes/index');
	var leave_request = require('./routes/leave_requests');
	var employee_requests = require('./routes/employee_requests');

	app.use('/', index);
	app.use('/leave_requests', leave_request);
	app.use('/employee_requests', employee_requests);

	// catch 404 and forward to error handler
	app.use(function(req, res, next) {
		var err = new Error('Not Found');
		err.status = 404;
		next(err);
	});

	// error handler
	app.use(function(err, req, res, next) {
		// set locals, only providing error in development
		res.locals.message = err.message;
		res.locals.error = req.app.get('env') === 'development' ? err : {};

		// render the error page
		res.status(err.status || 500);
		res.render('error');
	});
};