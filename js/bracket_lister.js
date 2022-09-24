function listBrackets() {
  let xhr = new XMLHttpRequest();
  var get_url = 'https://api.github.com/repos/courtneymcbeth/march-madness-2023/issues';
  get_url += '?state=all';
  xhr.open('GET', get_url, true);
  // xhr.setRequestHeader('Authorization', 'token ' + getQueryVariable('auth'));

  xhr.onload = function () {
    var ret_data = JSON.parse(this.responseText);
    console.log(ret_data);

    if (ret_data.length > 0) {
      var brack_list = document.getElementById("bracket_list");

      let i;
      for (i = 0; i < ret_data.length; i++) {
        brack_list.innerHTML += '<a href="https://courtneymcbeth.github.io/march-madness-2023/bracket?number=' + ret_data[i].number.toString() + '"><h2>' + ret_data[i].user.login + '</h2></a>';
      }
    }
  };
  xhr.send();
}