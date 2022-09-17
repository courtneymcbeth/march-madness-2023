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
  var children = document.getElementById("west-r1-1").children;
  children[0].innerText = data.west.first[0];
  children[1].innerText = data.west.first[1];

  children = document.getElementById("west-r1-2").children;
  children[0].innerText = data.west.first[2];
  children[1].innerText = data.west.first[3];

  children = document.getElementById("west-r1-3").children;
  children[0].innerText = data.west.first[4];
  children[1].innerText = data.west.first[5];

  children = document.getElementById("west-r1-4").children;
  children[0].innerText = data.west.first[6];
  children[1].innerText = data.west.first[7];

  children = document.getElementById("west-r1-5").children;
  children[0].innerText = data.west.first[8];
  children[1].innerText = data.west.first[9];

  children = document.getElementById("west-r1-6").children;
  children[0].innerText = data.west.first[10];
  children[1].innerText = data.west.first[11];

  children = document.getElementById("west-r1-7").children;
  children[0].innerText = data.west.first[12];
  children[1].innerText = data.west.first[13];

  children = document.getElementById("west-r1-8").children;
  children[0].innerText = data.west.first[14];
  children[1].innerText = data.west.first[15];
}