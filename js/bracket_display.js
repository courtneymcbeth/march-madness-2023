var gold = {};
var authCode = "";
var issueNum = -1;

/**
 * Decodes the url to get the requested parameter (for this page, 'auth')
 * @param {string} variable - the variable name
 * @returns {string} the requested parameter
 */
function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split('&');

  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');

    if (pair[0] === variable) {
      return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
    }
  }
}

function readTextFile(file, callback) {
  var rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4 && rawFile.status == "200") {
      callback(rawFile.responseText);
    }
  }
  rawFile.send(null);
}

async function loadBracket() {
  var num = getQueryVariable('number');
  issueNum = parseInt(num);

  let xhr = new XMLHttpRequest();
  var get_url = 'https://api.github.com/repos/courtneymcbeth/march-madness-2023/issues';
  get_url += '/' + num;
  xhr.open('GET', get_url, true);
  // xhr.setRequestHeader('Authorization', 'token ' + getQueryVariable('auth'));

  xhr.onload = function () {
    var ret_data = JSON.parse(this.responseText);
    console.log(ret_data.body);

    var score = calcScore(JSON.parse(ret_data.body));
    var infoHTML = '<img src="' + ret_data["user"]["avatar_url"] + '" height="40px" width="40px" />';
    infoHTML += '<h5>' + ret_data.title + ' - Score: ' + score.toString() + '</h5>';
    document.getElementById("info_bar").innerHTML += infoHTML;
    document.title = "Bracket | " + ret_data.title.split(" ")[0];

    setTeams(JSON.parse(ret_data.body));
  };

  await readTextFile("gold_bracket.json", function (text) {
    gold = JSON.parse(text);
  });
  xhr.send();
}

function calcScore(brack) {
  var score = 0;

  var regions = ["west", "east", "south", "midwest"];
  for (let i = 0; i < regions.length; i++) {
    for (let j = 0; j < brack[regions[i]]["second"].length; j++) {
      if (brack[regions[i]]["second"][j].toUpperCase() === gold[regions[i]]["second"][j].toUpperCase()) {
        score = score + 1;
      }
    }

    for (let j = 0; j < brack[regions[i]]["sweet16"].length; j++) {
      if (brack[regions[i]]["sweet16"][j].toUpperCase() === gold[regions[i]]["sweet16"][j].toUpperCase()) {
        score = score + 2;
      }
    }

    for (let j = 0; j < brack[regions[i]]["elite8"].length; j++) {
      if (brack[regions[i]]["elite8"][j].toUpperCase() === gold[regions[i]]["elite8"][j].toUpperCase()) {
        score = score + 4;
      }
    }

    if (brack["final4"][regions[i]].toUpperCase() === gold["final4"][regions[i]].toUpperCase()) {
      score = score + 8;
    }
  }

  if (brack["championship"]["east-west"].toUpperCase() === gold["championship"]["east-west"].toUpperCase()) {
    score = score + 16;
  }

  if (brack["championship"]["south-midwest"].toUpperCase() === gold["championship"]["south-midwest"].toUpperCase()) {
    score = score + 16;
  }

  if (brack["championship"]["winner"].toUpperCase() === gold["championship"]["winner"].toUpperCase()) {
    score = score + 32;
  }

  return score;
}

