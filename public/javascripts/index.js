function getLoginParams() {
  var loginParams = {};
  $('#loginForm [name]').each(function(){
      loginParams[this.name] = this.value;
  });
  return loginParams;
}
function accept(leave_request_id) {
  $.ajax({
    url: '/employee_requests/accept',
    data: {
      leave_request_id: leave_request_id
    },
    error: function() {
      alert("Accept failed");
    },
    success: function(data) {
      window.location.href = '/employee_requests';
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