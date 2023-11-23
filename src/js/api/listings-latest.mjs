import { fetchAllListings } from "./listings-all.mjs";

export async function latestListings() {
  try {
    let allListingsArray = await fetchAllListings();

    // Valid file endings
    const validFileEndings = [".jpg", ".jpeg", ".gif"];

    // Filter listings to include only those with valid media
    const listingsWithValidMedia = allListingsArray.filter(listing => {
      if (listing.media.length === 0) return false;

      // Keep only media URLs with valid endings
      listing.media = listing.media.filter(url => {
        return validFileEndings.some(ending =>
          url.toLowerCase().endsWith(ending)
        );
      });

      return listing.media.length > 0;
    });

    // Sort by 'created' in descending order (newest first)
    listingsWithValidMedia.sort(
      (a, b) => new Date(b.created) - new Date(a.created)
    );

    // Get only the first 12 listings
    const latest12Listings = listingsWithValidMedia.slice(0, 12);

    console.log("Latest 12 Listings with Valid Media", latest12Listings);
    return latest12Listings;
  } catch (error) {
    console.error("Error fetching and sorting listings:", error);
  }
}