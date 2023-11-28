import { fetchSingleListingById } from "../api/listings-singel-id.mjs";
import { createListingCard } from "../make-html/latest-listings-card.mjs";
import { createImageGallery } from "../make-html/listing-image-gallery.mjs";
import { createBidContainer } from "../make-html/create-bid-container.mjs";
import { updateCountdownDisplay } from "../utils/update-time-to-end.mjs"; // Adjust path as necessary

const urlParams = new URLSearchParams(window.location.search);
const listingIdParam = urlParams.get("id");

export async function displayListingDetails() {
  try {
    const listing = await fetchSingleListingById(listingIdParam);

    // Get the container where the listings should be displayed
    const listingDetailsContainer = document.getElementById("listingDetails");
    if (!listingDetailsContainer) return;

    // Append the listing card to the container
    const listingCard = createListingCard(listing);
    listingDetailsContainer.appendChild(listingCard);

    // Display the image gallery
    const imageGalleryContainer = document.getElementById("image-gallery");
    if (imageGalleryContainer) createImageGallery(listing);

    // Display the bid container
    createBidContainer(listing);

    // Get the elements for displaying current bid and seller's name
    const currentBidElement = document.getElementById("currentBid");
    const currentLeaderElement = document.getElementById("currentLeader");

    // Update the current bid and seller's name
    const highestBid = listing.bids.reduce(
      (max, bid) => (bid.amount > max ? bid.amount : max),
      0
    );
    if (currentBidElement) currentBidElement.textContent = highestBid;
    if (currentLeaderElement)
      currentLeaderElement.textContent = listing.seller.name;

    // Create and display countdown
    const countdownContainer = document.getElementById("countdown-container");
    if (countdownContainer) {
      const countdownDisplay = document.createElement("p");
      countdownDisplay.className = "countdown-display";
      countdownContainer.appendChild(countdownDisplay);

      // Update the countdown every second
      const countdownInterval = setInterval(() => {
        updateCountdownDisplay(
          listing.endsAt,
          countdownDisplay,
          countdownInterval
        );
      }, 1000);
    }
    // Create and append the countdown display element
    const countdownDisplay = document.createElement("p");
    countdownDisplay.className = "countdown-display";
    document.getElementById("place-bid").before(countdownDisplay);

    // Update the countdown every second
    const countdownInterval = setInterval(() => {
      updateCountdownDisplay(
        listing.endsAt,
        countdownDisplay,
        countdownInterval
      );
    }, 1000);
  } catch (error) {
    console.error("Error displaying listing details:", error);
  }
}
