import { fetchSingleListingById } from "../api/listings-singel-id.mjs";
import { createListingCard } from "../make-html/latest-listings-card.mjs";
import { createImageGallery } from "../make-html/listing-image-gallery.mjs";

const urlParams = new URLSearchParams(window.location.search);
const listingIdParam = urlParams.get("id");
console.log("listingIdParam", listingIdParam);

export async function displayListingDetails() {
  try {
    const listing = await fetchSingleListingById(listingIdParam);
    // console.log("Single listing", listing);

    // Get the container where the listings should be displayed
    const listingDetailsContainer = document.getElementById("listingDetails");
    if (!listingDetailsContainer) return; // Exit if the container is not found
    // Clear previous content (if necessary)
    // listingDetailsContainer.innerHTML = "";
    // Append each listing card to the container
    const listingCard = createListingCard(listing);
    listingDetailsContainer.appendChild(listingCard);

    // Get the image gallery where the images should be displayed
    const imageGalleryContainer = document.getElementById("image-gallery");
    if (!imageGalleryContainer) return; // Exit if the container is not found
    // Clear previous content (if necessary)
    // imageGalleryContainer.innerHTML = "";
    // Append each listing card to the container
    createImageGallery(listing);
    // const imageGalleryCard = createImageGallery(listing);
    // imageGalleryContainer.appendChild(imageGalleryCard);
  } catch (error) {
    console.error("Error displaying latest listings:", error);
  }
}
