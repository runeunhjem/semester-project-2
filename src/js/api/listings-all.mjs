import {
  API_BASE_URL,
  bidsInclude,
  listingsUrl,
  sellerInclude,
  activeListings,
} from "./apiUrls.mjs";
import { doApiFetch } from "./doFetch.mjs";

export async function fetchAllListings() {
  let allListingsArray = [];
  const limit = 100;
  let offset = 0;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const response = await doApiFetch(
      `${API_BASE_URL}${listingsUrl}${sellerInclude}${bidsInclude}&limit=${limit}&offset=${offset}${activeListings}&sort=created&sortOrder=asc`,
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

  // Filter out listings with media files ending in .png or .htm
  const filteredListings = allListingsArray.filter(listing => {
    return !listing.media.some(mediaUrl => {
      const fileExtension = mediaUrl.split(".").pop().toLowerCase();
      return fileExtension === "png" || fileExtension === "htm";
    });
  });

  // Sort by 'created' in descending order (newest first)
  filteredListings.sort((a, b) => new Date(b.created) - new Date(a.created));
  // console.log("All active (listings-all)Listings", filteredListings);
  return filteredListings;
}
