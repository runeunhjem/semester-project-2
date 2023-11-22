import { toTopButton } from "./utils/back-to-top-button.mjs";
import { attachLogoutEvent } from "./logout.js";
import { applyBootstrapValidation } from "./utils/validation.mjs";
import { toggleSearchSection } from "./utils/togglemobilesearch.mjs";

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
