async function listNav() {
  let xhr = new XMLHttpRequest();
  var get_url = 'https://api.github.com/repos/courtneymcbeth/march-madness-2023/issues';
  get_url += '?state=open';
  xhr.open('GET', get_url, true);

  xhr.onload = function () {
    var ret_data = JSON.parse(this.responseText);
    console.log(ret_data);

    var players = document.getElementById("nav_players");

    if (ret_data.length > 0) {
      for (let i = 0; i < ret_data.length; i++) {
        var name = ret_data[i].title.split(" ")[0];
        var url = "https://courtneymcbeth.github.io/march-madness-2023/bracket?number=" + ret_data[i].number.toString();
        var link = '<li><a href="' + url + '">' + name + '</a></li>';
        players.innerHTML += link;
      }
    }
  };

  xhr.send();
}

listNav();