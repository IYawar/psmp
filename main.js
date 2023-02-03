const imagesPerPage = 20;
const section = document.getElementById("content-section");

const input = document.createElement("input");
input.type = "file";
input.multiple = true;
input.webkitdirectory = true;
input.style.display = "none";
document.getElementById("content-section").appendChild(input);

input.addEventListener("change", function () {
  const files = this.files;
  const imagePaths = [];
  for (let i = 0; i < files.length; i++) {
    if (files[i].type.startsWith("image/")) {
      imagePaths.push(URL.createObjectURL(files[i]));
    }
  }

  let imageElements = imagePaths.map((imagePath) => {
    let img = document.createElement("img");
    img.src = imagePath;
    img.alt = "Image";
    return img;
  });

  for (let i = 0; i < imageElements.length; i += imagesPerPage) {
    let pageImages = imageElements.slice(i, i + imagesPerPage);
    let div = document.createElement("div");
    div.classList.add("template");
    div.innerHTML = pageImages.map((e) => e.outerHTML).join("");
    section.appendChild(div);
  }

  // Add navigation buttons
  const numPages = Math.ceil(imageElements.length / imagesPerPage);
  let currentPage = 1;
  function showPage(page) {
    let templates = Array.from(section.getElementsByClassName("template"));
    templates.forEach((template) => (template.style.display = "none"));
    templates
      .slice((page - 1) * imagesPerPage, page * imagesPerPage)
      .forEach((template) => (template.style.display = "block"));
    currentPage = page;
  }
  // Render the first page of templates on the page
  showPage(currentPage);
  const prevButton = document.createElement("button");
  prevButton.innerHTML = "Prev";
  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      showPage(currentPage - 1);
    }
  });
  section.appendChild(prevButton);
  const nextButton = document.createElement("button");
  nextButton.innerHTML = "Next";
  nextButton.addEventListener("click", () => {
    if (currentPage < numPages) {
      showPage(currentPage + 1);
    }
  });
  section.appendChild(nextButton);
});

input.click();
