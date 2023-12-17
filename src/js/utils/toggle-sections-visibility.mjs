export function toggleSectionsVisibility() {
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
