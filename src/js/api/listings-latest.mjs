import { fetchAllListings } from "./listings-all.mjs";

export async function latestListings() {
  try {
    let allListingsArray = await fetchAllListings();

    // Filter listings to include only those with media
    const listingsWithMedia = allListingsArray.filter(
      listing => listing.media.length > 0
    );

    // Sort by 'created' in descending order (newest first)
    listingsWithMedia.sort((a, b) => new Date(b.created) - new Date(a.created));

    // Get only the first 12 listings
    const latest12Listings = listingsWithMedia.slice(0, 12);

    console.log("Latest 12 Listings with Media", latest12Listings);
    return latest12Listings;
  } catch (error) {
    console.error("Error fetching and sorting listings:", error);
  }
}
