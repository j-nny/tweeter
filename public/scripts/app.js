/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//  counts remaining characters available in new tweet and changes colour to red when exceeded
$(document).ready(function() {
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

const tweetData= {
  "user": {
    "name": "Descartes",
    "avatars": "https://i.imgur.com/nlhLi3I.png",
    "handle": "@rd" },
  "content": {
    "text": "Je pense , donc je suis"
  },
  "created_at": 1461113959088
}

let createTweetElement = function(tweetData) {
  return `<article id="article">
  <header class="article-header">
    <div>
      <img class="av-resize" src="${tweetData.user.avatars}">
    </div>
      <span class="fullname">${tweetData.user.name}</span>
    <div class="userhandle">
      <span>${tweetData.user.handle}</span>
    </div>
  </header>
  <div class="tweet">
    <span>${tweetData.content.text}</span>
  </div>
  <footer id="tweet-footer">
    <span class="created">${tweetData.content.created_at}</span>
    <div class="icons">
      <img class="icon-resize" src="/images/flag.png"> 
      <img class="icon-resize" src="/images/like.png"> 
      <img class="icon-resize" src="/images/retweet.png"> 
    </div>
  </footer>
</article>
`};

const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$('#tweets-container').append($tweet); 