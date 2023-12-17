import { updateButtonStyles } from "./utils/update-button-styles.mjs";

(function initializeToggleButtons() {
  function setupToggleButton(toggleButtonId, targetSelectors, chevronIconId) {
    const toggleButton = document.getElementById(toggleButtonId);

    if (!toggleButton) {
      // Exit if the toggle button is not found
      return;
    }

    toggleButton.addEventListener("click", function () {
      targetSelectors.forEach(selector => {
        const targetElement = document.querySelector(selector);
        if (targetElement) {
          targetElement.classList.toggle("d-none");
        }
      });

      const chevronIcon = document.getElementById(chevronIconId);
      // Toggle chevron icon direction
      const targetElement = document.querySelector(targetSelectors[0]);

      if (targetElement && targetElement.classList.contains("d-none")) {
        chevronIcon.classList.remove("bi-chevron-up");
        chevronIcon.classList.add("bi-chevron-down");
      } else {
        chevronIcon.classList.remove("bi-chevron-down");
        chevronIcon.classList.add("bi-chevron-up");
      }

      // Update button styles after toggling
      updateButtonStyles();
    });
  }

  // Setup toggle for latest auctions
  setupToggleButton(
    "toggleLatestAuctions",
    [".latest-auctions"],
    "chevronIcon"
  );

  // Setup toggle for ends soon auctions
  setupToggleButton(
    "toggleEndsSoonAuctions",
    [".ends-soon-auctions"],
    "chevronIconEnds"
  );

  // Setup toggle for profile auctions
  setupToggleButton(
    "toggleProfileAuctions",
    [".profile-auctions"],
    "chevronIcon"
  );

  // Setup toggle for listing details and bid details
  setupToggleButton(
    "toggleListingDetails",
    [".listing-details", ".bid-details"],
    "chevronIcon"
  );

  // Setup toggle for all auctions
  setupToggleButton("toggleAllAuctions", [".all-auctions"], "chevronRight");

  // Setup toggle for search auctions
  setupToggleButton(
    "toggleSearchAuctions",
    [".search-auctions"],
    "chevronSearch"
  );
})();
