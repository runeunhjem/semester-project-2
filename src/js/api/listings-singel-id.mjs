import {
  API_BASE_URL,
  bidsInclude,
  listingsUrl,
  sellerInclude,
} from "./apiUrls.mjs";
import { doApiFetch } from "./doFetch.mjs";

let id = "8e0e1ea9-6990-4182-9a91-a5b52756b12a";

export async function fetchSingleListingById() {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const response = await doApiFetch(
      `${API_BASE_URL}${listingsUrl}/${id}${sellerInclude}${bidsInclude}`,
      "GET"
    );

    const listing = await response;
    console.log("listing", listing);
    return listing;
  }
}
