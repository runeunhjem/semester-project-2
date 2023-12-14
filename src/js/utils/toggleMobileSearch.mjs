export function toggleSearchSection() {
  const searchIcon = document.getElementById("searchIcon");
  const mobileSearchInput = document.getElementById("mobileSearchInput");

  if (!searchIcon || !mobileSearchInput) return; // Safeguard in case elements are not found

  searchIcon.addEventListener("click", function () {
    const searchSection = document.getElementById("mobile-search");
    if (searchSection) {
      searchSection.classList.toggle("d-none");

      // If the search section is visible after toggling, set focus to the search input
      if (!searchSection.classList.contains("d-none")) {
        mobileSearchInput.focus();
      }
    }
  });
}
