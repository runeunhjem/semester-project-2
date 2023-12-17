import { API_BASE_URL, listingsUrl } from "./apiurls.mjs";
import { doApiFetch } from "./doFetch.mjs";

export async function deleteListing(id) {
  const response = await doApiFetch(
    `${API_BASE_URL}${listingsUrl}/${id}`,
    "DELETE"
  );
  console.log("Listing deleted", response);
  window.location.reload();
}
