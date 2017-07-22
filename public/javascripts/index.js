function getLoginParams() {
  var loginParams = {};
  $('#loginForm [name]').each(function(){
      loginParams[this.name] = this.value;
  });
  return loginParams;
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