function setTeams(data) {
  var children = [];
  var regions = ["east", "west", "south", "midwest"];

  for (let j = 0; j < regions.length; j++) {
    // round 1
    var idx = 0;
    for (let i = 1; i < 9; i++) {
      children = document.getElementById(regions[j] + "-r1-" + i.toString()).children;
      children[0].innerText = data[regions[j]]["first"][idx];
      children[1].innerText = data[regions[j]]["first"][idx + 1];
      idx = idx + 2;
    }

    // round 2
    var idx = 0;
    for (let i = 1; i < 5; i++) {
      children = document.getElementById(regions[j] + "-r2-" + i.toString()).children;
      children[0].innerText = data[regions[j]]["second"][idx];
      if (gold[regions[j]]["second"][idx].trim().length > 0) {
        if (data[regions[j]]["second"][idx].toUpperCase() === gold[regions[j]]["second"][idx].toUpperCase()) {
          children[0].classList.add("correct");
          children[0].innerHTML += '<span class="score">1</span>';
        } else {
          children[0].classList.add("wrong");
          children[0].innerHTML += '<span class="score">0</span>';
        }
      }

      children[1].innerText = data[regions[j]]["second"][idx + 1];
      if (gold[regions[j]]["second"][idx + 1].trim().length > 0) {
        if (data[regions[j]]["second"][idx + 1].toUpperCase() === gold[regions[j]]["second"][idx + 1].toUpperCase()) {
          children[1].classList.add("correct");
          children[1].innerHTML += '<span class="score">1</span>';
        } else {
          children[1].classList.add("wrong");
          children[1].innerHTML += '<span class="score">0</span>';
        }
      }
      idx = idx + 2;
    }

    // round 3
    var idx = 0;
    for (let i = 1; i < 3; i++) {
      children = document.getElementById(regions[j] + "-r3-" + i.toString()).children;
      children[0].innerText = data[regions[j]]["sweet16"][idx];
      if (gold[regions[j]]["sweet16"][idx].trim().length > 0) {
        if (data[regions[j]]["sweet16"][idx].toUpperCase() === gold[regions[j]]["sweet16"][idx].toUpperCase()) {
          children[0].classList.add("correct");
          children[0].innerHTML += '<span class="score">2</span>';
        } else {
          children[0].classList.add("wrong");
          children[0].innerHTML += '<span class="score">0</span>';
        }
      }

      children[1].innerText = data[regions[j]]["sweet16"][idx + 1];
      if (gold[regions[j]]["sweet16"][idx + 1].trim().length > 0) {
        if (data[regions[j]]["sweet16"][idx + 1].toUpperCase() === gold[regions[j]]["sweet16"][idx + 1].toUpperCase()) {
          children[1].classList.add("correct");
          children[1].innerHTML += '<span class="score">2</span>';
        } else {
          children[1].classList.add("wrong");
          children[1].innerHTML += '<span class="score">0</span>';
        }
      }
      idx = idx + 2;
    }

    // round 4
    var idx = 0;
    for (let i = 1; i < 2; i++) {
      children = document.getElementById(regions[j] + "-r4").children;
      children[0].innerText = data[regions[j]]["elite8"][idx];
      if (gold[regions[j]]["elite8"][idx].trim().length > 0) {
        if (data[regions[j]]["elite8"][idx].toUpperCase() === gold[regions[j]]["elite8"][idx].toUpperCase()) {
          children[0].classList.add("correct");
          children[0].innerHTML += '<span class="score">4</span>';
        } else {
          children[0].classList.add("wrong");
          children[0].innerHTML += '<span class="score">0</span>';
        }
      }

      children[1].innerText = data[regions[j]]["elite8"][idx + 1];
      if (gold[regions[j]]["elite8"][idx + 1].trim().length > 0) {
        if (data[regions[j]]["elite8"][idx + 1].toUpperCase() === gold[regions[j]]["elite8"][idx + 1].toUpperCase()) {
          children[1].classList.add("correct");
          children[1].innerHTML += '<span class="score">4</span>';
        } else {
          children[1].classList.add("wrong");
          children[1].innerHTML += '<span class="score">0</span>';
        }
      }
      idx = idx + 2;
    }
  }

  children = document.getElementById("f4-east-west").children;
  children[0].innerText = data.final4.west;
  if (gold["final4"]["west"].trim().length > 0) {
    if (data["final4"]["west"].toUpperCase() === gold["final4"]["west"].toUpperCase()) {
      children[0].classList.add("correct");
      children[0].innerHTML += '<span class="score">8</span>';
    } else {
      children[0].classList.add("wrong");
      children[0].innerHTML += '<span class="score">0</span>';
    }
  }

  children[1].innerText = data.final4.east;
  if (gold["final4"]["east"].trim().length > 0) {
    if (data["final4"]["east"].toUpperCase() === gold["final4"]["east"].toUpperCase()) {
      children[1].classList.add("correct");
      children[1].innerHTML += '<span class="score">8</span>';
    } else {
      children[1].classList.add("wrong");
      children[1].innerHTML += '<span class="score">0</span>';
    }
  }

  children = document.getElementById("f4-south-midwest").children;
  children[0].innerText = data.final4.south;
  if (gold["final4"]["south"].trim().length > 0) {
    if (data["final4"]["south"].toUpperCase() === gold["final4"]["south"].toUpperCase()) {
      children[0].classList.add("correct");
      children[0].innerHTML += '<span class="score">8</span>';
    } else {
      children[0].classList.add("wrong");
      children[0].innerHTML += '<span class="score">0</span>';
    }
  }

  children[1].innerText = data.final4.midwest;
  if (gold["final4"]["midwest"].trim().length > 0) {
    if (data["final4"]["midwest"].toUpperCase() === gold["final4"]["midwest"].toUpperCase()) {
      children[1].classList.add("correct");
      children[1].innerHTML += '<span class="score">8</span>';
    } else {
      children[1].classList.add("wrong");
      children[1].innerHTML += '<span class="score">0</span>';
    }
  }

  children = document.getElementById("f4-championship").children;
  children[0].innerText = data["championship"]["east-west"];
  if (gold["championship"]["east-west"].trim().length > 0) {
    if (data["championship"]["east-west"].toUpperCase() === gold["championship"]["east-west"].toUpperCase()) {
      children[0].classList.add("correct");
      children[0].innerHTML += '<span class="score">16</span>';
    } else {
      children[0].classList.add("wrong");
      children[0].innerHTML += '<span class="score">0</span>';
    }
  }

  children[1].innerText = data["championship"]["south-midwest"];
  if (gold["championship"]["south-midwest"].trim().length > 0) {
    if (data["championship"]["south-midwest"].toUpperCase() === gold["championship"]["south-midwest"].toUpperCase()) {
      children[1].classList.add("correct");
      children[1].innerHTML += '<span class="score">16</span>';
    } else {
      children[1].classList.add("wrong");
      children[1].innerHTML += '<span class="score">0</span>';
    }
  }

  document.getElementById("f4-winner").innerText = "Winner: " + data["championship"]["winner"];
  if (gold["championship"]["winner"].trim().length > 0) {
    if (data["championship"]["winner"].toUpperCase() === gold["championship"]["winner"].toUpperCase()) {
      document.getElementById("f4-winner").classList.add("correct");
      document.getElementById("f4-winner").innerText += ' - 32';
    } else {
      document.getElementById("f4-winner").classList.add("wrong");
      document.getElementById("f4-winner").innerText += ' - 0';
    }
  }
}

