// search-main.mjs
import { fetchForSearchMain } from "../api/fetch-for-search-main.mjs";
import { createListingCard } from "../make-html/latest-listings-card.mjs";
import { highlightQuery } from "./highlight-search-term.mjs";
import { toggleSectionsVisibility } from "./toggle-sections-visibility.mjs";

// let totalFetched = 0;
let query = "";

async function handleSearch(query) {
  toggleSectionsVisibility();
  const allListings = await fetchForSearchMain();
  // console.log("All listings:", allListings);

  if (!Array.isArray(allListings)) {
    // Handle the case where allListings is not an array
    console.error("Fetched listings are not in array format:", allListings);
    return; // Optionally, display an error message to the user
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
function displaySearchResults(results, query) {
  const searchResultsContainer = document.getElementById("search-auctions");
  searchResultsContainer.innerHTML = "";

  const searchResultsContent = document.getElementById("search-auctions");
  searchResultsContent.innerHTML = "";
  if (results.length === 0) {
    searchResultsContainer.innerHTML =
      '<p class="d-flex justify-content-center bg-warning rounded shadow-sm fs-2 px-3 py-1 mt-2">No results found.</p>';
    searchResultsContent.className =
      "d-flex justify-content-center w-100 mx-auto";
  } else {
    results.forEach(listing => {
      // console.log("Title:", listing.title);
      // console.log("Description:", listing.description);

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
// function filterListingsOnPage(query) {
//   const listings = document.querySelectorAll(".listing-card"); // Replace with your actual class for listing cards
//   query = query.toLowerCase();

//   listings.forEach(card => {
//     const title = card.querySelector(".card-title").textContent.toLowerCase(); // Adjust these selectors based on your HTML structure
//     const description = card
//       .querySelector(".card-description")
//       .textContent.toLowerCase();
//     const tags = card.getAttribute("data-category").toLowerCase().split(",");

//     if (
//       title.includes(query) ||
//       description.includes(query) ||
//       tags.includes(query)
//     ) {
//       card.style.display = ""; // Show the card
//     } else {
//       card.style.display = "none"; // Hide the card
//     }
//   });
// }

// Attach this function to your search form's submit event
// document
//   .getElementById("searchForm")
//   .addEventListener("submit", function (event) {
//     event.preventDefault();
//     const query = document.querySelector('input[type="search"]').value;
//     filterListingsOnPage(query);
//   });
