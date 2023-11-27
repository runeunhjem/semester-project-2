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
  const listingDetails = document.getElementById("toggleListingDetails");
  if (!listingDetails) {
    // Exit if the container is not found
    return;
  } else {
    document
      .getElementById("toggleListingDetails")
      .addEventListener("click", function () {
        const listingDetails = document.querySelector(".listing-details");
        const chevronIcon = document.getElementById("chevronIcon");

        listingDetails.classList.toggle("d-none");

        // Toggle chevron icon direction
        if (listingDetails.classList.contains("d-none")) {
          chevronIcon.classList.remove("bi-chevron-up");
          chevronIcon.classList.add("bi-chevron-down");
        } else {
          chevronIcon.classList.remove("bi-chevron-down");
          chevronIcon.classList.add("bi-chevron-up");
        }
      });
  }
})();
