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
      if (
        document.querySelector(targetSelectors[0]).classList.contains("d-none")
      ) {
        chevronIcon.classList.remove("bi-chevron-up");
        chevronIcon.classList.add("bi-chevron-down");
      } else {
        chevronIcon.classList.remove("bi-chevron-down");
        chevronIcon.classList.add("bi-chevron-up");
      }
    });
  }

  // Setup toggle for latest auctions
  setupToggleButton(
    "toggleLatestAuctions",
    [".latest-auctions"], // Make sure this is the correct class for "Latest Auctions"
    "chevronIcon" // Ensure this is the unique ID for the chevron in "Latest Auctions"
  );

  // Setup toggle for ends soon auctions
  setupToggleButton(
    "toggleEndsSoonAuctions",
    [".ends-soon-auctions"], // Make sure this is the correct class for "Ends Soon Auctions"
    "chevronIconEnds" // Ensure this is the unique ID for the chevron in "Ends Soon Auctions"
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
