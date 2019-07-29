const mainBody = document.getElementById("main");
const randomSub = document.getElementById("random");
const memeSub = document.getElementById("memes");
const freefolkSub = document.getElementById("freefolk");
const gunplaSub = document.getElementById("gunpla");
const subredditArray = [
  "https://www.reddit.com/r/engrish.json",
  "https://www.reddit.com/r/MonsterHunter.json",
  "https://www.reddit.com/r/ffxi.json",
  "https://www.reddit.com/r/metalgearsolid.json",
  "https://www.reddit.com/r/lotrmemes.json",
  "https://www.reddit.com/r/ShittySekiro.json",
  "https://www.reddit.com/r/ffxiv.json"
];
let makeRandom = subredditArray[Math.floor(Math.random() * 7)];

const newJs = new XMLHttpRequest();
newJs.addEventListener("load", loadpageJs);
newJs.open("GET", "https://www.reddit.com/r/memes.json");
newJs.send();

function loadpageJs() {
  let thisPage = JSON.parse(this.responseText);
  let thisData = thisPage.data.children;
  mainBody.innerHTML = "";
  for (let i = 0; i < thisData.length; i++) {
    let divBox = document.createElement("div");
    divBox.id = "divBox";
    mainBody.appendChild(divBox);
    if (thisData[i].data.preview) {
      let thisPic = document.createElement("img");
      thisPic.src = thisData[i].data.preview.images[0].source.url.replace(
        /&amp;/g,
        "&"
      );
      thisPic.style.height = "400px";
      thisPic.style.width = "350px";
      divBox.appendChild(thisPic);
    } else {
      let thisPic = document.createElement("img");
      thisPic.src = placeholderImg;
      divBox.appendChild(thisPic);
    }
    let thisTitle = document.createElement("h2");
    thisTitle.innerHTML = thisData[i].data.title;
    divBox.appendChild(thisTitle);
    let thisInfo = document.createElement("p");
    let author = thisData[i].data.author;
    let time = moment.unix(thisData[i].data.created).fromNow();
    let subreddit = thisData[i].data.subreddit;
    let upvotes = thisData[i].data.ups;
    thisInfo.innerHTML =
      "By: " +
      author +
      " | r/" +
      subreddit +
      " | Upvotes: " +
      upvotes +
      " | Uploaded: " +
      time;
    divBox.appendChild(thisInfo);

    let thisBody = document.createElement("p");
    if (thisData[i].data.selftext.length <= 100) {
      thisBody.innerHTML = thisData[i].data.selftext;
    } else {
      thisBody.innerHTML = thisData[i].data.selftext.slice(0, 99);
      let readMore = document.createElement("button");
      readMore.innerHTML = "More...";
      readMore.style.display = "block";
      let readLess = document.createElement("button");
      readLess.innerHTML = "Less...";
      readLess.style.display = "none";
      readMore.addEventListener("click", function() {
        readMore.style.display = "none";
        thisBody.innerHTML = thisData[i].data.selftext;
        readLess.style.display = "block";
        thisBody.appendChild(readLess);
      });
      readLess.addEventListener("click", function() {
        thisBody.innerHTML = thisData[i].data.selftext.slice(0, 99);
        thisBody.appendChild(readMore);
        readMore.style.display = "block";
      });
      thisBody.appendChild(readMore);
    }
    divBox.appendChild(thisBody);
  }
}
randomSub.addEventListener("click", function() {
  let newReq = new XMLHttpRequest();
  newReq.open("GET", makeRandom);
  newReq.send();
  newReq.addEventListener("load", loadpageJs);
});
memeSub.addEventListener("click", function() {
  let newReq = new XMLHttpRequest();
  newReq.open("GET", "https://www.reddit.com/r/memes.json");
  newReq.send();
  newReq.addEventListener("load", loadpageJs);
});
freefolkSub.addEventListener("click", function() {
  let newReq = new XMLHttpRequest();
  newReq.open("GET", "https://www.reddit.com/r/freefolk.json");
  newReq.send();
  newReq.addEventListener("load", loadpageJs);
});
gunplaSub.addEventListener("click", function() {
  let newReq = new XMLHttpRequest();
  newReq.open("GET", "https://www.reddit.com/r/gunpla.json");
  newReq.send();
  newReq.addEventListener("load", loadpageJs);
});

//sorry
const placeholderImg =
  "data:image/jpeg;base64,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";
