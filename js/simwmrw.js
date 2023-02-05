const imageFolder = "../patterns/sim w mrw/";
const images = [];
const pageSize = 21; // Number of images to display per page

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
      let startIndex = (pageNumber - 1) * pageSize;
      let endIndex = startIndex + pageSize;
      let pageImages = images.slice(startIndex, endIndex);

      document.querySelector("#content-section").innerHTML = "";
      for (let i = 0; i < pageImages.length; i++) {
        let alt = `Image ${startIndex + i + 1}`;
        let template = `<div class="template">
        <img src="${pageImages[i]}" alt="${alt}" loading="lazy"/>
        <p>this is a text sample</p>
      </div>`;
        document.querySelector("#content-section").innerHTML += template;
      }
      let totalPages = Math.ceil(images.length / pageSize);
      let buttonContainer = document.createElement("div");
      buttonContainer.classList.add("button-container");
      if (pageNumber > 1) {
        let prevButton = document.createElement("button");
        prevButton.id = "prev";
        prevButton.innerHTML = "Prev";
        prevButton.addEventListener("click", () => displayPage(pageNumber - 1));
        buttonContainer.appendChild(prevButton);
      }
      for (let i = 1; i <= totalPages; i++) {
        let pageButton = document.createElement("button");
        pageButton.innerHTML = i;
        pageButton.addEventListener("click", () => displayPage(i));
        buttonContainer.appendChild(pageButton);
      }
      if (pageNumber < totalPages) {
        let nextButton = document.createElement("button");
        nextButton.id = "next";
        nextButton.innerHTML = "Next";
        nextButton.addEventListener("click", () => displayPage(pageNumber + 1));
        buttonContainer.appendChild(nextButton);
      }
      document.querySelector("#buttons").innerHTML = "";
      document.querySelector("#buttons").appendChild(buttonContainer);
    }
  })
  .catch((error) => console.error(error));
