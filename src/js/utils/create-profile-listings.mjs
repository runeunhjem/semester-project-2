import { API_BASE_URL, listingsUrl, profilesInclude } from "../api/apiUrls.mjs";
import { doApiFetch } from "../api/doFetch.mjs";
import { createListingCard } from "../make-html/latest-listings-card.mjs";
import { populateCategories } from "../make-html/populate-categories.mjs";
import {
  globalLimit,
  globalMaxTotalListings,
} from "../variables/constants.mjs";

export async function displayProfileListings() {
  let allListingsArray = [];
  const limit =
    globalLimit > 0
      ? Math.min(globalLimit, globalMaxTotalListings)
      : globalMaxTotalListings;
  let offset = 0;
  const urlParams = new URLSearchParams(window.location.search);
  const currentProfileName = urlParams.get("profile");

  // Ensure currentProfileName is available
  if (!currentProfileName) {
    console.error("No current profile name found in local storage");
    return [];
  }

  while (allListingsArray.length < globalMaxTotalListings) {
    const url = `${API_BASE_URL}${profilesInclude}/${currentProfileName}${listingsUrl}?_seller=true&_bids=true&limit=${limit}&offset=${offset}&sort=updated&sortOrder=desc`;
    const response = await doApiFetch(url, "GET");
    const listings = await response;

    if (listings.length === 0) break;

    allListingsArray = [...allListingsArray, ...listings];
    offset += limit;

    if (allListingsArray.length >= globalMaxTotalListings) {
      allListingsArray = allListingsArray.slice(0, globalMaxTotalListings); // Truncate array to maximum size
      break;
    }
  }

  const spinner = document.getElementById("spinner");
  if (spinner) spinner.classList.add("d-none");
  console.log("All profile Listings", allListingsArray);

  const profileAuctionsContainer = document.getElementById("profile-auctions");
  if (!profileAuctionsContainer) {
    console.error("Profile auctions container not found");
    return;
  }
  allListingsArray.forEach(listing => {
    const listingCard = createListingCard(listing, "categories-profile");
    profileAuctionsContainer.appendChild(listingCard);
  });
  populateCategories(allListingsArray, "categories-profile");
  return allListingsArray;
}
