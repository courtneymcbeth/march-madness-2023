var gold = {};

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

  let xhr = new XMLHttpRequest();
  var get_url = 'https://api.github.com/repos/courtneymcbeth/march-madness-2023/issues';
  get_url += '/' + num;
  xhr.open('GET', get_url, true);
  // xhr.setRequestHeader('Authorization', 'token ' + getQueryVariable('auth'));

  xhr.onload = function () {
    var ret_data = JSON.parse(this.responseText);
    console.log(ret_data.body);

    document.getElementById("brack_label").innerText = "Bracket: " + ret_data.user.login;

    setTeams(JSON.parse(ret_data.body));
  };

  await readTextFile("gold_bracket.json", function (text) {
    gold = JSON.parse(text);
  });
  xhr.send();
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
      if (gold[regions[j]]["first"][idx].trim().length > 0) {
        if (data[regions[j]]["first"][idx] === gold[regions[j]]["first"][idx]) {
          children[0].classList.add("correct");
        } else {
          children[0].classList.add("wrong");
        }
      }

      children[1].innerText = data[regions[j]]["first"][idx + 1];
      if (gold[regions[j]]["first"][idx + 1].trim().length > 0) {
        if (data[regions[j]]["first"][idx + 1] === gold[regions[j]]["first"][idx + 1]) {
          children[1].classList.add("correct");
        } else {
          children[1].classList.add("wrong");
        }
      }
      idx = idx + 2;
    }

    // round 2
    var idx = 0;
    for (let i = 1; i < 5; i++) {
      children = document.getElementById(regions[j] + "-r2-" + i.toString()).children;
      children[0].innerText = data[regions[j]]["second"][idx];
      if (gold[regions[j]]["second"][idx].trim().length > 0) {
        if (data[regions[j]]["second"][idx] === gold[regions[j]]["second"][idx]) {
          children[0].classList.add("correct");
        } else {
          children[0].classList.add("wrong");
        }
      }

      children[1].innerText = data[regions[j]]["second"][idx + 1];
      if (gold[regions[j]]["second"][idx + 1].trim().length > 0) {
        if (data[regions[j]]["second"][idx + 1] === gold[regions[j]]["second"][idx + 1]) {
          children[1].classList.add("correct");
        } else {
          children[1].classList.add("wrong");
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
        if (data[regions[j]]["sweet16"][idx] === gold[regions[j]]["sweet16"][idx]) {
          children[0].classList.add("correct");
        } else {
          children[0].classList.add("wrong");
        }
      }

      children[1].innerText = data[regions[j]]["sweet16"][idx + 1];
      if (gold[regions[j]]["sweet16"][idx + 1].trim().length > 0) {
        if (data[regions[j]]["sweet16"][idx + 1] === gold[regions[j]]["sweet16"][idx + 1]) {
          children[1].classList.add("correct");
        } else {
          children[1].classList.add("wrong");
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
        if (data[regions[j]]["elite8"][idx] === gold[regions[j]]["elite8"][idx]) {
          children[0].classList.add("correct");
        } else {
          children[0].classList.add("wrong");
        }
      }

      children[1].innerText = data[regions[j]]["elite8"][idx + 1];
      if (gold[regions[j]]["elite8"][idx + 1].trim().length > 0) {
        if (data[regions[j]]["elite8"][idx + 1] === gold[regions[j]]["elite8"][idx + 1]) {
          children[1].classList.add("correct");
        } else {
          children[1].classList.add("wrong");
        }
      }
      idx = idx + 2;
    }
  }

  children = document.getElementById("f4-east-west").children;
  children[0].innerText = data.final4.west;
  if (gold["final4"]["west"].trim().length > 0) {
    if (data["final4"]["west"] === gold["final4"]["west"]) {
      children[0].classList.add("correct");
    } else {
      children[0].classList.add("wrong");
    }
  }

  children[1].innerText = data.final4.east;
  if (gold["final4"]["east"].trim().length > 0) {
    if (data["final4"]["east"] === gold["final4"]["east"]) {
      children[1].classList.add("correct");
    } else {
      children[1].classList.add("wrong");
    }
  }

  children = document.getElementById("f4-south-midwest").children;
  children[0].innerText = data.final4.south;
  if (gold["final4"]["south"].trim().length > 0) {
    if (data["final4"]["south"] === gold["final4"]["south"]) {
      children[0].classList.add("correct");
    } else {
      children[0].classList.add("wrong");
    }
  }

  children[1].innerText = data.final4.midwest;
  if (gold["final4"]["midwest"].trim().length > 0) {
    if (data["final4"]["midwest"] === gold["final4"]["midwest"]) {
      children[1].classList.add("correct");
    } else {
      children[1].classList.add("wrong");
    }
  }

  children = document.getElementById("f4-championship").children;
  children[0].innerText = data["championship"]["east-west"];
  if (gold["championship"]["east-west"].trim().length > 0) {
    if (data["championship"]["east-west"] === gold["championship"]["east-west"]) {
      children[0].classList.add("correct");
    } else {
      children[0].classList.add("wrong");
    }
  }

  children[1].innerText = data["championship"]["south-midwest"];
  if (gold["championship"]["south-midwest"].trim().length > 0) {
    if (data["championship"]["south-midwest"] === gold["championship"]["south-midwest"]) {
      children[0].classList.add("correct");
    } else {
      children[0].classList.add("wrong");
    }
  }

  document.getElementById("f4-winner").innerText = "Winner: " + data["championship"]["winner"];
  if (gold["championship"]["winner"].trim().length > 0) {
    if (data["championship"]["winner"] === gold["championship"]["winner"]) {
      document.getElementById("f4-winner").classList.add("correct");
    } else {
      document.getElementById("f4-winner").classList.add("wrong");
    }
  }
}