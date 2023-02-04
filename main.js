const imageFolder = "./patterns/Atamena/";
const images = [];

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
    console.log(images);
    // Loop through the images
    for (let i = 0; i < images.length; i++) {
      // Create an HTML element for each image
      const imgElement = document.createElement("img");
      imgElement.src = images[i];
      imgElement.alt = `Image ${i + 1}`;
      // Add the image element to the page
      document.body.appendChild(imgElement);
    }
  })
  .catch((error) => console.error(error));
