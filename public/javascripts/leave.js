function setDates(dates){
  dates = dates.split(',');
  $('#dates').multiDatesPicker({
    addDates: dates
  });
}
function loadRemainingDays() {
  leave_type_id = $("#leave_type_selection").val();
  if(!leave_type_id)
    return;
  $.ajax({
    url: '/leave_requests/remaining_days',
    data: {
      leave_type_id: leave_type_id
    },
    success: function(data) {
      $('#remaining_days').html(data.remaining_days + " days are remaining");
    },
    type: 'GET'
  });
}
$(document).ready(function() {
  $("#dates").multiDatesPicker({
    dates
  });
  loadRemainingDays();
  $("#leave_type_selection").change(function(event){
    loadRemainingDays();
  });
});