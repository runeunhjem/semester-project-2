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
