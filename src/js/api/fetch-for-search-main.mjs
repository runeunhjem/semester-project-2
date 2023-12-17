import {
  API_BASE_URL,
  bidsInclude,
  listingsUrl,
  sellerInclude,
  activeListings,
} from "./apiurls.mjs";
import { doApiFetch } from "./doFetch.mjs";
import { globalLimit, maxSearchResults } from "../variables/constants.mjs";

export async function fetchForSearchMain() {
  let allListingsArray = [];
  const limit = globalLimit > 0 ? globalLimit : 100;
  let offset = 0;

  while (allListingsArray.length < maxSearchResults) {
    const response = await doApiFetch(
      `${API_BASE_URL}${listingsUrl}${sellerInclude}${bidsInclude}&limit=${limit}&offset=${offset}${activeListings}&sort=created&sortOrder=desc`,
      "GET"
    );

    const listings = await response;

    if (listings.length === 0) break;

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

    if (allListingsArray.length >= maxSearchResults) {
      allListingsArray = allListingsArray.slice(0, maxSearchResults);
      break;
    }
  }

  return allListingsArray;
}
