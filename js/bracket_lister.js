var gold = {};

async function listBrackets() {
  let xhr = new XMLHttpRequest();
  var get_url = 'https://api.github.com/repos/courtneymcbeth/march-madness-2023/issues';
  get_url += '?state=all';
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

    brack_list.innerHTML += '<a href="https://courtneymcbeth.github.io/march-madness-2023/bracket?number=' + b.number.toString() + '">';
    brack_list.innerHTML += '<div class="brack_over">';
    brack_list.innerHTML += '<img src="' + b.img + '"/>';
    brack_list.innerHTML += '<div class="brack_over_data">';
    brack_list.innerHTML += '<div class="brack_over_data_top">';
    brack_list.innerHTML += '<h2>' + b.name + '</h2>';
    brack_list.innerHTML += '<h2>#' + (i + 1).toString() + '</h2>';
    brack_list.innerHTML += '</div><div class="brack_over_data_bot">';
    brack_list.innerHTML += '<h3>Score: ' + b.score.toString() + '</h3>';
    brack_list.innerHTML += '</div></div></div></a>';
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
  obj["name"] = data["user"]["login"];
  obj["number"] = data["number"];
  obj["score"] = calcScore(JSON.parse(data.body));
  return obj;
}

function calcScore(brack) {
  var score = 0;

  var regions = ["west", "east", "south", "midwest"];
  for (let i = 0; i < regions.length; i++) {
    for (let j = 0; j < brack[regions[i]]["second"].length; j++) {
      if (brack[regions[i]]["second"][j] === gold[regions[i]]["second"][j]) {
        score = score + 1;
      }
    }

    for (let j = 0; j < brack[regions[i]]["sweet16"].length; j++) {
      if (brack[regions[i]]["sweet16"][j] === gold[regions[i]]["sweet16"][j]) {
        score = score + 2;
      }
    }

    for (let j = 0; j < brack[regions[i]]["elite8"].length; j++) {
      if (brack[regions[i]]["elite8"][j] === gold[regions[i]]["elite8"][j]) {
        score = score + 4;
      }
    }

    if (brack["final4"][regions[i]] === gold["final4"][regions[i]]) {
      score = score + 8;
    }
  }

  if (brack["championship"]["east-west"] === gold["championship"]["east-west"]) {
    score = score + 16;
  }

  if (brack["championship"]["south-midwest"] === gold["championship"]["south-midwest"]) {
    score = score + 16;
  }

  if (brack["championship"]["winner"] === gold["championship"]["winner"]) {
    score = score + 32;
  }

  return score;
}