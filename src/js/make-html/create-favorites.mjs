import { createListingCard } from "./latest-listings-card.mjs";

// Function to load favorites from localStorage and display them
export function loadFavorites() {
  const favoritesContainer = document.getElementById("favorites-container");
  if (!favoritesContainer) return;
  favoritesContainer.innerHTML = "";

  // Get favorites from localStorage
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  // Display message if no favorites
  if (favorites.length === 0) {
    favoritesContainer.innerHTML = "<p>You have no favorites yet.</p>";
    return;
  }

  // Track existing favorites in the DOM
  const existingFavoriteIds = new Set(
    [...favoritesContainer.querySelectorAll("[data-listing-id]")].map(card =>
      card.getAttribute("data-listing-id")
    )
  );

  // Add new favorite listings that are not already in the DOM
  favorites.forEach(listing => {
    if (!existingFavoriteIds.has(listing.id)) {
      const listingCard = createListingCard(listing);
      favoritesContainer.appendChild(listingCard);
    }
  });

  // Remove listings no longer in favorites
  favoritesContainer.querySelectorAll("[data-listing-id]").forEach(card => {
    const listingId = card.getAttribute("data-listing-id");
    if (!favorites.some(favorite => favorite.id === listingId)) {
      card.remove();
    }
  });
}
