import { toTopButton } from "./utils/back-to-top-button.mjs";
import { attachLogoutEvent } from "./logout.js";
import { applyBootstrapValidation } from "./utils/validation.mjs";
import { toggleSearchSection } from "./utils/togglemobilesearch.mjs";
import { updateProfileDisplay } from "./make-html/profile-info.mjs";
import { displayLatestListings } from "./utils/create-latest-listings.mjs";
import { initializeAllCarousels } from "./utils/initialize-carousel.mjs";
import { displayListingDetails } from "./utils/create-listing-details.mjs";
import { displayAllListings } from "./utils/create-all-listings.mjs";
import { isLoggedIn, favoritesLink } from "./variables/constants.mjs";
import { createNewListingForm } from "./make-html/create-new-listing.mjs";
import { displayProfileListings } from "./utils/create-profile-listings.mjs";
import { listingsEndsSoon } from "./api/listings-ends-soon.mjs";
import { currentProfile } from "./make-html/profile-page.mjs";
import { currentProfileHistory } from "./make-html/profile-history-section.mjs";
import { loadFavorites } from "./make-html/create-favorites.mjs";
import { displayEndsSoonListings } from "./utils/create-ends-soon-listings.mjs";

if (isLoggedIn) {
  listingsEndsSoon();
  // Select all elements with the class 'restricted'
  const restrictedElements = document.querySelectorAll(".restricted");

  // Loop through each element and remove the 'restricted' class
  restrictedElements.forEach(element => {
    element.classList.remove("restricted");
  });
}

/**
 * Update the header profile info depending on if user is logged in.
 */
document.addEventListener("DOMContentLoaded", () => {
  updateProfileDisplay();
  // listingsEndsSoon();
});

/**
 * Toggle the search section on mobile.
 * Apply Bootstrap validation to forms.
 * Display latest listings.
 * Initialize all carousels.
 */
document.addEventListener("DOMContentLoaded", () => {
  toggleSearchSection();
  applyBootstrapValidation();

  if (
    !window.location.href.includes("login") ||
    !window.location.href.includes("profile")
  ) {
    displayLatestListings();
    displayEndsSoonListings();

    setTimeout(() => {
      // Wait for images to load
      initializeAllCarousels();
    }, 2000);
  }
});

/**
 * Add a "Back to Top" button to the page.
 */
toTopButton();

/**
 * Attach logout event to logout links.
 */
attachLogoutEvent();

// Function to get the current page name from the URL
function getCurrentPage() {
  const path = window.location.pathname;
  return path.substring(path.lastIndexOf("/") + 1);
}

// Run specific functions based on the current page
const currentPage = getCurrentPage();

if (currentPage === "listing.html") {
  // Run on listing page
  displayListingDetails();
} else if (currentPage === "index.html" || currentPage === "") {
  // Run on index page (or root)
  displayAllListings();
  currentProfile();
  currentProfileHistory();
}

document.addEventListener("DOMContentLoaded", () => {
  const addListingLink = document.querySelector(".icon-add-listing");
  const addListingIcon = document.querySelector(".bi-plus-circle");
  const createListingDiv = document.getElementById("create-new-listing");
  const addListingText = document.querySelector(".add-listing");

  if (addListingLink && createListingDiv) {
    addListingLink.addEventListener("click", event => {
      event.preventDefault(); // Prevent default link behavior
      // Toggle the 'd-none' class on the createListingDiv
      if (createListingDiv.classList.contains("d-none")) {
        createListingDiv.classList.remove("d-none");
        addListingIcon.classList.remove("bi-plus-circle");
        addListingIcon.classList.add("bi-arrow-up-circle");
        addListingText.textContent = "Hide Form";
        addListingText.classList.add("text-danger");
        createNewListingForm("formContainer"); // Call this only when showing the form
      } else {
        createListingDiv.classList.add("d-none");
        addListingIcon.classList.add("bi-plus-circle");
        addListingText.textContent = "Add Listing";
        addListingText.classList.remove("text-danger");
      }
    });
  }
});

/**
 * Display listings for the current profile.
 */
if (window.location.pathname.includes("profile")) {
  displayProfileListings();
}

/**
 * Display favorites for the current logged in user.
 */
// Add click event listener
favoritesLink.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent the default anchor action
  if (!isLoggedIn) {
    window.location.href = "/login.html";
  } else {
    loadFavorites();
  }
});