function displayComments() {
  if (typeof getQueryVariable('auth') !== "undefined") {
    document.getElementById("comment_form").style.visibility = "visible";
    document.getElementById("comment_sign_in").style.visibility = "hidden";
  }

  let xhr = new XMLHttpRequest();
  var get_url = 'https://api.github.com/repos/courtneymcbeth/march-madness-2023/issues/' + issueNum.toString() + '/comments';
  get_url += '?per_page=100';
  xhr.open('GET', get_url, true);
  // xhr.setRequestHeader('Authorization', 'token ' + getQueryVariable('auth'));

  xhr.onload = function () {
    var ret_data = JSON.parse(this.responseText);
    console.log(ret_data.body);

    var inside = document.getElementById("comments_inside");

    if (ret_data.length < 1) {
      inside.innerHTML += '<h1 class="first_comment">Be the first to comment...</h1>';
    } else {
      for (let i = 0; i < ret_data.length; i++) {
        var comm = '<div class="comment_outer"><div class="comment_top"><img src="' + ret_data[i].user.avatar_url + '"/>';
        comm += '<h2>' + ret_data[i].user.login + '</h2></div>';
        comm += '<p>' + ret_data[i].body + "</p></div>"
        inside.innerHTML += comm;
      }
    }
  };

  xhr.send();
}

function signIn() {
  if (typeof getQueryVariable('auth') === "undefined") {
    location.href = "https://courtneymcbeth.github.io/march-madness-2023/comment_auth?redir=" + location.href;
  }
}

function postComment() {
  if (typeof getQueryVariable('auth') === "undefined") {
    location.href = "https://courtneymcbeth.github.io/march-madness-2023/comment_auth?redir=" + location.href;
  }

  authCode = getQueryVariable('auth');
  var post_url = 'https://api.github.com/repos/courtneymcbeth/march-madness-2023/issues/' + issueNum + '/comments';

  var req = new Object();
  req.body = document.getElementById('comment_area').value.trim();

  var jsonString = JSON.stringify(req);

  var xhr = new XMLHttpRequest();
  xhr.open("POST", post_url, true);
  var token = 'token ' + authCode;
  xhr.setRequestHeader('Authorization', token);
  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.onreadystatechange = function () {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 201) {
      var ret_data = JSON.parse(this.responseText);
      console.log(ret_data)

      var inside = document.getElementById("comments_inside");

      var comm = '<div class="comment_outer"><div class="comment_top"><img src="' + ret_data.user.avatar_url + '"/>';
      comm += '<h2>' + ret_data.user.login + '</h2></div>';
      comm += '<p>' + ret_data.body + "</p></div>"
      inside.innerHTML += comm;
    }
  }
  xhr.send(jsonString);
}