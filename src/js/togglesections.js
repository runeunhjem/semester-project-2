// Add a function wrapper
(function () {
  const latestAuctions = document.getElementById("toggleLatestAuctions");
  if (!latestAuctions) {
    // Exit if the container is not found
    return;
  } else {
    document
      .getElementById("toggleLatestAuctions")
      .addEventListener("click", function () {
        const latestAuctions = document.querySelector(".latest-auctions");
        const chevronIcon = document.getElementById("chevronIcon");

        latestAuctions.classList.toggle("d-none");

        // Toggle chevron icon direction
        if (latestAuctions.classList.contains("d-none")) {
          chevronIcon.classList.remove("bi-chevron-up");
          chevronIcon.classList.add("bi-chevron-down");
        } else {
          chevronIcon.classList.remove("bi-chevron-down");
          chevronIcon.classList.add("bi-chevron-up");
        }
      });
  }
})();

// Add a function wrapper
(function () {
  const toggleListingDetailsButton = document.getElementById(
    "toggleListingDetails"
  );
  if (!toggleListingDetailsButton) {
    // Exit if the button is not found
    return;
  }

  toggleListingDetailsButton.addEventListener("click", function () {
    const listingDetails = document.querySelector(".listing-details");
    const bidDetails = document.querySelector(".bid-details");
    const chevronIcon = document.getElementById("chevronIcon");

    // Toggle the display of listing and bid details
    listingDetails.classList.toggle("d-none");
    if (bidDetails) {
      // Check if bidDetails exists
      bidDetails.classList.toggle("d-none");
    }

    // Toggle chevron icon direction
    if (listingDetails.classList.contains("d-none")) {
      chevronIcon.classList.remove("bi-chevron-up");
      chevronIcon.classList.add("bi-chevron-down");
    } else {
      chevronIcon.classList.remove("bi-chevron-down");
      chevronIcon.classList.add("bi-chevron-up");
    }
  });
})();
