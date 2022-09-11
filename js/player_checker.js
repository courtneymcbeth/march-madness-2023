const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const fname = urlParams.getAll('fname');
const lname = urlParams.getAll('lname');
console.log(urlParams.getAll('fname'));
console.log(urlParams.getAll('lname'));
const fullname = fname[0] + " " + lname[0];

fetch('authorized.txt')
  .then(response => response.text())
  .then(text => setDisplay(text));

function setDisplay(text) {
  console.log(text);

  const found = text.includes(fullname) && fname[0] && lname[0];
  if (!found) {
    document.getElementById("auth_label").innerText = "Sorry, you are not authorized to join...";
  } else {
    document.getElementById("auth_label").innerText = "Welcome " + fname + ", enter your choices below: ";
    document.getElementById("bracket").style.visibility = "visible";
  }
}