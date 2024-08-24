let uinput = document.querySelector("form");
let input = document.querySelector(".searchbox");
let imgdes = document.querySelector(".descr");
let msg = document.querySelector(".displaymsg");
let img = document.querySelector(".img");
let imgcont = document.querySelector(".imgcont");
let container = document.querySelector(".container");
const load = document.querySelector(".load");
const aid = "tzzFJ_TPNV5p2fyKf6oiQdj4q0U4uWrLhHZOKEBo63s";
const loadbtn = document.querySelector(".loadbtn");
let pageno = 1;

function main() {
  uinput.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = input.value.trim();

    if (input.value == "") {
      console.log("no search");
      msg.innerText = "Please Enter A Search Term";
      load.style.display = "none";
      container.innerHTML = "";
    } else {
      pageno = 1;
      container.innerHTML = "";
      fetchimg(query);
    }
  });

  async function fetchimg(query) {
    let getpic = await fetch(
      `https://api.unsplash.com/search/photos?query=${query}&page=${pageno}&per_page=16&client_id=${aid}`
    );

    let responsedata = await getpic.json();

    container.style.display = "flex";
    let send = responsedata.results;
    console.log(send);
    

    if (send.length === 0) {
      msg.innerText = "No images found for the specified search term";
      load.style.display = "none";
      container.innerHTML = "";
    } else {
      msg.innerText = "";
      getpictures(send);
    }
  }

  const getpictures = (photos) => {
    container.innerHTML += photos
      .map(
        (photo) =>
          `<div class="img">
          <img class="imgcont" src="${photo.urls.regular}" alt="" />
          <div class="desc">
            <div class="descr">${photo.alt_description}</div>
          </div>
        </div>`
      )
      .join("");
    load.style.display = "block";
  };

  loadbtn.addEventListener("click", () => {
    pageno++;
    const query = input.value.trim();
    fetchimg(query);
  });
}

main();
