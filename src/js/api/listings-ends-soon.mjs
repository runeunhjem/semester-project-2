import { fetchAllListings } from "./listings-all.mjs";

export async function listingsEndsSoon() {
  try {
    let allListingsSortedArray = await fetchAllListings();

    // Sort by endsAt in descending order (newest first)
    allListingsSortedArray.sort(
      (a, b) => new Date(a.endsAt) - new Date(b.endsAt)
    );

    // Get only the first 12 listings
    const endsSoon12Listings = allListingsSortedArray.slice(0, 12);

    console.log("12 Listings that ends soon", endsSoon12Listings);
    return endsSoon12Listings;
  } catch (error) {
    console.error("Error fetching and sorting listings:", error);
  }
}
