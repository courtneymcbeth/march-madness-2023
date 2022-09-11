// Requiring fs module in which
// readFile function is defined.
const fs = require('fs')

var found = false;
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const fname = urlParams.getAll('fname');
const lname = urlParams.getAll('lname');
console.log(urlParams.getAll('fname'));
console.log(urlParams.getAll('lname'));
const fullname = fname[0] + " " + lname[0];

// Reading data in utf-8 format
// which is a type of character set.
// Instead of 'utf-8' it can be 
// other character set also like 'ascii'
fs.readFile('authorized.txt', 'utf-8', (err, data) => {
  if (err) throw err;

  // Converting Raw Buffer to text
  // data using tostring function.
  console.log(data);
  found = data.toString().includes(fullname)
})

if (!found) {
  document.getElementById("auth_label").innerText = "Sorry, you are not authorized to join...";
} else {
  document.getElementById("auth_label").innerText = "Welcome " + fname + ", enter your choices below: ";
  document.getElementById("bracket").style.visibility = "visible";
}