import { createListingCard } from "./latest-listings-card.mjs";

// Function to load favorites from localStorage and display them
export function loadFavorites() {
  const favoritesContainer = document.getElementById("favorites-container");
  if (!favoritesContainer) return; // Exit if the container is not found

  // Clear existing content
  favoritesContainer.innerHTML = "";

  // Get favorites from localStorage
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  // Check the number of favorites and handle accordingly
  if (favorites.length === 0) {
    // No favorites
    favoritesContainer.innerHTML = "<p>You have no favorites yet.</p>";
  } else {
    // Iterate over each favorite listing and create a card
    favorites.forEach(listing => {
      const listingCard = createListingCard(listing);
      favoritesContainer.appendChild(listingCard);
    });
  }
}
