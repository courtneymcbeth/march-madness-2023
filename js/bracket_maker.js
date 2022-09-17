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

  for (let i = 1; i < 2; i++) {
    children = document.getElementById("west-r4-" + i.toString()).children;
    children[0].addEventListener("click", function () {
      setNextOnClick("west-r4-" + i.toString(), 0);
    });
    children[1].addEventListener("click", function () {
      setNextOnClick("west-r4-" + i.toString(), 1);
    });
  }

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

  for (let i = 1; i < 2; i++) {
    children = document.getElementById("east-r4-" + i.toString()).children;
    children[0].addEventListener("click", function () {
      setNextOnClick("east-r4-" + i.toString(), 0);
    });
    children[1].addEventListener("click", function () {
      setNextOnClick("east-r4-" + i.toString(), 1);
    });
  }

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

  for (let i = 1; i < 2; i++) {
    children = document.getElementById("south-r4-" + i.toString()).children;
    children[0].addEventListener("click", function () {
      setNextOnClick("south-r4-" + i.toString(), 0);
    });
    children[1].addEventListener("click", function () {
      setNextOnClick("south-r4-" + i.toString(), 1);
    });
  }

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
    children = document.getElementById("midwest-r4-" + i.toString()).children;
    children[0].addEventListener("click", function () {
      setNextOnClick("midwest-r4-" + i.toString(), 0);
    });
    children[1].addEventListener("click", function () {
      setNextOnClick("midwest-r4-" + i.toString(), 1);
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
  if (document.getElementById(id).children[pos].innerText.length < 1) {
    return;
  }

  const idSplit = id.split("-");
  if (idSplit[1] === "r1") {
    var num = parseInt(idSplit[2]);
    var newNum = Math.ceil(num / 2);
    var newPos = (num + 1) % 2;
    var newId = idSplit[0] + "-r2-" + newNum.toString();
    var children = document.getElementById(newId).children;
    children[newPos].innerText = document.getElementById(id).children[pos].innerText;
  } else if (idSplit[1] === "r2") {
    var num = parseInt(idSplit[2]);
    var newNum = Math.ceil(num / 2);
    var newPos = (num + 1) % 2;
    var newId = idSplit[0] + "-r3-" + newNum.toString();
    var children = document.getElementById(newId).children;
    children[newPos].innerText = document.getElementById(id).children[pos].innerText;
  } else if (idSplit[1] === "r3") {
    var num = parseInt(idSplit[2]);
    var newNum = Math.ceil(num / 2);
    var newPos = (num + 1) % 2;
    var newId = idSplit[0] + "-r4-" + newNum.toString();
    var children = document.getElementById(newId).children;
    children[newPos].innerText = document.getElementById(id).children[pos].innerText;
  } else if (idSplit[1] === "r4") {
    if (idSplit[0] === "west") {
      var children = document.getElementById("f4-east-west").children;
      children[0].innerText = document.getElementById(id).children[pos].innerText;
    } else if (idSplit[0] === "east") {
      var children = document.getElementById("f4-east-west").children;
      children[1].innerText = document.getElementById(id).children[pos].innerText;
    } else if (idSplit[0] === "south") {
      var children = document.getElementById("f4-south-midwest").children;
      children[0].innerText = document.getElementById(id).children[pos].innerText;
    } else if (idSplit[0] === "midwest") {
      var children = document.getElementById("f4-south-midwest").children;
      children[1].innerText = document.getElementById(id).children[pos].innerText;
    }
  } else if (id === "f4-east-west") {
    var children = document.getElementById("f4-championship").children;
    children[0].innerText = document.getElementById(id).children[pos].innerText;
  } else if (id === "f4-south-midwest") {
    var children = document.getElementById("f4-championship").children;
    children[1].innerText = document.getElementById(id).children[pos].innerText;
  } else if (id === "f4-championship") {
    document.getElementById("f4-winner").innerText = document.getElementById(id).children[pos].innerText;
  }
}