import {
  globalLimit,
  globalMaxTotalListings,
} from "../variables/constants.mjs";
import {
  API_BASE_URL,
  listingsUrl,
  sellerInclude,
  bidsInclude,
  activeListings,
} from "./apiUrls.mjs";
import { doApiFetch } from "./doFetch.mjs";

export async function listingsEndsSoon() {
  if (
    window.location.href.includes("login") ||
    window.location.href.includes("profile") ||
    window.location.href.includes("about") ||
    window.location.href.includes("contact") ||
    window.location.href.includes("listing")
  ) {
    return;
  }

  try {
    let allListingsArray = [];
    let offset = 0;
    const limit = globalLimit > 0 ? globalLimit : 100; // Use globalLimit if set, else default to 100

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const url = `${API_BASE_URL}${listingsUrl}${sellerInclude}${bidsInclude}&limit=${limit}&offset=${offset}${activeListings}&sort=created&sortOrder=desc`;
      const response = await doApiFetch(url, "GET");
      const listings = await response;

      if (listings.length === 0 || listings.length > globalMaxTotalListings)
        break;

      allListingsArray = [...allListingsArray, ...listings];
      offset += limit;
      if (allListingsArray.length >= globalMaxTotalListings) {
        allListingsArray = allListingsArray.slice(0, globalMaxTotalListings); // Truncate array to maximum size
        break;
      }
      // console.log("listings.length", listings.length);
      console.log("allListingsArray.length", allListingsArray.length);
    }

    // Ensure that listings with a defined 'endsAt' are considered
    const listingsWithEndDates = allListingsArray.filter(
      listing => listing.endsAt
    );

    // Sort by 'endsAt' in ascending order (those ending soonest first)
    listingsWithEndDates.sort(
      (a, b) => new Date(a.endsAt) - new Date(b.endsAt)
    );

    // Get only the first 12 listings
    const endsSoon12Listings = listingsWithEndDates.slice(0, 12);
    // console.log("Listings that end soon", endsSoon12Listings);

    return endsSoon12Listings;
  } catch (error) {
    console.error("Error fetching and sorting listings:", error);
  }
}
