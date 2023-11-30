import { toTopButton } from "./utils/back-to-top-button.mjs";
import { attachLogoutEvent } from "./logout.js";
import { applyBootstrapValidation } from "./utils/validation.mjs";
import { toggleSearchSection } from "./utils/togglemobilesearch.mjs";
import { updateProfileDisplay } from "./make-html/profile-info.mjs";
import { displayLatestListings } from "./utils/create-latest-listings.mjs";
import { initializeAllCarousels } from "./utils/initialize-carousel.mjs";
import { displayListingDetails } from "./utils/create-listing-details.mjs";
import { displayAllListings } from "./utils/create-all-listings.mjs";
import { isLoggedIn } from "./variables/constants.mjs";
import { createNewListingForm } from "./make-html/create-new-listing.mjs";

if (isLoggedIn) {
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

  if (!window.location.href.includes("login")) {
    displayLatestListings();

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
}

document.addEventListener("DOMContentLoaded", () => {
  const addListingLink = document.querySelector(".icon-add-listing");
  const createListingDiv = document.getElementById("create-new-listing");

  if (addListingLink && createListingDiv) {
    addListingLink.addEventListener("click", event => {
      event.preventDefault(); // Prevent default link behavior
      // Toggle the 'd-none' class on the createListingDiv
      if (createListingDiv.classList.contains("d-none")) {
        createListingDiv.classList.remove("d-none");
        createNewListingForm("formContainer"); // Call this only when showing the form
      } else {
        createListingDiv.classList.add("d-none");
      }
    });
  }
});
