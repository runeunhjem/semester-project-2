import { currentProfileName } from "../variables/constants.mjs";
import { doApiFetch } from "./doFetch.mjs";
import { API_BASE_URL, listingsUrl, profilesInclude } from "./apiUrls.mjs";

const url = `${API_BASE_URL}${profilesInclude}/${currentProfileName}${listingsUrl}?_bids=true`;
// console.log("Profile URL", url);

export async function fetchProfileListings() {
  const response = await doApiFetch(url, "GET");

  const listings = await response;
  // console.log("All profile Listings", listings);
  return listings;
}
// fetchProfileListings();
