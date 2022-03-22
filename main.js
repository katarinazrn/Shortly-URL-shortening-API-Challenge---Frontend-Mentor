baseUrl = "https://api.shrtco.de/v2/shorten?url=";

let links = [];

if (sessionStorage.getItem("links")) {
  links = JSON.parse(sessionStorage.getItem("links"));
}

let linksElement = document.getElementById("links");

let linksCon = "";

if (links.length > 0) {
  links.reverse();
  links.forEach((l) => {
    let link =
      '<div class="link"><span>' +
      l.link +
      "</span>" +
      '<div><a href="' +
      l.shortLink +
      '">' +
      l.shortLink +
      "</a>" +
      '<button class="copy">Copy</button></div></div>';
    linksCon += link;
  });
  linksElement.innerHTML = linksCon;
}

function addLink(link, shortLink) {
  links.push({
    link,
    shortLink,
  });

  sessionStorage.setItem("links", JSON.stringify(links));

  let newLink =
    '<div class="link"><span>' +
    link +
    "</span>" +
    '<div class="res"><a href="' +
    shortLink +
    '">' +
    shortLink +
    "</a>" +
    '<button class="copy" onclick="handleCopy(`' +
    shortLink +
    '`)" id="copy-' +
    shortLink +
    '">Copy</button></div></div>';
  linksCon = newLink + linksCon;
  linksElement.innerHTML = linksCon;
}

function handleCopy(shortLink) {
  navigator.clipboard.writeText(shortLink);
  document.getElementById("copy-" + shortLink).classList.add("copied");

  let copyElements = document.getElementsByClassName("copy");
  for (let i = 0; i < copyElements.length; i++) {
    copyElements[i].innerHTML = "copy";
    copyElements[i].classList.remove = "copied";
  }

  document.getElementById("copy-" + shortLink).innerHTML = "Copied!";
}

document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
  let link = document.getElementById("link").value;
  link = link.trim();

  let inputElement = document.getElementById("input");

  if (link === "") {
    inputElement.classList.add("error");
    return;
  } else {
    inputElement.classList.remove("error");
  }

  fetch(baseUrl + link)
    .then((res) => res.json())
    .then((data) => {
      let shortLink = data.result?.full_short_link;
      addLink(link, shortLink);
    });
});
