// search-main.mjs
import { fetchForSearchMain } from "../api/fetch-for-search-main.mjs";
import { createListingCard } from "../make-html/latest-listings-card.mjs";
import { highlightQuery } from "./highlight-search-term.mjs";

// let totalFetched = 0;
let query = "";

async function handleSearch(query) {
  // Hide all other sections
  const allAuctionsHeading = document.getElementById("all-listings-container");
  allAuctionsHeading.classList.add("d-none");

  const imageGalleryListingsContainer = document.getElementById(
    "image-gallery-listings-container"
  );
  imageGalleryListingsContainer.classList.add("d-none");

  const endsSoonListingsContainer = document.getElementById(
    "ends-soon-listings-container"
  );
  endsSoonListingsContainer.classList.add("d-none");

  // Ensure the search results section is visible
  const searchResultsContainer = document.getElementById(
    "search-listings-container"
  );
  searchResultsContainer.classList.remove("d-none");

  // Toggle chevron icon to indicate the section is open
  const chevronSearch = document.getElementById("chevronSearch");
  if (chevronSearch) {
    chevronSearch.classList.remove("bi-chevron-up");
    chevronSearch.classList.add("bi-chevron-down");
  }

  const allListings = await fetchForSearchMain();

  const filteredListings = allListings.filter(listing => {
    // Combine title, description, and tags into a single search string
    const tagsString = listing.tags.join(" ");
    const searchString = `${listing.title} ${listing.description} ${tagsString}`;

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
function displaySearchResults(results, query) {
  const searchResultsContainer = document.getElementById("search-auctions");
  searchResultsContainer.innerHTML = "";

  const searchResultsContent = document.getElementById("search-auctions");
  searchResultsContent.innerHTML = "";
  if (results.length === 0) {
    searchResultsContainer.innerHTML =
      '<p class="d-flex justify-content-center bg-warning rounded shadow-sm">No results found.</p>';
    searchResultsContent.classname =
      "d-flex justify-content-center w-100 mx-auto";
  } else {
    results.forEach(listing => {
      console.log("Title:", listing.title);
      console.log("Description:", listing.description);

      listing.title = listing.title ? highlightQuery(listing.title, query) : "";
      listing.description = listing.description
        ? highlightQuery(listing.description, query)
        : "";

      // Do the same for any other fields that you search within

      const listingCard = createListingCard(listing, query); // Assuming createListingCard uses the modified title and description
      searchResultsContainer.appendChild(listingCard);
    });
  }

  // Update UI elements like search count, etc.
  const searchCountElement = document.getElementById("search-count");
  if (results.length >= 1) {
    searchCountElement.textContent = `${results.length} results found for "${query}"`;
  } else {
    searchCountElement.textContent = `No results found for "${query}"`;
  }
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
  };

  // Attach event listeners to both search forms
  if (desktopSearchForm) {
    desktopSearchForm.addEventListener("submit", processSearch);
  }
  if (mobileSearchForm) {
    mobileSearchForm.addEventListener("submit", processSearch);
  }
}
