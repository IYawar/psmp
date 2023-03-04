const pageSize = 21;
import pat from "./patterns.json" assert { type: "json" };

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
  if ($("#ata").hasClass("open-tab")) imageFolder = pat.Atamena;
  if ($("#swm").hasClass("open-tab")) imageFolder = pat["sim w mrw"];
  if ($("#bak").hasClass("open-tab")) imageFolder = pat.bakra;

  let images = [];
  $.each(imageFolder, function (key, value) {
    images.push(value);
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
      let naxsh = pat.Naxsh[o];
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
      prevButton.addEventListener("click", () => displayPage(pageNumber - 1));
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
      nextButton.addEventListener("click", () => displayPage(pageNumber + 1));

      document.getElementById("next-butt").appendChild(nextButton);
    }

    document.getElementById("pages").appendChild(buttonContainer);
  }
}
render();
