import { fetchAllListingsWithMedia } from "../api/listings-all-with-media.mjs";
import { createListingCard } from "../make-html/latest-listings-card.mjs";

export async function displayLatestListings() {
  if (
    window.location.href.includes("login") ||
    window.location.href.includes("profile") ||
    window.location.href.includes("listing")
  ) {
    return;
  }
  const spinner = document.getElementById("spinner");
  spinner.classList.remove("d-none");
  try {
    const listings = await fetchAllListingsWithMedia();

    // Get the container where the listings should be displayed
    const latestAuctionsContainer = document.getElementById("latest-auctions");
    if (!latestAuctionsContainer) return; // Exit if the container is not found

    // Append each listing card to the container
    listings.forEach(listing => {
      const listingCard = createListingCard(listing);
      latestAuctionsContainer.appendChild(listingCard);
    });
    spinner.classList.add("d-none");
  } catch (error) {
    console.error("Error displaying latest listings:", error);
  }
}
