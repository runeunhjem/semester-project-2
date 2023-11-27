import {
  API_BASE_URL,
  bidsInclude,
  listingsUrl,
  sellerInclude,
} from "./apiUrls.mjs";
import { doApiFetch } from "./doFetch.mjs";

const listingId = localStorage.getItem("listingId");
let id = localStorage.getItem("listingId", listingId);

export async function fetchSingleListingById() {
  if (!id) {
    return;
  }
  const response = await doApiFetch(
    `${API_BASE_URL}${listingsUrl}/${id}${sellerInclude}${bidsInclude}`,
    "GET"
  );
  const listing = await response;
  console.log("Single Listing", listing);
  return listing;
}
