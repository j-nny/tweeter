$(document).ready(function() {
  ``
    // const length = val.value.length;
    $("#tweetbox").keyup(function() {
      messageLength = document.querySelector('#textbox').value.length;
      document.querySelector('#counter').innerHTML=140-messageLength;
    });
});