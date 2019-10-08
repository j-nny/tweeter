$(document).ready(function() {
  ``
    // const length = val.value.length;
    $("#tweetbox").keyup(function() {
      messageLength = document.querySelector("#textbox").value.length;
      document.querySelector('#counter').innerHTML=140-messageLength;

      if (document.querySelector('#counter').innerHTML < 0) {
        document.getElementById("counter").style.color='red'
      } else {
        document.getElementById("counter").style.color="#545149"
      };
    });
});