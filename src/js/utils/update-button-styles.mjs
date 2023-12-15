function checkListingDisplay(id) {
  const listing = document.getElementById(id);
  return listing && !listing.classList.contains("d-none");
}

function updateButtonStyle(buttonId, listingId) {
  const button = document.getElementById(buttonId);
  if (button && checkListingDisplay(listingId)) {
    button.classList.add("btn-success", "text-white");
    button.classList.remove("btn-secondary");
  } else if (button) {
    button.classList.add("btn-secondary");
    button.classList.remove("btn-success", "text-white");
  }
}

function updateButtonStyles() {
  updateButtonStyle("showHideBtnEndSoon", "ends-soon-listings-container");
  updateButtonStyle(
    "showHideBtnWithGallery",
    "image-gallery-listings-container"
  );
  updateButtonStyle("showHideBtnAllAuctions", "all-listings-container");
}

// Function to add event listeners to buttons
function addToggleEventListeners() {
  const buttons = [
    {
      buttonId: "showHideBtnEndSoon",
      listingId: "ends-soon-listings-container",
    },
    {
      buttonId: "showHideBtnWithGallery",
      listingId: "image-gallery-listings-container",
    },
    { buttonId: "showHideBtnAllAuctions", listingId: "all-listings-container" },
  ];

  buttons.forEach(({ buttonId, listingId }) => {
    const button = document.getElementById(buttonId);
    if (button) {
      button.addEventListener("click", () => {
        // Toggle the visibility of the listing
        const listing = document.getElementById(listingId);
        if (listing) {
          listing.classList.toggle("d-none");
        }
        // Update the button styles after toggling
        updateButtonStyles();
      });
    }
  });
}

// Call this function once the DOM is fully loaded
document.addEventListener("DOMContentLoaded", addToggleEventListeners);

export { updateButtonStyles, checkListingDisplay };
