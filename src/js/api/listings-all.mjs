import {
  API_BASE_URL,
  bidsInclude,
  listingsUrl,
  sellerInclude,
  activeListings,
} from "./apiurls.mjs";
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

  const limit = globalLimit > 0 ? globalLimit : 100;
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
    if (allListingsArray.length > globalMaxTotalListings) {
      allListingsArray = allListingsArray.slice(0, globalMaxTotalListings);
      break;
    }
  }

  spinner2.classList.add("d-none");
  return allListingsArray;
}
