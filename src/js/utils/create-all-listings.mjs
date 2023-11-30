import { fetchAllListingsWithMedia } from "../api/listings-all-with-media.mjs";
import { createListingCard } from "../make-html/latest-listings-card.mjs";

export async function displayAllListings() {
  try {
    const listings = await fetchAllListingsWithMedia();
    console.log("All Listings with Media", listings);

    // Get the container where the listings should be displayed
    const allAuctionsContainer = document.getElementById("all-auctions");
    if (!allAuctionsContainer) return; // Exit if the container is not found

    // Filter listings to include only those with valid media
    const listingsWithValidMedia = listings.filter(listing => {
      if (listing.media.length === 0) return false;
      return listing.media.length > 1;
    });

    // Sort by 'created' in descending order (newest first)
    listingsWithValidMedia.sort(
      (a, b) => new Date(b.created) - new Date(a.created)
    );

    // Append each listing card to the container
    listingsWithValidMedia.forEach(listing => {
      const listingCard = createListingCard(listing);
      allAuctionsContainer.appendChild(listingCard);
    });

    const spinner2 = document.getElementById("spinner2");
    spinner2.classList.add("d-none");
  } catch (error) {
    console.error("Error displaying all listings:", error);
  }
}
