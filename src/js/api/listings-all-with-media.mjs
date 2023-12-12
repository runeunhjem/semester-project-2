import { globalLimit } from "../variables/constants.mjs";
import {
  API_BASE_URL,
  bidsInclude,
  listingsUrl,
  sellerInclude,
  activeListings,
} from "./apiUrls.mjs";
import { doApiFetch } from "./doFetch.mjs";

export async function fetchAllListingsWithMedia() {
  if (
    window.location.href.includes("login") ||
    window.location.href.includes("profile") ||
    window.location.href.includes("listing")
  ) {
    return;
  }
  let allListingsArray = [];
  const desiredListingsCount = 12; // The number of listings you want to display
  const limit = globalLimit > 0 ? globalLimit : 100; // Use globalLimit if set, else default to 100
  let offset = 0;
  const spinner2 = document.getElementById("spinner2");
  spinner2.classList.remove("d-none");

  while (allListingsArray.length < desiredListingsCount) {
    const response = await doApiFetch(
      `${API_BASE_URL}${listingsUrl}${sellerInclude}${bidsInclude}&limit=${limit}&offset=${offset}${activeListings}&sort=created&sortOrder=desc`,
      "GET"
    );

    const listings = await response;
    if (listings.length === 0) break;

    // Adjust to the number of images I want the image gallery to contain
    const listingsWithMedia = listings.filter(
      listing => listing.media && listing.media.length >= 2
    );

    // Add listings with media to the array
    allListingsArray.push(...listingsWithMedia);

    // Check if the desired number of listings has been reached
    if (allListingsArray.length >= desiredListingsCount) {
      allListingsArray = allListingsArray.slice(0, desiredListingsCount);
      break;
    }

    offset += limit;
  }

  allListingsArray.sort((a, b) => new Date(b.created) - new Date(a.created));
  // console.log("Latest Listings with image gallery", allListingsArray);
  spinner2.classList.add("d-none");
  return allListingsArray;
}
