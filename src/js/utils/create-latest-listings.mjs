import { latestListings } from "../api/listings-latest.mjs";
import { createListingCard } from "../make-html/latest-listings-card.mjs";

export async function displayLatestListings() {
  try {
    const listings = await latestListings();

    // Get the container where the listings should be displayed
    const latestAuctionsContainer = document.getElementById("latest-auctions");
    if (!latestAuctionsContainer) return; // Exit if the container is not found
    // Clear previous content (if necessary)
    // latestAuctionsContainer.innerHTML = "";

    // Append each listing card to the container
    listings.forEach(listing => {
      const listingCard = createListingCard(listing);
      latestAuctionsContainer.appendChild(listingCard);
    });
  } catch (error) {
    console.error("Error displaying latest listings:", error);
  }
}
