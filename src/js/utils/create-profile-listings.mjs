import { API_BASE_URL, listingsUrl, profilesInclude } from "../api/apiUrls.mjs";
import { doApiFetch } from "../api/doFetch.mjs";
import { createListingCard } from "../make-html/latest-listings-card.mjs";
import { populateCategories } from "../make-html/populate-categories.mjs";

export async function displayProfileListings() {
  let allListingsArray = [];
  const limit = 100;
  let offset = 0;
  const currentProfileName = localStorage.getItem("currentProfileName");

  // Ensure currentProfileName is available
  if (!currentProfileName) {
    console.error("No current profile name found in local storage");
    return [];
  }

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const url = `${API_BASE_URL}${profilesInclude}/${currentProfileName}${listingsUrl}?_seller=true&_bids=true&limit=${limit}&offset=${offset}`;
    const response = await doApiFetch(url, "GET");
    const listings = await response;

    if (listings.length === 0 || listings.length < limit) {
      allListingsArray = [...allListingsArray, ...listings];
      break;
    }

    allListingsArray = [...allListingsArray, ...listings];
    offset += limit;
  }
  console.log("All profile Listings", allListingsArray);

  const profileAuctionsContainer = document.getElementById("profile-auctions");
  if (!profileAuctionsContainer) {
    console.error("Profile auctions container not found");
    return;
  }
  allListingsArray.forEach(listing => {
    populateCategories(listing);
    const listingCard = createListingCard(listing);
    profileAuctionsContainer.appendChild(listingCard);
  });
  return allListingsArray;
}
