import { fetchAllListings } from "../api/listings-all.mjs";
import { createListingCard } from "../make-html/latest-listings-card.mjs";
import { populateCategories } from "../make-html/populate-categories.mjs";

export async function displayAllListings() {
  if (
    window.location.href.includes("login") ||
    window.location.href.includes("profile") ||
    window.location.href.includes("listing") ||
    window.location.href.includes("about") ||
    window.location.href.includes("contact")
  ) {
    return;
  }
  try {
    const spinner2 = document.getElementById("spinner2");
    if (!spinner2) return;
    spinner2.classList.remove("d-none");
    const allAuctionsContainer = document.getElementById("all-auctions");
    const listings = await fetchAllListings();

    await populateCategories(listings, "categories");

    if (!allAuctionsContainer) return;
    listings.forEach(listing => {
      const listingCard = createListingCard(listing);
      allAuctionsContainer.appendChild(listingCard);
    });

    spinner2.classList.add("d-none");
  } catch (error) {
    console.error("Error displaying all listings:", error);
  }
}
