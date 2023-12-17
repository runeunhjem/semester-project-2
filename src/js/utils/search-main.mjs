import { fetchForSearchMain } from "../api/fetch-for-search-main.mjs";
import { createListingCard } from "../make-html/latest-listings-card.mjs";
import { highlightQuery } from "./highlight-search-term.mjs";
import { toggleSectionsVisibility } from "./toggle-sections-visibility.mjs";
import { initializeAllCarousels } from "./initialize-carousel.mjs";

let query = "";

async function handleSearch(query) {
  toggleSectionsVisibility();
  const allListings = await fetchForSearchMain();

  if (!Array.isArray(allListings)) {
    // Handle the case where allListings is not an array
    console.error("Fetched listings are not in array format:", allListings);
    return;
  }

  const filteredListings = allListings.filter(listing => {
    // Combine title, description, tags, and seller's name into a single search string
    const tagsString = listing.tags.join(" ");
    const altTextString = listing.media.map(media => media.alt).join(" ");
    const searchString = `${listing.title} ${listing.description} ${tagsString} ${listing.seller.name} ${altTextString}`;

    return searchString.toLowerCase().includes(query.toLowerCase());
  });

  displaySearchResults(filteredListings, query);
}

/**
 * Display the search results.
 *
 * @param {Array} results - The search results to display.
 * @param {string} query - The search query.
 */
async function displaySearchResults(results, query) {
  const searchResultsContainer = document.getElementById("search-auctions");
  searchResultsContainer.innerHTML = "";

  const searchResultsContent = document.getElementById("search-auctions");
  searchResultsContent.innerHTML = "";
  if (results.length === 0) {
    searchResultsContainer.innerHTML =
      '<p class="d-flex justify-content-center bg-warning rounded shadow-sm fs-2 px-3 py-1 mt-2">No results.</p>';
    searchResultsContent.className =
      "d-flex justify-content-center w-100 mx-auto";
  } else {
    results.forEach(listing => {

      listing.title = listing.title ? highlightQuery(listing.title, query) : "";
      listing.description = listing.description
        ? highlightQuery(listing.description, query)
        : "";

      const listingCard = createListingCard(listing, query);
      searchResultsContainer.appendChild(listingCard);
    });
  }

  // Update UI elements like search count, etc.
  const searchCountElement = document.getElementById("search-count");
  if (results.length >= 1) {
    searchCountElement.textContent = `${results.length} results for "${query}"`;
  } else {
    searchCountElement.textContent = `No results for "${query}"`;
  }
  await initializeAllCarousels();
}

// Function to initialize search functionality
export function initializeSearch() {
  const desktopSearchForm = document.getElementById("searchForm");
  const mobileSearchForm = document.getElementById("mobileSearchForm");

  // Function to extract the query and call handleSearch
  const processSearch = event => {
    event.preventDefault();
    const searchInput = event.target.querySelector('input[type="search"]');
    query = searchInput.value.trim();
    if (query) {
      handleSearch(query);
    }
    searchInput.value = "";
  };

  // Attach event listeners to both search forms
  if (desktopSearchForm) {
    desktopSearchForm.addEventListener("submit", processSearch);
  }
  if (mobileSearchForm) {
    mobileSearchForm.addEventListener("submit", processSearch);
  }
}
