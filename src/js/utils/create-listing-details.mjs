import { fetchSingleListingById } from "../api/listings-singel-id.mjs";
import { createListingCard } from "../make-html/latest-listings-card.mjs";

const urlParams = new URLSearchParams(window.location.search);
const listingIdParam = urlParams.get("id");
console.log("listingIdParam", listingIdParam);

export async function displayListingDetails() {
  try {
    const listings = await fetchSingleListingById(listingIdParam);
    console.log("listings", listings);

    // Get the container where the listings should be displayed
    const listingDetailsContainer = document.getElementById("listingDetails");
    if (!listingDetailsContainer) return; // Exit if the container is not found
    // Clear previous content (if necessary)
    // listingDetailsContainer.innerHTML = "";
    // Append each listing card to the container
    const listingCard = createListingCard(listings);
    listingDetailsContainer.appendChild(listingCard);
  } catch (error) {
    console.error("Error displaying latest listings:", error);
  }
}
