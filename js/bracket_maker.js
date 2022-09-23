var obj = {};
var numEmpty = 63;

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

function populateFirstRound() {
  readTextFile("gold_bracket.json", function (text) {
    var data = JSON.parse(text);
    fillInBlanks(data);
  });
}

function fillInBlanks(data) {
  obj = data;
  var children = [];
  var idx = 0;

  for (let i = 1; i < 9; i++) {
    children = document.getElementById("west-r1-" + i.toString()).children;
    children[0].innerText = data.west.first[idx];
    children[1].innerText = data.west.first[idx + 1];
    idx = idx + 2;
  }

  idx = 0;
  for (let i = 1; i < 9; i++) {
    children = document.getElementById("east-r1-" + i.toString()).children;
    children[0].innerText = data.east.first[idx];
    children[1].innerText = data.east.first[idx + 1];
    idx = idx + 2;
  }

  idx = 0;
  for (let i = 1; i < 9; i++) {
    children = document.getElementById("south-r1-" + i.toString()).children;
    children[0].innerText = data.south.first[idx];
    children[1].innerText = data.south.first[idx + 1];
    idx = idx + 2;
  }

  idx = 0;
  for (let i = 1; i < 9; i++) {
    children = document.getElementById("midwest-r1-" + i.toString()).children;
    children[0].innerText = data.midwest.first[idx];
    children[1].innerText = data.midwest.first[idx + 1];
    idx = idx + 2;
  }
}

