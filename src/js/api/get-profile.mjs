import { API_BASE_URL, listingsUrl, profilesInclude } from "./apiUrls.mjs";
import { doApiFetch } from "./doFetch.mjs";
import { currentProfileName } from "../variables/constants.mjs";

/**
 *
 * @returns {Promise<Array>} All active profile listings
 */
export async function fetchProfileListings() {
  let allProfileListingsArray = [];
  const limit = 100;
  let offset = 0;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      if (!currentProfileName) {
        break;
      }
      const response = await doApiFetch(
        `${API_BASE_URL}${profilesInclude}/${currentProfileName}${listingsUrl}?_bids=true&limit=${limit}&offset=${offset}`,
        "GET"
      );

      const data = await response;
      if (!data || data.length === 0 || data.length < limit) {
        allProfileListingsArray = [...allProfileListingsArray, ...data];
        console.log("Profile listings", data);
        break;
      }

      allProfileListingsArray = [...allProfileListingsArray, ...data];
      offset += limit;
    } catch (error) {
      console.error("Error fetching profile listings:", error);
      break;
    }
  }

  console.log("All profile listings", allProfileListingsArray);
  return allProfileListingsArray;
}
