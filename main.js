import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyADX47tSOzGV-Xg3IzWdm1xMtDA3yOgbuQ",
  authDomain: "psmp-802f0.firebaseapp.com",
  projectId: "psmp-802f0",
  storageBucket: "psmp-802f0.appspot.com",
  messagingSenderId: "257212390718",
  appId: "1:257212390718:web:7c99c08629b680c3ee606f",
  measurementId: "G-MQELDS8XVP",
};
firebase.initializeApp(firebaseConfig);

// create a reference to the Firebase Storage bucket
const storageRef = firebase.storage().ref();
const naxshFolder = "patterns/Naxsh/";
const pageSize = 21;

$("#ata").click(function () {
  $(".open-tab").removeClass("open-tab");
  $("#ata").addClass("open-tab");
  $("#content-section").html("");
  render();
});
$("#bak").click(function () {
  $(".open-tab").removeClass("open-tab");
  $("#bak").addClass("open-tab");
  $("#content-section").html("");
  render();
});
$("#swm").click(function () {
  $(".open-tab").removeClass("open-tab");
  $("#swm").addClass("open-tab");
  $("#content-section").html("");
  render();
});

function render() {
  let imageFolder;

  if ($("#ata").hasClass("open-tab")) imageFolder = "Atamena";
  if ($("#swm").hasClass("open-tab")) imageFolder = "sim w mrw";
  if ($("#bak").hasClass("open-tab")) imageFolder = "bakara";

  storageRef
    .child(`patterns/${imageFolder}`)
    .listAll()
    .then((result) => {
      let images = [];

      result.items.forEach((itemRef) => {
        if (itemRef.name.match(/\.(jpe?g|png|gif)$/i)) {
          itemRef.getDownloadURL().then((url) => {
            images.push(url);
          });
        }
      });

      let pageNumber = 1;
      displayPage(pageNumber);

      function displayPage(pageNumber) {
        let startIndex = (pageNumber - 1) * pageSize;
        let endIndex = startIndex + pageSize;
        let pageImages = images.slice(startIndex, endIndex);

        document.querySelector("#content-section").innerHTML = "";
        for (let i = 0; i < pageImages.length; i++) {
          let alt = `Image ${startIndex + i + 1}`;
          let o = pageImages[i].split("/").pop().split(".")[0];
          let naxsh = `../patterns/Naxsh/${o}.dst`;
          let template = `<div class="template">
            <img src="${pageImages[i]}" alt="${alt}" loading="lazy"/>
            <button class="download" onclick="location.href='${naxsh}'" download="${o}.dst">
            <p>Pattern ${o} <i class="fa-solid fa-download"></i></p>
            </button>
          </div>`;
          document.querySelector("#content-section").innerHTML += template;
        }
        let totalPages = Math.ceil(images.length / pageSize);
        document.getElementById("pages").innerHTML = "";
        document.getElementById("prev-butt").innerHTML = "";
        document.getElementById("next-butt").innerHTML = "";
        let buttonContainer = document.createElement("div");
        buttonContainer.classList.add("button-container");
        if (pageNumber > 1) {
          let prevButton = document.createElement("button");
          prevButton.id = "prev";
          prevButton.innerHTML = "Prev";
          prevButton.addEventListener("click", () =>
            displayPage(pageNumber - 1)
          );
          document.getElementById("prev-butt").appendChild(prevButton);
        }
        for (let i = 1; i <= totalPages; i++) {
          let pageButton = document.createElement("button");
          pageButton.innerHTML = i;
          pageButton.href = "#logo";
          pageButton.addEventListener("click", () => displayPage(i));
          buttonContainer.appendChild(pageButton);
          if (pageNumber == pageButton.innerHTML) {
            $(".current").removeClass("current");
            pageButton.classList.add("current");
          }
        }

        if (pageNumber < totalPages) {
          let nextButton = document.createElement("button");
          nextButton.id = "next";
          nextButton.innerHTML = "Next";
          nextButton.addEventListener("click", () =>
            displayPage(pageNumber + 1)
          );

          document.getElementById("next-butt").appendChild(nextButton);
        }

        document.getElementById("pages").appendChild(buttonContainer);
      }
    })
    .catch((error) => console.error(error));
}