function AddListeners() {
  var children = [];

  for (let i = 1; i < 9; i++) {
    children = document.getElementById("west-r1-" + i.toString()).children;
    children[0].addEventListener("click", function () {
      setNextOnClick("west-r1-" + i.toString(), 0);
    });
    children[1].addEventListener("click", function () {
      setNextOnClick("west-r1-" + i.toString(), 1);
    });
  }

  for (let i = 1; i < 5; i++) {
    children = document.getElementById("west-r2-" + i.toString()).children;
    children[0].addEventListener("click", function () {
      setNextOnClick("west-r2-" + i.toString(), 0);
    });
    children[1].addEventListener("click", function () {
      setNextOnClick("west-r2-" + i.toString(), 1);
    });
  }

  for (let i = 1; i < 3; i++) {
    children = document.getElementById("west-r3-" + i.toString()).children;
    children[0].addEventListener("click", function () {
      setNextOnClick("west-r3-" + i.toString(), 0);
    });
    children[1].addEventListener("click", function () {
      setNextOnClick("west-r3-" + i.toString(), 1);
    });
  }

  children = document.getElementById("west-r4").children;
  children[0].addEventListener("click", function () {
    setNextOnClick("west-r4", 0);
  });
  children[1].addEventListener("click", function () {
    setNextOnClick("west-r4", 1);
  });

  for (let i = 1; i < 9; i++) {
    children = document.getElementById("east-r1-" + i.toString()).children;
    children[0].addEventListener("click", function () {
      setNextOnClick("east-r1-" + i.toString(), 0);
    });
    children[1].addEventListener("click", function () {
      setNextOnClick("east-r1-" + i.toString(), 1);
    });
  }

  for (let i = 1; i < 5; i++) {
    children = document.getElementById("east-r2-" + i.toString()).children;
    children[0].addEventListener("click", function () {
      setNextOnClick("east-r2-" + i.toString(), 0);
    });
    children[1].addEventListener("click", function () {
      setNextOnClick("east-r2-" + i.toString(), 1);
    });
  }

  for (let i = 1; i < 3; i++) {
    children = document.getElementById("east-r3-" + i.toString()).children;
    children[0].addEventListener("click", function () {
      setNextOnClick("east-r3-" + i.toString(), 0);
    });
    children[1].addEventListener("click", function () {
      setNextOnClick("east-r3-" + i.toString(), 1);
    });
  }

  children = document.getElementById("east-r4").children;
  children[0].addEventListener("click", function () {
    setNextOnClick("east-r4", 0);
  });
  children[1].addEventListener("click", function () {
    setNextOnClick("east-r4", 1);
  });

  children = document.getElementById("f4-east-west").children;
  children[0].addEventListener("click", function () {
    setNextOnClick("f4-east-west", 0);
  });
  children[1].addEventListener("click", function () {
    setNextOnClick("f4-east-west", 1);
  });

  for (let i = 1; i < 9; i++) {
    children = document.getElementById("south-r1-" + i.toString()).children;
    children[0].addEventListener("click", function () {
      setNextOnClick("south-r1-" + i.toString(), 0);
    });
    children[1].addEventListener("click", function () {
      setNextOnClick("south-r1-" + i.toString(), 1);
    });
  }

  for (let i = 1; i < 5; i++) {
    children = document.getElementById("south-r2-" + i.toString()).children;
    children[0].addEventListener("click", function () {
      setNextOnClick("south-r2-" + i.toString(), 0);
    });
    children[1].addEventListener("click", function () {
      setNextOnClick("south-r2-" + i.toString(), 1);
    });
  }

  for (let i = 1; i < 3; i++) {
    children = document.getElementById("south-r3-" + i.toString()).children;
    children[0].addEventListener("click", function () {
      setNextOnClick("south-r3-" + i.toString(), 0);
    });
    children[1].addEventListener("click", function () {
      setNextOnClick("south-r3-" + i.toString(), 1);
    });
  }

  children = document.getElementById("south-r4").children;
  children[0].addEventListener("click", function () {
    setNextOnClick("south-r4", 0);
  });
  children[1].addEventListener("click", function () {
    setNextOnClick("south-r4", 1);
  });

  for (let i = 1; i < 9; i++) {
    children = document.getElementById("midwest-r1-" + i.toString()).children;
    children[0].addEventListener("click", function () {
      setNextOnClick("midwest-r1-" + i.toString(), 0);
    });
    children[1].addEventListener("click", function () {
      setNextOnClick("midwest-r1-" + i.toString(), 1);
    });
  }

  for (let i = 1; i < 5; i++) {
    children = document.getElementById("midwest-r2-" + i.toString()).children;
    children[0].addEventListener("click", function () {
      setNextOnClick("midwest-r2-" + i.toString(), 0);
    });
    children[1].addEventListener("click", function () {
      setNextOnClick("midwest-r2-" + i.toString(), 1);
    });
  }

  for (let i = 1; i < 3; i++) {
    children = document.getElementById("midwest-r3-" + i.toString()).children;
    children[0].addEventListener("click", function () {
      setNextOnClick("midwest-r3-" + i.toString(), 0);
    });
    children[1].addEventListener("click", function () {
      setNextOnClick("midwest-r3-" + i.toString(), 1);
    });
  }

  for (let i = 1; i < 2; i++) {
    children = document.getElementById("midwest-r4").children;
    children[0].addEventListener("click", function () {
      setNextOnClick("midwest-r4", 0);
    });
    children[1].addEventListener("click", function () {
      setNextOnClick("midwest-r4", 1);
    });
  }

  children = document.getElementById("f4-south-midwest").children;
  children[0].addEventListener("click", function () {
    setNextOnClick("f4-south-midwest", 0);
  });
  children[1].addEventListener("click", function () {
    setNextOnClick("f4-south-midwest", 1);
  });

  children = document.getElementById("f4-championship").children;
  children[0].addEventListener("click", function () {
    setNextOnClick("f4-championship", 0);
  });
  children[1].addEventListener("click", function () {
    setNextOnClick("f4-championship", 1);
  });
}

