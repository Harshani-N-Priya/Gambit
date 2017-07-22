LeaveRequestPresenter = {
  index: function(leave_requests) {
    presented_leave_requests = [];
    if(leave_requests) {
      for(var i = 0; i < leave_requests.length; i++) {
        leave_request = leave_requests[i];
        presented_leave_request = {
          leaveTypeName: leave_request.leave_type_name,
          noOfDays: leave_request.no_of_days,
          reason: leave_request.reason,
          managerName: leave_request.manager_name,
          status: leave_request.status
        };
        presented_leave_request['fromDate'] = LeaveRequestPresenter.presentDate(leave_request.from);
        presented_leave_request['toDate'] = LeaveRequestPresenter.presentDate(leave_request.to);
        presented_leave_requests.push(presented_leave_request);
      };
    }
    return presented_leave_requests;
  },
  presentDate: function(dateString) {
    if(!dateString){
      return "";
    }
    var d = new Date(dateString),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }
};

module.exports = LeaveRequestPresenter