import { API_BASE_URL, listingsUrl, profilesInclude } from "./apiUrls.mjs";
import { doApiFetch } from "./doFetch.mjs";

export async function fetchProfileListings() {
  let allProfileListingsArray = [];
  const limit = 100;
  let offset = 0;
  const currentProfileName = localStorage.getItem("currentProfileName");
  console.log("currentProfileName", currentProfileName);

  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      const response = await doApiFetch(
        `${API_BASE_URL}${profilesInclude}/${currentProfileName}${listingsUrl}?_bids=true&limit=${limit}&offset=${offset}`,
        "GET"
      );

      const data = await response;
      console.log("Profile response data", data);

      if (!data || data.length === 0 || data.length < limit) {
        allProfileListingsArray = [...allProfileListingsArray, ...data];
        break;
      }

      allProfileListingsArray = [...allProfileListingsArray, ...data];
      offset += limit;
    } catch (error) {
      console.error("Error fetching profile listings:", error);
      break;
    }
  }

  console.log("All active profile listings", allProfileListingsArray);
  return allProfileListingsArray;
}
