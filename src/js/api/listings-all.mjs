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
let allListingsArray = [];

export async function fetchAllListings() {
  const spinner4 = document.getElementById("spinner4");
  if (!spinner4) return;
  spinner4.classList.remove("d-none");
  spinner4.classList.textContent = "Loading Listings...";
  if (
    window.location.href.includes("login") ||
    window.location.href.includes("profile") ||
    window.location.href.includes("about") ||
    window.location.href.includes("contact") ||
    window.location.href.includes("listing")
  ) {
    return;
  }

  const limit = globalLimit > 0 ? globalLimit : 100; // Use globalLimit if set, else default to 100
  let offset = 0;
  const spinner2 = document.getElementById("spinner2");
  spinner2.classList.remove("d-none");

  while (allListingsArray.length < globalMaxTotalListings - 1) {
    const response = await doApiFetch(
      `${API_BASE_URL}${listingsUrl}${sellerInclude}${bidsInclude}&limit=${limit}&offset=${offset}${activeListings}&sort=created&sortOrder=desc`,
      "GET"
    );

    const listings = await response;

    if (listings.length === 0) break;

    // Filter out listings with "Drizzy" in the title as there where so many of the same listing
    const filteredListings = listings.filter(
      listing => !listing.title.includes("Drizzy")
    );

    allListingsArray = [...allListingsArray, ...filteredListings];
    offset += limit;
    // console.log("allListingsArray.length", allListingsArray.length);
    if (allListingsArray.length > globalMaxTotalListings) {
      allListingsArray = allListingsArray.slice(0, globalMaxTotalListings); // Truncate array to maximum size
      break;
    }
  }

  // // Sort by 'created' in descending order (newest first)
  // allListingsArray.sort((a, b) => new Date(b.created) - new Date(a.created));
  // console.log("allListingsArray.length", allListingsArray.length);
  // console.log("globalMaxTotalListings", globalMaxTotalListings);
  // console.log("All active Listings", allListingsArray);
  spinner2.classList.add("d-none");
  return allListingsArray;
}
