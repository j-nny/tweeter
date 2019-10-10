$(document).ready(function() {
  $("#tweetbox").keyup(function() {
    messageLength = $("#textbox").val().length;
    $("#counter").html(140-messageLength);
    if ($("#counter").html() > 0 && $("#counter").html() <= 140) {
      $("#alert-0").slideUp('fast');
      $("#alert-over140").slideUp('fast')
    }
    if ($("#counter").html() < 0) {
      $("#counter").addClass("textred")
    } else {
      $("#counter").removeClass("textred")
    };
  });
});