function setNextOnClick(id, pos) {
  var setTeam = document.getElementById(id).children[pos].innerText;
  if (setTeam.length < 1 || setTeam.trim().length < 1) {
    return;
  }

  var otherPos = 0;
  if (pos == 0) {
    otherPos = 1;
  }

  if (otherTeam.length > 0) {
    console.log("other team: " + otherTeam);
    console.log(otherTeam);
    // Clear the existing boxes with 
    var clearId = id;
    var clearPos = pos;
    var clearIdSplit = clearId.split("-");
    if (clearIdSplit[1] === "r1") {
      var num = parseInt(clearIdSplit[2]);
      var newNum = Math.ceil(num / 2);
      clearPos = (num + 1) % 2;
      clearId = clearIdSplit[0] + "-r2-" + newNum.toString();
      var children = document.getElementById(clearId).children;
      if (children[clearPos].innerText === otherTeam && otherTeam.trim().length > 0) {
        console.log("cleared" + children[clearPos].innerText)
        children[clearPos].innerText = "";
        clearIdSplit = clearId.split("-");
        numEmpty = numEmpty + 1;
      }
    }
    if (clearIdSplit[1] === "r2") {
      var num = parseInt(clearIdSplit[2]);
      var newNum = Math.ceil(num / 2);
      clearPos = (num + 1) % 2;
      clearId = clearIdSplit[0] + "-r3-" + newNum.toString();
      var children = document.getElementById(clearId).children;
      if (children[clearPos].innerText === otherTeam && otherTeam.trim().length > 0) {
        console.log("cleared" + children[clearPos].innerText)
        children[clearPos].innerText = "";
        clearIdSplit = clearId.split("-");
        numEmpty = numEmpty + 1;
      }
    }
    if (clearIdSplit[1] === "r3") {
      var num = parseInt(clearIdSplit[2]);
      var newNum = Math.ceil(num / 2);
      clearPos = (num + 1) % 2;
      clearId = clearIdSplit[0] + "-r4";
      var children = document.getElementById(clearId).children;
      if (children[clearPos].innerText === otherTeam && otherTeam.trim().length > 0) {
        console.log("cleared" + children[clearPos].innerText)
        children[clearPos].innerText = "";
        clearIdSplit = clearId.split("-");
        numEmpty = numEmpty + 1;
      }
    }
    if (clearIdSplit[1] === "r4") {
      if (clearIdSplit[0] === "west") {
        var children = document.getElementById("f4-east-west").children;
        if (children[0].innerText === otherTeam && otherTeam.trim().length > 0) {
          console.log("cleared" + children[0].innerText)
          children[0].innerText = "";
          clearId = "f4-east-west";
          numEmpty = numEmpty + 1;
        }
      } else if (clearIdSplit[0] === "east") {
        var children = document.getElementById("f4-east-west").children;
        if (children[1].innerText === otherTeam && otherTeam.trim().length > 0) {
          console.log("cleared" + children[1].innerText)
          children[1].innerText = "";
          clearId = "f4-east-west";
          numEmpty = numEmpty + 1;
        }
      } else if (clearIdSplit[0] === "south") {
        var children = document.getElementById("f4-south-midwest").children;
        if (children[0].innerText === otherTeam && otherTeam.trim().length > 0) {
          console.log("cleared" + children[0].innerText)
          children[0].innerText = "";
          clearId = "f4-south-midwest";
          numEmpty = numEmpty + 1;
        }
      } else if (clearIdSplit[0] === "midwest") {
        var children = document.getElementById("f4-south-midwest").children;
        if (children[1].innerText === otherTeam && otherTeam.trim().length > 0) {
          console.log("cleared" + children[1].innerText)
          children[1].innerText = "";
          clearId = "f4-south-midwest";
          numEmpty = numEmpty + 1;
        }
      }
    }
    if (clearId === "f4-east-west") {
      var children = document.getElementById("f4-championship").children;
      if (children[0].innerText === otherTeam && otherTeam.trim().length > 0) {
        console.log("cleared" + children[0].innerText)
        children[0].innerText = "";
        clearId = "f4-championship";
        numEmpty = numEmpty + 1;
      }
    } else if (clearId === "f4-south-midwest") {
      var children = document.getElementById("f4-championship").children;
      if (children[1].innerText === otherTeam && otherTeam.trim().length > 0) {
        console.log("cleared" + children[1].innerText)
        children[1].innerText = "";
        clearId = "f4-championship";
        numEmpty = numEmpty + 1;
      }
    }
  }
  if (clearId === "f4-championship" &&
    document.getElementById("f4-winner").innerText.trim().length > 7 &&
    document.getElementById("f4-winner").innerText.split(" ")[1] !== setTeam) {
    document.getElementById("f4-winner").innerText = "Winner: ";
    console.log("cleared" + document.getElementById("f4-winner").innerText)
    numEmpty = numEmpty + 1;
  }

  // Set the text of the next round match
  numEmpty = numEmpty - 1;
  const idSplit = id.split("-");
  if (idSplit[1] === "r1") {
    var num = parseInt(idSplit[2]);
    var newNum = Math.ceil(num / 2);
    var newPos = (num + 1) % 2;
    var newId = idSplit[0] + "-r2-" + newNum.toString();
    var children = document.getElementById(newId).children;
    children[newPos].innerText = setTeam;
    obj[idSplit[0]]["second"][newNum] = setTeam;
  } else if (idSplit[1] === "r2") {
    var num = parseInt(idSplit[2]);
    var newNum = Math.ceil(num / 2);
    var newPos = (num + 1) % 2;
    var newId = idSplit[0] + "-r3-" + newNum.toString();
    var children = document.getElementById(newId).children;
    children[newPos].innerText = setTeam;
    obj[idSplit[0]]["sweet16"][newNum] = setTeam;
  } else if (idSplit[1] === "r3") {
    var num = parseInt(idSplit[2]);
    var newNum = Math.ceil(num / 2);
    var newPos = (num + 1) % 2;
    var newId = idSplit[0] + "-r4";
    var children = document.getElementById(newId).children;
    children[newPos].innerText = setTeam;
    obj[idSplit[0]]["elite8"][newNum] = setTeam;
  } else if (idSplit[1] === "r4") {
    if (idSplit[0] === "west") {
      var children = document.getElementById("f4-east-west").children;
      children[0].innerText = setTeam;
      obj["final4"]["west"] = setTeam;
    } else if (idSplit[0] === "east") {
      var children = document.getElementById("f4-east-west").children;
      children[1].innerText = setTeam;
      obj["final4"]["east"] = setTeam;
    } else if (idSplit[0] === "south") {
      var children = document.getElementById("f4-south-midwest").children;
      children[0].innerText = setTeam;
      obj["final4"]["south"] = setTeam;
    } else if (idSplit[0] === "midwest") {
      var children = document.getElementById("f4-south-midwest").children;
      children[1].innerText = setTeam;
      obj["final4"]["midwest"] = setTeam;
    }
  } else if (id === "f4-east-west") {
    var children = document.getElementById("f4-championship").children;
    children[0].innerText = setTeam;
    obj["championship"]["east-west"] = setTeam;
  } else if (id === "f4-south-midwest") {
    var children = document.getElementById("f4-championship").children;
    children[1].innerText = setTeam;
    obj["championship"]["south-midwest"] = setTeam;
  } else if (id === "f4-championship") {
    document.getElementById("f4-winner").innerText = "Winner: " + setTeam;
    obj["championship"]["winner"] = setTeam;
  }
}

function checkSubmission() {
  if (numEmpty > 0) {
    document.getElementById("note").innerText = "Please fill in any blanks before submitting.";
    document.getElementById("note").style.color = "red";
    console.log(numEmpty);
    return;
  }

  var auth_code = getQueryVariable('auth');
  var post_url = 'https://api.github.com/repos/courtneymcbeth/march-madness-2023/issues';

  var req = new Object();
  req.title = "Bracket Test";
  req.body = JSON.stringify(obj);

  var jsonString = JSON.stringify(req);

  var xhr = new XMLHttpRequest();
  xhr.open("POST", post_url, true);
  var token = 'token ' + auth_code;
  xhr.setRequestHeader('Authorization', token);
  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.onreadystatechange = function () {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 201) {
      var ret_data = JSON.parse(this.responseText);
      console.log(ret_data)
    }
  }
  xhr.send(jsonString);
}