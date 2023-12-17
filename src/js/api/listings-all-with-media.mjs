import { globalLimit } from "../variables/constants.mjs";
import {
  API_BASE_URL,
  bidsInclude,
  listingsUrl,
  sellerInclude,
  activeListings,
} from "./apiurls.mjs";
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
  const desiredListingsCount = 12;
  const limit = globalLimit > 0 ? globalLimit : 100;
  let offset = 0;
  const spinner = document.getElementById("spinner");
  spinner.classList.remove("d-none");

  while (allListingsArray.length < desiredListingsCount) {
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

    // Adjust to the number of images I want the image gallery to contain
    const listingsWithMedia = filteredListings.filter(
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

  spinner.classList.add("d-none");
  allListingsArray.sort((a, b) => new Date(b.created) - new Date(a.created));
  return allListingsArray;
}
