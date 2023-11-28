export function createImageGallery(listing) {
  const imageGalleryContainer = document.getElementById("image-gallery");
  if (!imageGalleryContainer) {
    console.error("Image gallery container not found.");
    return;
  }

  // Set the gallery container to relative positioning
  imageGalleryContainer.style.position = "relative";

  // Create a container for the image gallery
  const galleryDiv = document.createElement("div");
  galleryDiv.className =
    "image-gallery d-flex flex-wrap justify-content-center";
  imageGalleryContainer.appendChild(galleryDiv);

  // Create an overlay div for the enlarged image
  const overlayDiv = document.createElement("div");
  overlayDiv.className =
    "overlay position-absolute top-0 start-50 translate-middle-x w-100 d-flex d-none justify-content-center align-items-center";
  overlayDiv.style.top = "-50px"; // Adjust the top position
  imageGalleryContainer.appendChild(overlayDiv); // Append to the gallery container

  // Create an img tag inside the overlay div
  const overlayImg = document.createElement("img");
  overlayImg.className = "img-fluid rounded shadow";
  overlayDiv.appendChild(overlayImg);

  // Create left and right navigation arrows
  const leftArrow = document.createElement("button");
  leftArrow.className =
    "btn btn-secondary position-absolute top-50 start-0 translate-middle-y text-white mt-6 ms-2";
  leftArrow.innerHTML = "&lt;"; // HTML code for left arrow
  overlayDiv.appendChild(leftArrow);

  const rightArrow = document.createElement("button");
  rightArrow.className =
    "btn btn-secondary position-absolute top-50 end-0 translate-middle-y text-white mt-6 me-2";
  rightArrow.innerHTML = "&gt;"; // HTML code for right arrow
  overlayDiv.appendChild(rightArrow);

  // Current image index
  let currentImageIndex = 0;

  // Function to update the overlay image
  function updateOverlayImage(index) {
    overlayImg.src = listing.media[index];
    currentImageIndex = index;
  }

  // Event listeners for arrows
  leftArrow.addEventListener("click", () => {
    const newIndex =
      currentImageIndex > 0 ? currentImageIndex - 1 : listing.media.length - 1;
    updateOverlayImage(newIndex);
  });

  rightArrow.addEventListener("click", () => {
    const newIndex =
      currentImageIndex < listing.media.length - 1 ? currentImageIndex + 1 : 0;
    updateOverlayImage(newIndex);
  });

  // Create image elements for each media URL
  listing.media.forEach((mediaUrl, index) => {
    const galleryItemColDiv = document.createElement("div");
    galleryItemColDiv.className = "col-auto p-1";
    galleryDiv.appendChild(galleryItemColDiv);

    const img = document.createElement("img");
    img.src = mediaUrl;
    img.className = "img-fluid gallery-images rounded shadow-sm";
    img.alt = `Image ${index + 1}`;

    // Event listener for image click
    img.addEventListener("click", () => {
      if (overlayDiv.classList.contains("d-none")) {
        updateOverlayImage(index);
        overlayDiv.classList.remove("d-none");
      } else {
        overlayDiv.classList.add("d-none");
      }
    });

    galleryItemColDiv.appendChild(img);
  });

  // Hide the overlay when clicking outside of the images
  document.addEventListener("click", e => {
    if (
      !e.target.classList.contains("gallery-images") &&
      !e.target.classList.contains("btn")
    ) {
      overlayDiv.classList.add("d-none");
    }
  });
}
