import { API_BASE_URL, listingsUrl } from "./apiurls.mjs";
import { doApiFetch } from "./doFetch.mjs";

export async function createNewListing(listingData) {
  const response = await doApiFetch(
    `${API_BASE_URL}${listingsUrl}`,
    "POST",
    listingData
  );
  const newListing = await response;
  console.log("New listing created", newListing);
  window.location.reload();
  return newListing;
}
