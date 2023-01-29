// Fetch the list of images in the folder
const imageFolder = "path/to/image/folder";
const imagesPerPage = 20;
fetch(imageFolder)
  .then((response) => response.json())
  .then((data) => {
    // Generate the HTML code for each template
    const templates = data.map((image) => {
      return `
        <div class="image-template">
          <img src="${imageFolder}/${image}" alt="Image">
          <p>${image}</p>
        </div>
      `;
    });
    // Pagination
    const numPages = Math.ceil(templates.length / imagesPerPage);
    let currentPage = 1;
    function showPage(page) {
      document.getElementById("template-container").innerHTML = templates
        .slice((page - 1) * imagesPerPage, page * imagesPerPage)
        .join("");
      currentPage = page;
    }
    // Render the first page of templates on the page
    showPage(currentPage);
    // Add navigation buttons
    const prevButton = document.createElement("button");
    prevButton.innerHTML = "Prev";
    prevButton.addEventListener("click", () => {
      if (currentPage > 1) {
        showPage(currentPage - 1);
      }
    });
    document.getElementById("template-container").appendChild(prevButton);
    const nextButton = document.createElement("button");
    nextButton.innerHTML = "Next";
    nextButton.addEventListener("click", () => {
      if (currentPage < numPages) {
        showPage(currentPage + 1);
      }
    });
    document.getElementById("template-container").appendChild(nextButton);
  });
