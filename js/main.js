const naxshFolder = "../patterns/Naxsh/";
const pageSize = 21;

$("#atamena").click(function () {
  $(".open-tab").removeClass("open-tab");
  $("#atamena").addClass("open-tab");
  $("#content-section").html("");
  render();
});
$("#bakra").click(function () {
  $(".open-tab").removeClass("open-tab");
  $("#bakra").addClass("open-tab");
  $("#content-section").html("");
  render();
});
$("#sim").click(function () {
  $(".open-tab").removeClass("open-tab");
  $("#sim").addClass("open-tab");
  $("#content-section").html("");
  render();
});

function render() {
  if ($("#atamena").hasClass("open-tab")) imageFolder = "../patterns/Atamena/";
  if ($("#sim").hasClass("open-tab")) imageFolder = "../patterns/sim w mrw/";
  if ($("#bakra").hasClass("open-tab")) imageFolder = "../patterns/bakra/";
  console.log(imageFolder);
  fetch(imageFolder)
    .then((response) => response.text())
    .then((html) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const links = [...doc.querySelectorAll("a")];
      let images = [];

      links.forEach((link) => {
        if (link.href.match(/\.(jpe?g|png|gif)$/i)) {
          images.push(link.href);
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
  <p>Pattern ${o}</p>
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
          pageButton.addEventListener("click", () => displayPage(i));
          buttonContainer.appendChild(pageButton);
          if (pageNumber == pageButton.innerHTML) {
            $(".current").removeClass("current");
            pageButton.classList.add("current");
          }
          console.log(pageNumber);
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
render();
