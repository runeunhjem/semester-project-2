import {
  API_BASE_URL,
  bidsInclude,
  listingsUrl,
  sellerInclude,
  activeListings,
} from "./apiUrls.mjs";
import { doApiFetch } from "./doFetch.mjs";

export async function fetchAllListingsWithMedia() {
  let allListingsArray = [];
  const limit = 100;
  let offset = 0;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const response = await doApiFetch(
      `${API_BASE_URL}${listingsUrl}${sellerInclude}${bidsInclude}&limit=${limit}&offset=${offset}${activeListings}`,
      "GET"
    );

    const listings = await response;

    if (listings.length === 0 || listings.length < limit) {
      allListingsArray = [...allListingsArray, ...listings];
      break;
    }

    allListingsArray = [...allListingsArray, ...listings];
    offset += limit;
  }

  // Filter listings to include only those with media
  const listingsWithMedia = allListingsArray.filter(
    listing => listing.media && listing.media.length > 1
  );

  // console.log("All active Listings with Media", listingsWithMedia);
  return listingsWithMedia;
}
