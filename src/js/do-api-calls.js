import { fetchAllListings } from "./api/listings-all.mjs";
import { fetchSingleListingById } from "./api/listings-singel-id.mjs";

/**
 * Fetch all listings
 */
fetchAllListings();

/**
 * Fetch single listing by id
 * @param {string} id
 */
fetchSingleListingById();
