function getLoginParams() {
  var loginParams = {};
  $('#loginForm [name]').each(function(){
      loginParams[this.name] = this.value;
  });
  return loginParams;
}
function showSuccessAlert(success_message) {
  $("#success_alert").html(success_message);
  $("#success_alert").show();
  $('#success_alert').delay(7000).fadeOut(400);
}
function showFailureAlert(failure_message) {
  $("#failure_alert").html(failure_message);
  $("#failure_alert").show();
  $('#failure_alert').delay(7000).fadeOut(400);
}
function accept(leave_request_id) {
  $.ajax({
    url: '/employee_requests/accept',
    data: {
      leave_request_id: leave_request_id
    },
    error: function() {
      showFailureAlert("Accept failed");
    },
    success: function(data) {
      showSuccessAlert("Accepted successfully");
      window.location.href = '/employee_requests';
    },
    type: 'POST'
  });
}
function reject(leave_request_id) {
  $.ajax({
    url: '/employee_requests/reject',
    data: {
      leave_request_id: leave_request_id
    },
    error: function() {
      showFailureAlert("Reject failed");
    },
    success: function(data) {
      showSuccessAlert("Rejected successfully");
      window.location.href = '/employee_requests';
    },
    type: 'POST'
  });
}
function cancel(leave_request_id) {
  $.ajax({
    url: '/leave_requests/cancel',
    data: {
      leave_request_id: leave_request_id
    },
    error: function() {
      showFailureAlert("Cancel failed");
    },
    success: function(data) {
      showSuccessAlert("Cancelled successfully");
      window.location.href = '/leave_requests';
    },
    type: 'POST'
  });
} 
$(document).ready(function(){
  $("#loginForm").submit(function(event){
    event.preventDefault();
    params = getLoginParams();
    $.ajax({
      url: '/login',
      data: params,
      error: function() {
        $('.error_message').show();
      },
      success: function(data) {
        window.location.href = '/';
      },
      type: 'POST'
    });
  });
});