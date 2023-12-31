import { fetchAllListingsWithMedia } from "./listings-all-with-media.mjs";

export async function latestListings() {
  if (window.location.href.includes("login")) {
    return;
  }
  try {
    const spinner = document.getElementById("spinner");
    const latestListingsContainer = document.getElementById("latest-auctions");
    latestListingsContainer.classList.remove("flex-nowrap", "d-flex");
    spinner.classList.remove("d-none");
    let allListingsArray = await fetchAllListingsWithMedia();

    // Filter listings to include only those with x number of media
    const listingsWithValidMedia = allListingsArray.filter(listing => {
      if (listing.media.length === 0) return false;

      return listing.media.length >= 2;
    });

    // Sort by 'created' in descending order (newest first)
    listingsWithValidMedia.sort(
      (a, b) => new Date(b.created) - new Date(a.created)
    );

    // Get only the latest 12 listings
    const latest12Listings = listingsWithValidMedia.slice(0, 12);
    spinner.classList.add("d-none");
    latestListingsContainer.classList.add("flex-nowrap", "d-flex");
    return latest12Listings;
  } catch (error) {
    console.error("Error fetching and sorting listings:", error);
  }
}
