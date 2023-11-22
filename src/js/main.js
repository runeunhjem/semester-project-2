import { toTopButton } from "./utils/back-to-top-button.mjs";
import { attachLogoutEvent } from "./logout.js";
import { applyBootstrapValidation } from "./utils/validation.mjs";
import { toggleSearchSection } from "./utils/togglemobilesearch.mjs";
import { updateProfileDisplay } from "./make-html/profile-info.mjs";

/**
 * Update the profile display depending if user is logged in.
 */
document.addEventListener("DOMContentLoaded", () => {
  updateProfileDisplay();
});

/**
 * Apply Bootstrap validation to forms.
 * Toggle "Search" in mobileview.
 */
document.addEventListener("DOMContentLoaded", () => {
  toggleSearchSection();
  applyBootstrapValidation();
});

/**
 * Add a "Back to Top" button to the page.
 */
toTopButton();

/**
 * Attach logout event to logout links.
 */
attachLogoutEvent();
