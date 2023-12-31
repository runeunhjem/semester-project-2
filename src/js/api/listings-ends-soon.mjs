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
} from "./apiurls.mjs";
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
    const limit = globalLimit > 0 ? globalLimit : 100;

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const url = `${API_BASE_URL}${listingsUrl}${sellerInclude}${bidsInclude}&limit=${limit}&offset=${offset}${activeListings}&sort=created&sortOrder=desc`;
      const response = await doApiFetch(url, "GET");
      const listings = await response;

      if (listings.length === 0 || listings.length > globalMaxTotalListings)
        break;

      // Filter out listings with titles that contain any of the words in the wordsToFilterOut array
      const wordsToFilterOut = [
        "drizzy",
        "test",
        "tester",
        "hei",
        "title",
        "crgoat",
        "hhhh",
        "ffedef",
        "hsuwhduiw",
        "heycrsiente",
        "hello",
        "ggggg",
        "goatcr",
        "cr7",
      ];

      const filteredListings = listings.filter(
        listing =>
          !wordsToFilterOut.some(word =>
            listing.title.toLowerCase().includes(word.toLowerCase())
          )
      );
      allListingsArray = [...allListingsArray, ...filteredListings];
      offset += limit;
      if (allListingsArray.length >= globalMaxTotalListings) {
        allListingsArray = allListingsArray.slice(0, globalMaxTotalListings);
        break;
      }
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

    return endsSoon12Listings;
  } catch (error) {
    console.error("Error fetching and sorting listings:", error);
  }
}
