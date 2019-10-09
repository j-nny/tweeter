/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  
  //  counts remaining characters available in new tweet and changes colour to red when exceeded
  $("#tweetbox").keyup(function() {
    messageLength = $("#textbox").val().length;
    $("#counter").html(140-messageLength);
    if ($("#counter").html() < 0) {
      $("#counter").addClass("textred")
    } else {
      $("#counter").removeClass("textred")
    };
  });

  // submits data from form to /tweets
  $("#tweetForm").submit(function (e) {
    e.preventDefault()
    $.ajax('/tweets', {
      type: 'POST',
      data: $(this).serialize()
    })
  })

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  let renderTweets = function(tweets) {
    for (let tweet of tweets) {
      createTweetElement(tweet);
    } 
  }

  //function takes unix code and returns how long ago it was in minutes/hours/days/approximate months/years
  const howLongAgo = function(unix) {
    const dateCreated = new Date(unix);
    const today = new Date();

    const countTime = 24 * 60 * 60 * 1000; // days ago
    const daysAgo = Math.abs((dateCreated - today) / countTime)
    if (daysAgo < 1 / (24 * 60)) {
      return `${Math.round(Math.abs((dateCreated - today) / (60 * 1000)))} minutes ago`
    } else if (daysAgo < 1 / 24) {
      return `${Math.round(Math.abs((dateCreated - today) / (60 * 60 * 1000)))} hours ago`
    } else if (daysAgo * 365 >= 365) {
      return `${Math.round(Math.abs((dateCreated - today) / (365 * 24 * 60 * 60 * 1000)))} years ago`
    } else if (daysAgo * 365 / 12 >= 365 / 12) {
      return `${Math.round(Math.abs((dateCreated - today) / (365 / 12 * 24 * 60 * 60 * 1000)))} months ago` // only approximates months
    } else {
      return `${Math.round(daysAgo)} days ago`;
    }
  }

  // function appends the new tweet to the tweets-container on the page
  let createTweetElement = function(tweetData) {
    let $tweet = `<article id="article">
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
      <span class="created">${howLongAgo(tweetData.created_at)}</span>
      <div class="icons">
        <img class="icon-resize" src="/images/flag.png"> 
        <img class="icon-resize" src="/images/like.png"> 
        <img class="icon-resize" src="/images/retweet.png"> 
      </div>
    </footer>
  </article>`
  $("#tweets-container").append($tweet)
  };

  // renderTweets(data);

  //function fetches data (array of tweets as JSON) from /tweets
  const loadTweets = function() {
    $.getJSON('/tweets', function(data) {
      renderTweets(data);
    })
  }

  loadTweets();

// close $(document).ready(function()
});