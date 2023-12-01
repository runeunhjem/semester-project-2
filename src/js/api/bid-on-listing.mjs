import {
  API_BASE_URL,
  // bidsInclude,
  listingsUrl,
  // sellerInclude,
} from "./apiUrls.mjs";
import { doApiFetch } from "./doFetch.mjs";

export async function bidOnListing(bidAmount, id) {
  if (!id) {
    return;
  }
  const bidData = { amount: parseInt(bidAmount, 10) }; // Convert bid amount to a number

  const response = await doApiFetch(
    `${API_BASE_URL}${listingsUrl}/${id}/bids`,
    "POST",
    bidData
  );
  const listing = await response;
  // console.log("Bid success", listing);
  window.location.reload();
  return listing;
}
