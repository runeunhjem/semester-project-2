/* eslint-disable no-unused-vars */
import { fetchSingleListingById } from "../api/listings-singel-id.mjs";
import { createListingCard } from "../make-html/latest-listings-card.mjs";
import { createImageGallery } from "../make-html/listing-image-gallery.mjs";
import { createBidContainer } from "../make-html/create-bid-container.mjs";
import { updateCountdownDisplay } from "../utils/update-time-to-end.mjs"; // Adjust path as necessary
import { createBidEntry } from "../make-html/create-bid-history-entry.mjs";
import { populateCategories } from "../make-html/populate-categories.mjs";
import { loggedInUser } from "../variables/constants.mjs";

const urlParams = new URLSearchParams(window.location.search);
const listingIdParam = urlParams.get("id");

export async function displayListingDetails() {
  const spinner = document.getElementById("spinner");
  spinner.classList.remove("d-none");
  try {
    const listing = await fetchSingleListingById(listingIdParam);

    await populateCategories(listing, "categories-listing");

    // Set the page title to the listing title
    if (window.location.pathname === "/src/html/auction/listing.html") {
      document.title = `${listing.title} | DreamBids`;
      const listingTitle = document.getElementById("listingTitle");
      if (listingTitle) {
        listingTitle.textContent =
          listing.title.length > 130
            ? listing.title.slice(0, 30) + "..."
            : listing.title;
      }
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
    if (currentLeaderElement) {
      // Clear previous content
      currentLeaderElement.textContent = "";

      // Create a link to the bidder's profile
      const bidderProfileLink = document.createElement("a");
      bidderProfileLink.href = `/src/html/profile/index.html?profile=${highestBidderName}`;
      bidderProfileLink.textContent = highestBidderName;
      bidderProfileLink.className = "profile-link-class";

      // Append the link to the currentLeaderElement
      currentLeaderElement.appendChild(bidderProfileLink);
    }

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
        bidHistoryContainer.innerHTML = "";
        sortedBids.slice(0, 3).forEach(bid => {
          const bidEntry = createBidEntry(bid);
          bidHistoryContainer.appendChild(bidEntry);
        });

        // Add 'Show More' link only if there are more than 3 bids
        if (sortedBids.length > 3) {
          bidHistoryContainer.appendChild(showMoreLink);
        }
      };

      const numberOfBids = document.getElementById("number-of-bids");
      if (numberOfBids) numberOfBids.textContent = ` (${listing.bids.length})`;

      const showMoreLink = document.createElement("a");
      showMoreLink.href = "#";
      showMoreLink.textContent = "Show All";
      showMoreLink.className = "d-block text-center mt-2 text-primary";

      showMoreLink.addEventListener("click", function (event) {
        event.preventDefault();
        if (showMoreLink.textContent === "Show All") {
          // Display all bids
          sortedBids.forEach(bid => {
            const bidEntry = createBidEntry(bid);
            bidHistoryContainer.appendChild(bidEntry);
          });
          showMoreLink.textContent = "Show Less";
        } else {
          // Display initial 3 bids
          showInitialBids();
          showMoreLink.textContent = "Show All";
        }
      });

      showInitialBids();
    }

    // Specifications
    const specificationsContainer = document.getElementById("specifications");
    if (specificationsContainer) {
      // Clear existing content
      specificationsContainer.innerHTML = "";

      // Function to create specification entries
      const createSpecEntry = (label, value, isMedia = false) => {
        const specDiv = document.createElement("div");
        specDiv.className = "spec-entry d-flex flex-column my-1";

        const specLabel = document.createElement("strong");
        specLabel.textContent = `${label}: `;
        specDiv.appendChild(specLabel);

        const specValue = document.createElement("span");
        specValue.className = "d-flex align-items-center";
        if (isMedia) {
          const mediaDiv = document.createElement("div");
          mediaDiv.style.overflowX = "auto";
          mediaDiv.textContent = value;
          specValue.appendChild(mediaDiv);
        } else {
          specValue.textContent = value;
        }
        specDiv.appendChild(specValue);

        return specDiv;
      };

      // Add specifications
      const {
        id,
        title,
        description,
        tags,
        created,
        updated,
        endsAt,
        seller,
        _count,
      } = listing;

      // Define specifications in an array
      const specs = [
        { label: "Title", value: title },
        { label: "Seller", value: seller.name, isLink: true },
        { label: "ID", value: id },
        { label: "Description", value: description },
        { label: "Tags", value: tags.join(", ") },
        { label: "Created", value: new Date(created).toLocaleString() },
        { label: "Updated", value: new Date(updated).toLocaleString() },
        { label: "Ends At", value: new Date(endsAt).toLocaleString() },
        { label: "Bids Count", value: _count.bids },
      ];

      specs.forEach((spec, index) => {
        const specEntry = createSpecEntry(
          spec.label,
          spec.isLink ? "" : spec.value,
          spec.isMedia
        );
        specEntry.className =
          "spec-entry d-flex flex-column my-1 border-bottom p-2";
        if (index % 2 === 1) {
          specEntry.style.backgroundColor = "#fff6ec";
        }

        if (spec.isLink) {
          const profileContainer = document.createElement("div");
          const placeBidSection = document.getElementById("place-bid");
          if (loggedInUser === seller.name) {
            placeBidSection.innerHTML = "";
            placeBidSection.textContent = "You cannot bid on your own listing.";
            placeBidSection.classList.add(
              "d-flex",
              "justify-content-center",
              "text-danger"
            );
          }
          profileContainer.className = "d-flex align-items-center";

          const sellerLink = document.createElement("a");
          if (loggedInUser) {
            sellerLink.href = `/src/html/profile/index.html?profile=${seller.name}`;
          } else {
            sellerLink.href = "/login.html";
          }
          sellerLink.textContent = `${seller.name} | View Profile`;
          sellerLink.className = "fw-bold seller-name viewProfileLink";
          profileContainer.appendChild(sellerLink);

          specEntry.children[1].appendChild(profileContainer);
        }

        specificationsContainer.appendChild(specEntry);
      });
      spinner.classList.add("d-none");
    }
  } catch (error) {
    console.error("Error displaying listing details:", error);
  }
}
