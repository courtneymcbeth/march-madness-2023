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

var temp_code = getQueryVariable('code');

if (typeof temp_code !== "undefined") {
  var access_url = 'https://cors-cm.herokuapp.com/';
  access_url += 'https://github.com/login/oauth/access_token';
  access_url += '?client_id=1e8252b09f2cc75138a2';
  access_url += '&client_secret=56f8e566957449b8ae9a2c5b0ced45a7b8226224';
  access_url += '&code=';
  access_url += temp_code;

  var xhr = new XMLHttpRequest();
  xhr.open("POST", access_url, true);
  xhr.setRequestHeader('Accept', 'application/json');
  xhr.onreadystatechange = function () { // Call a function when the state changes.
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      console.log("got response");
      var ret_data = JSON.parse(this.responseText);
      var redir = 'https://courtneymcbeth.github.io/march-madness-2023/bracket_maker';
      redir += '?auth=';
      redir += ret_data.access_token;
      window.location.replace(redir);
    }
  }
  xhr.send();
  console.log("sent request");
} else {
  // somehow bypassed, send them back
  window.location.replace('https://courtneymcbeth.github.io/march-madness-2023/builder/bracket_creator');
}