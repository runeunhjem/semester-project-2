export function toggleSearchSection() {
  const searchIcon = document.getElementById("searchIcon");
  if (!searchIcon) return; // Safeguard in case the element is not found

  searchIcon.addEventListener("click", function () {
    const searchSection = document.getElementById("mobile-search");
    if (searchSection) {
      searchSection.classList.toggle("d-none");
    }
  });
}
