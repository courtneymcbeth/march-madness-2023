var links = document.getElementsByClassName("player_link_inside");

const url = window.location.href.split('/');

for (var link of links) {
  const name = link.innerHTML;
  const name_lc = name.toLowerCase();
  if (url[url.length - 2].includes(name_lc)) {
    link.style.color = "#005eb8";
  }
}