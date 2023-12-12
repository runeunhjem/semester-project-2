export function toggleSectionsVisibility() {
  // const allAuctionsHeading = document.getElementById("all-listings-container");
  // if (allAuctionsHeading) {
  //   allAuctionsHeading.classList.add("d-none");
  // }

  // const imageGalleryListingsContainer = document.getElementById(
  //   "image-gallery-listings-container"
  // );
  // if (imageGalleryListingsContainer) {
  //   imageGalleryListingsContainer.classList.add("d-none");
  // }

  // const endsSoonListingsContainer = document.getElementById(
  //   "ends-soon-listings-container"
  // );
  // if (endsSoonListingsContainer) {
  //   endsSoonListingsContainer.classList.add("d-none");
  // }

  const searchResultsContainer = document.getElementById(
    "search-listings-container"
  );
  if (searchResultsContainer) {
    searchResultsContainer.classList.remove("d-none");
  }

  const chevronSearch = document.getElementById("chevronSearch");
  if (chevronSearch) {
    chevronSearch.classList.remove("bi-chevron-down");
    chevronSearch.classList.add("bi-chevron-up");
  }
}
