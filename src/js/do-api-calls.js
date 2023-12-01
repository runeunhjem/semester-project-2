import { fetchAllListings } from "./api/listings-all.mjs";
import { fetchAllListingsWithMedia } from "./api/listings-all-with-media.mjs";
import { fetchSingleListingById } from "./api/listings-singel-id.mjs";
import { latestListings } from "./api/listings-latest.mjs";
import { listingsEndsSoon } from "./api/listings-ends-soon.mjs";

if (!window.location.href.includes("login")) {
  /**
   * Fetch all listings
   */
  fetchAllListings();

  /**
   * Fetch all listings with media
   */
  fetchAllListingsWithMedia();

  /**
   * Fetch single listing by id
   */
  fetchSingleListingById();

  /**
   * Latest listings
   */
  latestListings();

  /**
   * 12 Listings that ends soon
   */
  listingsEndsSoon();
} else {
  console.log("No fetching on Login page");
}
