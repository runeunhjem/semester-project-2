// create-listing-details.mjs
import { fetchSingleListingById } from "../api/listings-singel-id.mjs";
import { createListingCard } from "../make-html/latest-listings-card.mjs";
import { createImageGallery } from "../make-html/listing-image-gallery.mjs";
import { createBidContainer } from "../make-html/create-bid-container.mjs";
import { updateCountdownDisplay } from "../utils/update-time-to-end.mjs"; // Adjust path as necessary
import { createBidEntry } from "../make-html/create-bid-history-entry.mjs";

const urlParams = new URLSearchParams(window.location.search);
const listingIdParam = urlParams.get("id");

export async function displayListingDetails() {
  try {
    const listing = await fetchSingleListingById(listingIdParam);

    // Set the page title to the listing title
    if (window.location.pathname === "/src/html/auction/listing.html") {
      document.title = `${listing.title} | DreamBids`;
      const listingTitle = document.getElementById("listingTitle");
      listingTitle.textContent = listing.title;
    }
    // Get the container where the listings should be displayed
    const listingDetailsContainer = document.getElementById("listingDetails");
    if (!listingDetailsContainer) return;

    // Append the listing card to the container
    const listingCard = createListingCard(listing);
    listingDetailsContainer.appendChild(listingCard);

    // Display the image gallery
    const imageGalleryContainer = document.getElementById("image-gallery");
    if (imageGalleryContainer) createImageGallery(listing);

    // Get the elements for displaying current bid and seller's name
    const currentBidElement = document.getElementById("currentBid");
    const currentLeaderElement = document.getElementById("currentLeader");

    // Find the highest bid
    let highestBid = 0;
    let highestBidderName = "";
    listing.bids.forEach(bid => {
      if (bid.amount > highestBid) {
        highestBid = bid.amount;
        highestBidderName = bid.bidderName;
      }
    });
    createBidContainer(highestBid);

    // Update the current bid and the name of the highest bidder
    if (currentBidElement) currentBidElement.textContent = highestBid;
    if (currentLeaderElement)
      currentLeaderElement.textContent = highestBidderName;

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

    // Create and display bid history
    const bidHistoryContainer = document.getElementById("bid-history");
    if (bidHistoryContainer) {
      // Sort bids by date in descending order (newest first)
      const sortedBids = listing.bids.sort(
        (a, b) => new Date(b.created) - new Date(a.created)
      );

      const showInitialBids = () => {
        bidHistoryContainer.innerHTML = ""; // Clear the container
        sortedBids.slice(0, 3).forEach(bid => {
          const bidEntry = createBidEntry(bid);
          bidHistoryContainer.appendChild(bidEntry);
        });
        bidHistoryContainer.appendChild(showMoreLink); // Append 'Show More' link again
      };

      const showMoreLink = document.createElement("a");
      showMoreLink.href = "#";
      showMoreLink.textContent = "Show All";
      showMoreLink.className = "d-block text-center mt-2 text-primary";

      showMoreLink.addEventListener("click", function (event) {
        event.preventDefault();
        if (showMoreLink.textContent === "Show All") {
          sortedBids.forEach(bid => {
            const bidEntry = createBidEntry(bid);
            bidHistoryContainer.appendChild(bidEntry);
          });
          showMoreLink.textContent = "Show Less";
        } else {
          showInitialBids();
          showMoreLink.textContent = "Show All";
        }
      });

      showInitialBids(); // Initially show the first 3 bids
    }
  } catch (error) {
    console.error("Error displaying listing details:", error);
  }
}
