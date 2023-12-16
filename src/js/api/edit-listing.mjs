import { API_BASE_URL, listingsUrl } from "./apiurls.mjs";
import { doApiFetch } from "./doFetch.mjs";

export async function updateListing(id, listingData) {
  const response = await doApiFetch(
    `${API_BASE_URL}${listingsUrl}/${id}?_seller=true&_bids=true`,
    "PUT",
    listingData
  );
  const updatedListing = await response;
  console.log("Listing updated", updatedListing);
  window.location.reload();
}
