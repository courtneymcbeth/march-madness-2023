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

function loadBracket() {
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
  xhr.send();
}

function setTeams(data) {
  var children = [];

  var idx = 0;
  for (let i = 1; i < 9; i++) {
    children = document.getElementById("west-r1-" + i.toString()).children;
    children[0].innerText = data.west.first[idx];
    children[1].innerText = data.west.first[idx + 1];
    idx = idx + 2;
  }

  var idx = 0;
  for (let i = 1; i < 5; i++) {
    children = document.getElementById("west-r2-" + i.toString()).children;
    children[0].innerText = data.west.second[idx];
    children[1].innerText = data.west.second[idx + 1];
    idx = idx + 2;
  }

  var idx = 0;
  for (let i = 1; i < 3; i++) {
    children = document.getElementById("west-r3-" + i.toString()).children;
    children[0].innerText = data.west.sweet16[idx];
    children[1].innerText = data.west.sweet16[idx + 1];
    idx = idx + 2;
  }

  var idx = 0;
  for (let i = 1; i < 2; i++) {
    children = document.getElementById("west-r4").children;
    children[0].innerText = data.west.elite8[idx];
    children[1].innerText = data.west.elite8[idx + 1];
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
  for (let i = 1; i < 5; i++) {
    children = document.getElementById("east-r2-" + i.toString()).children;
    children[0].innerText = data.east.second[idx];
    children[1].innerText = data.east.second[idx + 1];
    idx = idx + 2;
  }

  idx = 0;
  for (let i = 1; i < 3; i++) {
    children = document.getElementById("east-r3-" + i.toString()).children;
    children[0].innerText = data.east.sweet16[idx];
    children[1].innerText = data.east.sweet16[idx + 1];
    idx = idx + 2;
  }

  idx = 0;
  for (let i = 1; i < 2; i++) {
    children = document.getElementById("east-r4").children;
    children[0].innerText = data.east.elite8[idx];
    children[1].innerText = data.east.elite8[idx + 1];
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
  for (let i = 1; i < 5; i++) {
    children = document.getElementById("south-r2-" + i.toString()).children;
    children[0].innerText = data.south.second[idx];
    children[1].innerText = data.south.second[idx + 1];
    idx = idx + 2;
  }

  idx = 0;
  for (let i = 1; i < 3; i++) {
    children = document.getElementById("south-r3-" + i.toString()).children;
    children[0].innerText = data.south.sweet16[idx];
    children[1].innerText = data.south.sweet16[idx + 1];
    idx = idx + 2;
  }

  idx = 0;
  for (let i = 1; i < 2; i++) {
    children = document.getElementById("south-r4").children;
    children[0].innerText = data.south.elite8[idx];
    children[1].innerText = data.south.elite8[idx + 1];
    idx = idx + 2;
  }

  idx = 0;
  for (let i = 1; i < 9; i++) {
    children = document.getElementById("midwest-r1-" + i.toString()).children;
    children[0].innerText = data.midwest.first[idx];
    children[1].innerText = data.midwest.first[idx + 1];
    idx = idx + 2;
  }

  idx = 0;
  for (let i = 1; i < 5; i++) {
    children = document.getElementById("midwest-r2-" + i.toString()).children;
    children[0].innerText = data.midwest.second[idx];
    children[1].innerText = data.midwest.second[idx + 1];
    idx = idx + 2;
  }

  idx = 0;
  for (let i = 1; i < 3; i++) {
    children = document.getElementById("midwest-r3-" + i.toString()).children;
    children[0].innerText = data.midwest.sweet16[idx];
    children[1].innerText = data.midwest.sweet16[idx + 1];
    idx = idx + 2;
  }

  idx = 0;
  for (let i = 1; i < 2; i++) {
    children = document.getElementById("midwest-r4").children;
    children[0].innerText = data.midwest.elite8[idx];
    children[1].innerText = data.midwest.elite8[idx + 1];
    idx = idx + 2;
  }

  children = document.getElementById("f4-east-west" + i.toString()).children;
  children[0].innerText = data.final4.west;
  children[1].innerText = data.final4.east;

  children = document.getElementById("f4-south-midwest" + i.toString()).children;
  children[0].innerText = data.final4.south;
  children[1].innerText = data.final4.midwest;

  children = document.getElementById("f4-championship" + i.toString()).children;
  children[0].innerText = data["championship"]["east-west"];
  children[1].innerText = data["championship"]["south-midwest"];

  document.getElementById("f4-winner").innerText = "Winner: " + data["championship"]["winner"];
}