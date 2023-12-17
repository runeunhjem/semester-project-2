import { listingsEndsSoon } from "../api/listings-ends-soon.mjs";
import { createListingCard } from "../make-html/latest-listings-card.mjs";

export async function displayEndsSoonListings() {
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
    const spinner3 = document.getElementById("spinner3");
    if (!spinner3) return;
    spinner3.classList.remove("d-none");
    const listings = await listingsEndsSoon();

    // Get the container where the listings should be displayed
    const endsSoonAuctionsContainer =
      document.getElementById("ends-soon-auctions");
    if (!endsSoonAuctionsContainer) return;
    endsSoonAuctionsContainer.innerHTML = "";

    // Append each listing card to the container
    listings.forEach(listing => {
      const listingCard = createListingCard(listing);
      endsSoonAuctionsContainer.appendChild(listingCard);
    });
    spinner3.classList.add("d-none");
  } catch (error) {
    console.error("Error displaying latest listings:", error);
  }
}
