import {
  API_BASE_URL,
  listingsUrl,
} from "./apiurls.mjs";
import { doApiFetch } from "./doFetch.mjs";

export async function bidOnListing(bidAmount, id) {
  if (!id) {
    return;
  }
  const bidData = { amount: parseInt(bidAmount, 10) };

  const response = await doApiFetch(
    `${API_BASE_URL}${listingsUrl}/${id}/bids`,
    "POST",
    bidData
  );
  const listing = await response;
  setTimeout(() => {
    window.location.reload();
  }, 5000);
  return listing;
}
