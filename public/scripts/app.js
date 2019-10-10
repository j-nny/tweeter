/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  $("#writeNew").click(function() {
    $("#tweetForm").toggle()
    $("#textbox").focus()
  })
  
  // function checks validity (not null, 0 <= chars <= 140)
  const isMessageValid = function() {
    let tweetValue = $('#textbox').val();
    if (tweetValue.length === 0 || tweetValue === null) {
      $("#alert-0").removeClass("hide-alert").addClass("display-alert")
      setTimeout(function() {
        $("#alert-0").removeClass("display-alert").addClass("hide-alert")
      }, 20000)
      return false
    } else if (tweetValue.length > 140) {
      $("#alert-over140").removeClass("hide-alert").addClass("display-alert")
      setTimeout(function() {
        $("#alert-0").removeClass("display-alert").addClass("hide-alert")
      }, 20000)
      return false
    } else {
      return true
    }
  }

  // submits data from form to /tweets
  try{
    $("#tweetForm").submit(function (e) {
      e.preventDefault()
      if (isMessageValid()) {
        $.ajax('/tweets', {
          type: 'POST',
          data: $(this).serialize()
        })
        .success(function(data) {
          $('#tweets-container').empty();
          loadTweets();
          $('#textbox').val('')
        })
      }
    })
  } catch (error) {
    console.log(error);
  }

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
    if (daysAgo < 1 / 24) {
      return `${Math.round(Math.abs((dateCreated - today) / (60 * 1000)))} minutes ago`
    } else if (daysAgo < 24) {
      return `${Math.round(Math.abs((dateCreated - today) / (60 * 60 * 1000)))} hours ago`
    } else if (daysAgo * 365 >= 365) {
      return `${Math.round(Math.abs((dateCreated - today) / (365 * 24 * 60 * 60 * 1000)))} years ago`
    } else if (daysAgo * 365 / 12 >= 365 / 12) {
      return `${Math.round(Math.abs((dateCreated - today) / (365 / 12 * 24 * 60 * 60 * 1000)))} months ago` // only approximates months
    } else {
      return `${Math.round(daysAgo)} days ago`;
    }
  }

  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
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
      <span>${escape(tweetData.content.text)}</span>
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
  $("#tweets-container").prepend($tweet)
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