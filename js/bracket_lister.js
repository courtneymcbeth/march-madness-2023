var gold = {};

async function listBrackets() {
  let xhr = new XMLHttpRequest();
  var get_url = 'https://api.github.com/repos/courtneymcbeth/march-madness-2023/issues';
  get_url += '?state=open';
  xhr.open('GET', get_url, true);
  // xhr.setRequestHeader('Authorization', 'token ' + getQueryVariable('auth'));

  xhr.onload = function () {
    var ret_data = JSON.parse(this.responseText);
    console.log(ret_data);

    if (ret_data.length > 0) {
      var bracks = [];
      for (let i = 0; i < ret_data.length; i++) {
        bracks.push(brackToObj(ret_data[i]));
      }
      bracks.sort((a, b) => b.score - a.score);
      displayBracks(bracks);
    }
  };

  await readTextFile("gold_bracket.json", function (text) {
    gold = JSON.parse(text);
  });
  xhr.send();
}

function displayBracks(bracks) {
  var brack_list = document.getElementById("bracket_list");

  for (let i = 0; i < bracks.length; i++) {
    var b = bracks[i];
    var brackHTML = '<a href="https://courtneymcbeth.github.io/march-madness-2023/bracket?number=' + b.number.toString() + '">';
    brackHTML += '<div class="brack_over">';
    brackHTML += '<img src="' + b.imgurl + '"/>';
    brackHTML += '<div class="brack_over_data">';
    brackHTML += '<div class="brack_over_data_top">';
    brackHTML += '<h2 class="rank">#' + (i + 1).toString() + '</h2>';
    brackHTML += '<h2>' + b.name + '</h2>';
    brackHTML += '</div><div class="brack_over_data_bot">';
    brackHTML += '<h3>Score: ' + b.score.toString() + ' - Champion: ' + b.winner + '</h3>';
    brackHTML += '</div></div></div></a>';

    brack_list.innerHTML += brackHTML;
  }
  return;
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

function brackToObj(data) {
  obj = {};

  obj["imgurl"] = data["user"]["avatar_url"];
  obj["name"] = data["title"];
  obj["number"] = data["number"];
  obj["score"] = calcScore(JSON.parse(data.body));
  return obj;
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


function accessBuilder() {
  location.href = "https://courtneymcbeth.github.io/march-madness-2023/builder/bracket_creator";
}