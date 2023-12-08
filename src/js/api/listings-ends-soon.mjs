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
    window.location.href.includes("listing")
  ) {
    return;
  }

  try {
    let allListingsArray = [];
    let offset = 0;
    const limit = 100; // Set a reasonable limit for each API call

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const url = `${API_BASE_URL}${listingsUrl}${sellerInclude}${bidsInclude}&limit=${limit}&offset=${offset}${activeListings}&sort=created&sortOrder=asc`;
      const response = await doApiFetch(url, "GET");
      const listings = await response;

      if (listings.length === 0) break;

      allListingsArray = [...allListingsArray, ...listings];
      offset += limit;
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
    console.log("12 Listings that end soon", endsSoon12Listings);

    return endsSoon12Listings;
  } catch (error) {
    console.error("Error fetching and sorting listings:", error);
  }
}
