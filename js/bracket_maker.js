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

  for (let i = 1; i < 9; i++) {
    children = document.getElementById("east-r1-" + i.toString()).children;
    children[0].addEventListener("click", function () {
      setNextOnClick("east-r1-" + i.toString(), 0);
    });
    children[1].addEventListener("click", function () {
      setNextOnClick("east-r1-" + i.toString(), 1);
    });
  }

  for (let i = 1; i < 9; i++) {
    children = document.getElementById("south-r1-" + i.toString()).children;
    children[0].addEventListener("click", function () {
      setNextOnClick("south-r1-" + i.toString(), 0);
    });
    children[1].addEventListener("click", function () {
      setNextOnClick("south-r1-" + i.toString(), 1);
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
}

function setNextOnClick(id, pos, text) {
  console.log(id);
  console.log(pos);
  console.log(text);

  const idSplit = id.split("-");
  if (idSplit[1] === "r1") {
    var num = parseInt(idSplit[2]);
    console.log(idSplit[2]);
    console.log(num);
    var newNum = Math.ceil(num / 2);
    var newPos = (num + 1) % 2;
    var newId = idSplit[0] + "-r2-" + newNum.toString();
    console.log(newId);
    console.log(newPos);
    var children = document.getElementById(newId).children;
    children[newPos].innerText = document.getElementById(id).children[pos].innerText;
  }
}