const imageFolder = "../patterns/Atamena/";
const naxshFolder = "../patterns/Naxsh/";
const images = [];
const pageSize = 21;

$("#atamena").click(function () {
  $(".open-tab").removeClass("open-tab");
  $("#atamena").addClass("open-tab");
});
$("#bakra").click(function () {
  $(".open-tab").removeClass("open-tab");
  $("#bakra").addClass("open-tab");
});
$("#sim").click(function () {
  $(".open-tab").removeClass("open-tab");
  $("#sim").addClass("open-tab");
});

fetch(imageFolder)
  .then((response) => response.text())
  .then((html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const links = [...doc.querySelectorAll("a")];

    links.forEach((link) => {
      if (link.href.match(/\.(jpe?g|png|gif)$/i)) {
        images.push(link.href);
      }
    });

    let pageNumber = 1;
    displayPage(pageNumber);

    // Function to display a page of images
    function displayPage(pageNumber) {
      let totalPages = Math.ceil(images.length / pageSize);

      let buttonContainer = document.createElement("div");
      buttonContainer.classList.add("button-container");

      // Show previous button
      if (pageNumber > 1) {
        let prevButton = document.createElement("button");
        prevButton.id = "prev";
        prevButton.innerHTML = "Prev";
        prevButton.addEventListener("click", () => displayPage(pageNumber - 1));
        buttonContainer.appendChild(prevButton);
      }

      // Show first three pages
      for (let i = 1; i <= 3 && i <= totalPages; i++) {
        let pageButton = document.createElement("button");
        pageButton.innerHTML = i;
        pageButton.addEventListener("click", () => displayPage(i));
        buttonContainer.appendChild(pageButton);
      }

      // Show dots in between
      if (totalPages > 3 && pageNumber > 3 && pageNumber < totalPages - 2) {
        let dots = document.createElement("span");
        dots.innerHTML = "...";
        buttonContainer.appendChild(dots);
      }

      // Show last three pages
      for (let i = totalPages - 2; i <= totalPages; i++) {
        if (i > 3) {
          let pageButton = document.createElement("button");
          pageButton.innerHTML = i;
          pageButton.addEventListener("click", () => displayPage(i));
          buttonContainer.appendChild(pageButton);
        }
      }

      // Show next button
      if (pageNumber < totalPages) {
        let nextButton = document.createElement("button");
        nextButton.id = "next";
        nextButton.innerHTML = "Next";
        nextButton.addEventListener("click", () => displayPage(pageNumber + 1));
        buttonContainer.appendChild(nextButton);
      }

      document.querySelector("#buttons").innerHTML = "";
      document.querySelector("#buttons").appendChild(buttonContainer);

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
        <a href="${naxsh}" download="${o}.dst"><p>Naxsh ${o}</p></a>
        </div>`;
        document.querySelector("#content-section").innerHTML += template;
      }
      // let totalPages = Math.ceil(images.length / pageSize);
      // let buttonContainer = document.createElement("div");
      // buttonContainer.classList.add("button-container");
      // if (pageNumber > 1) {
      //   let prevButton = document.createElement("button");
      //   prevButton.id = "prev";
      //   prevButton.innerHTML = "Prev";
      //   prevButton.addEventListener("click", () => displayPage(pageNumber - 1));
      //   buttonContainer.appendChild(prevButton);
      // }
      // for (let i = 1; i <= totalPages; i++) {
      //   let pageButton = document.createElement("button");
      //   pageButton.innerHTML = i;
      //   pageButton.addEventListener("click", () => displayPage(i));
      //   buttonContainer.appendChild(pageButton);
      // }
      // if (pageNumber < totalPages) {
      //   let nextButton = document.createElement("button");
      //   nextButton.id = "next";
      //   nextButton.innerHTML = "Next";
      //   nextButton.addEventListener("click", () => displayPage(pageNumber + 1));
      //   buttonContainer.appendChild(nextButton);
      // }
      document.querySelector("#buttons").innerHTML = "";
      document.querySelector("#buttons").appendChild(buttonContainer);
    }
  })
  .catch((error) => console.error(error));
