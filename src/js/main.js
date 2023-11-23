import { toTopButton } from "./utils/back-to-top-button.mjs";
import { attachLogoutEvent } from "./logout.js";
import { applyBootstrapValidation } from "./utils/validation.mjs";
import { toggleSearchSection } from "./utils/togglemobilesearch.mjs";
import { updateProfileDisplay } from "./make-html/profile-info.mjs";
import { displayLatestListings } from "./utils/create-latest-listings.mjs";
import { initializeAllCarousels } from "./utils/initialize-carousel.mjs";

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
  displayLatestListings();
  setTimeout(() => {
    // Wait for images to load
    initializeAllCarousels();
  }, 2000);
});

/**
 * Add a "Back to Top" button to the page.
 */
toTopButton();

/**
 * Attach logout event to logout links.
 */
attachLogoutEvent();
