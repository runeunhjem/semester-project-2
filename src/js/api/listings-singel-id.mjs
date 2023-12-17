import {
  API_BASE_URL,
  bidsInclude,
  listingsUrl,
  sellerInclude,
} from "./apiurls.mjs";
import { doApiFetch } from "./doFetch.mjs";

const urlParams = new URLSearchParams(window.location.search);
const listingId = urlParams.get("id");
const id = listingId;

export async function fetchSingleListingById() {
  if (!id) {
    return;
  }
  const response = await doApiFetch(
    `${API_BASE_URL}${listingsUrl}/${id}${sellerInclude}${bidsInclude}`,
    "GET"
  );
  const listing = await response;

  return listing;
}
