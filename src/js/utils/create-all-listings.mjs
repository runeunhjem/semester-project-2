// import { fetchAllListingsWithMedia } from "../api/listings-all-with-media.mjs";
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
    if (!spinner2) return; // Exit if the spinner is not found (e.g. on the login page
    spinner2.classList.remove("d-none");
    const allAuctionsContainer = document.getElementById("all-auctions");
    // allAuctionsContainer.innerHTML = "";
    const listings = await fetchAllListings();
    // console.log("listings in create", listings);

    await populateCategories(listings, "categories");

    if (!allAuctionsContainer) return;
    // Append each listing card to the container
    listings.forEach(listing => {
      const listingCard = createListingCard(listing);
      allAuctionsContainer.appendChild(listingCard);
    });

    spinner2.classList.add("d-none");
  } catch (error) {
    console.error("Error displaying all listings:", error);
  }
}
