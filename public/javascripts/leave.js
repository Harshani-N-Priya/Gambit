function setDates(dates){
  dates = dates.split(',');
  $('#dates').multiDatesPicker({
    addDates: dates
  });
}
$(document).ready(function() {
  $("#dates").multiDatesPicker({
    dates
  });
});