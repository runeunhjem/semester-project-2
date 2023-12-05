import { API_BASE_URL, listingsUrl } from "./apiUrls.mjs";
import { doApiFetch } from "./doFetch.mjs";
// import { createListingCard } from "../make-html/latest-listings-card.mjs";

export async function updateListing(id, listingData) {
  const response = await doApiFetch(
    `${API_BASE_URL}${listingsUrl}/${id}?_seller=true&_bids=true`,
    "PUT",
    listingData
  );
  const updatedListing = await response;
  console.log("Listing updated", updatedListing);
  window.location.reload();
  // // Assuming you have a way to identify the container where the listing card should go
  // const listingContainer = document.getElementById(`${id}`);

  // // Update or replace the listing card
  // const newListingCard = createListingCard(updatedListing);
  // const oldListingCard = document.querySelector(`[data-listing-id="${id}"]`); // Assuming each card has a data attribute for ID

  // if (oldListingCard) {
  //   listingContainer.replaceChild(newListingCard, oldListingCard);
  // } else {
  //   listingContainer.appendChild(newListingCard);
  // }

  // return updatedListing;
}
