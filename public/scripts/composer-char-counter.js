$(document).ready(function() {
  $("#tweetbox").keyup(function() {
    messageLength = $("#textbox").val().length;
    $("#counter").html(140-messageLength);
    if ($("#counter").html() < 0) {
      $("#counter").addClass("textred")
    } else {
      $("#counter").removeClass("textred")
    };
  });
});