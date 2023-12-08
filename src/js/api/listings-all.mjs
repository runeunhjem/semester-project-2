import {
  API_BASE_URL,
  bidsInclude,
  listingsUrl,
  sellerInclude,
  activeListings,
} from "./apiUrls.mjs";
import { doApiFetch } from "./doFetch.mjs";
import {
  globalLimit,
  globalMaxTotalListings,
} from "../variables/constants.mjs";

export async function fetchAllListings() {
  if (
    window.location.href.includes("login") ||
    window.location.href.includes("profile") ||
    window.location.href.includes("listing")
  ) {
    return;
  }
  let allListingsArray = [];

  const limit = globalLimit > 0 ? globalLimit : 100; // Use globalLimit if set, else default to 100
  let offset = 0;
  // const spinner = document.getElementById("spinner");
  // spinner.classList.remove("d-none");

  while (allListingsArray.length < globalMaxTotalListings) {
    const response = await doApiFetch(
      `${API_BASE_URL}${listingsUrl}${sellerInclude}${bidsInclude}&limit=${limit}&offset=${offset}${activeListings}&sort=created&sortOrder=desc`,
      "GET"
    );

    const listings = await response;

    if (listings.length === 0) break;

    allListingsArray = [...allListingsArray, ...listings];
    offset += limit;

    if (allListingsArray.length >= globalMaxTotalListings) {
      allListingsArray = allListingsArray.slice(0, globalMaxTotalListings); // Truncate array to maximum size
      break;
    }
  }

  // // Sort by 'created' in descending order (newest first)
  // allListingsArray.sort((a, b) => new Date(b.created) - new Date(a.created));
  console.log("All active Listings", allListingsArray);
  // spinner.classList.remove("d-none");
  return allListingsArray;
}
